---
layout: post
title: Interaksi Dengan Database
tags: [eloquent, database, model]
---

Pada [tulisan sebelumnya](http://id-laravel.com/post/halo-bro-membuat-halaman-web-pertama-dengan-laravel) kita sudah bersama-sama membuat halaman web pertama
dengan laravel. Satu buah halaman sederhana yang hanya menampilkan sebuah
tulisan "halo, bro". Pada kenyataannya, ketika kita membangun sebuah website,
data yang ditampilkan bukan hanya sekedar tulisan "halo, bro", tetapi merupakan
data real yang berasal dari database. Oleh karena itu, pada tulisan ini kita
akan bersama-sama belajar bagaimana caranya berinteraksi dengan database
menggunakan laravel.

### Persiapkan database

Untuk tutorial kali ini kita akan menggunakan sebuah table bernama `post` dengan
struktur sebagai berikut:

![](<https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/4-interaksi-dengan-database/table-post.png>)

Tidak perlu khawatir jika Anda merasa cukup malas untuk membuat tablenya sendiri
karena di bawah ini sudah script sql-nya (ups, mysql only ya :D):

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE TABLE `post` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `comment_count` int(11) NOT NULL DEFAULT '0',
  `status` enum('draft','publish') NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `post` (`id`, `title`, `content`, `comment_count`, `status`)
VALUES
	(1, 'Halo bro', 'content 1', 2, 'publish'),
	(2, 'Basic Routing', 'content 2', 10, 'publish'),
	(3, 'Nested Layout Menggunakan Blade', 'content 3', 1, 'draft');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### Konfigurasi database

Setelah table siap, langkah selanjutnya adalah menyesuaikan konfigurasi untuk
melakukan koneksi ke database. File konfigurasi database bisa ditemukan di
`app/config/database.php`.

Laravel versi 4 mendukung empat sistem database: sqlite, mysql, postgresql, dan
SQL Server. Sesuai database yang Anda gunakan (yang saya yakin 99% adalah
MySQL), silakan edit nama database, username, dan password.

Konfigurasi saya terlihat seperti di bawah ini:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
	'connections' => array(

...

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'laravel-sample',
			'username'  => 'root',
			'password'  => 'root',
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		),
...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



### Interaksi ke database

Ok, setelah database siap, saatnya kita beraksi. Pada prinsipnya laravel
menyediakan tiga buah cara untuk berinteraksi denga basis data:

1.  Raw Query

2.  Query Builder

3.  Eloquent ORM

Cara pertama tidak dianjurkan, cara kedua boleh dilakukan, dan cara ketiga
adalah yang paling umum digunakan. Kecuali Anda sudah cukup sakti dan memiliki alasan kuat, selalu gunakan cara yang ketiga. Kenapa? Hmm, saat ini percaya saja dulu.
Nanti kita bahas lebih lanjut di tulisan lainnya ;)



### Raw Query

Untuk melakukan query ke database, kita bisa menggunakan class `DB` yang sudah tersedia. Sebagai contoh, menggunakan table `post` di atas, kita bisa melakukan query sebagai berikut:

    // select
    $posts = DB::select('select * from post');
    foreach ($posts as $post) {
        echo $post->title . '<br>';
    }

    // select query dengan parameter
    $posts = DB::select('select * from post where status = ?', array('publish'));
    foreach ($posts as $post) {
        echo $post->title . '<br>';
    }

    // insert
    DB::update('insert into post(title, content) values (?, ?)', array('Postingan baru', 'Konten baru bro'));

    // update
    DB::update('update post set content = ? where id = ?', array('Update postingan baru', 4));

    // delete
    $deletedCount = DB::delete('delete from post where comment_count = 0');
    echo $deletedCount;

    // general statement
    DB::statement('alter table post add column created datetime null');

    // transaction
    DB::transaction(function(){
        ...query 1
        ...query 2
    });

Yang perlu diperhatikan adalah, kita bisa melakukan binding parameter dengan menggunakan karakter '?' dalam query, kemudian kita tambahkan parameter kedua berupa array yang berisi value yang ingin kita passing. Ingat, urutan substitusi yang dilakukan sesuai dengan urutan karakter '?'. Jadi, karakter '?' pertama akan digantikan dengan elemen array pertama, dan seterusnya.


### Query Builder
Jika Anda pernah menggunakan [Code Igniter](http://codeigniter.com) sebelumnya, selamat, pasti Anda sangat familiar dengan query builder (kalau di CI biasa disebut dengan Active Record). Query builder menyediakan cara yang lebih nyaman dan konsisten untuk melakukan query ke database. Lebih nyaman karena kode menjadi lebih enak ditulis dan dibaca, lebih konsisten karena Anda tidak perlu mengkhawatirkan perbedaan native query yang mungkin ada antara sistem database yang satu dengan yang lain. Sekali Anda menggunakan query builder, maka query dijamin berjalan dengan baik di semua database yang didukung oleh laravel.

Masih menggunakan contoh tabel `post` di atas, kita bisa melakukan berbagai macam query sebagai berikut:

    // select multiple row
    $posts = DB::table('post')->get();
    foreach ($posts as $post) {
        echo $post->title . '<br>';
    }

    // select satu row
    $post = DB::table('post')->where('id', 1)->first();

    // select kolom tertentu
    $post = DB::table('post')->select('id', 'title')->where('id', 1)->first();
    // ekivalen dengan query berikut
    //$post = DB::table('post')->select(array('id', 'title'))->where('id', 1)->first();

    // select satu kolom
    $lastArticleTitle = DB::table('post')->orderBy('id', 'desc')->pluck('title');
    echo 'Judul artikel terakhir: ' . $lastArticleTitle . '<br>';

    $query = DB::table('post')->addSelect('id');
    $query->addSelect('title');
    $query->where('status', 'publish');
    $query->where('id', '>', 1);

    $posts = $query->get();

    $posts = DB::table('post')->skip(1)->take(1)->get();

### Eloquent ORM
Jika Anda perhatikan pada dua cara sebelumnya, kembalian dari query yang dihasilkan baik oleh `Raw Query` maupun `Query Builder` adalah sama-sama `StdClass Object`.
Perhatikan kembali contoh contoh berikut:

    // raw query
    $posts = DB::select('select * from post');

    // query builder
    $posts = DB::table('post')->get();

Kedua query di atas sama-sama menghasilkan array yang elemennya bertipe stdClass (stdClass adalah kelas bawaan PHP, biasanya digunakan untuk membuat obyek sederhana yang hanya berisi setter dan getter).

    Array
    (
        [0] => stdClass Object
            (
                [id] => 1
                [title] => Halo bro
                [content] => content 1
                [comment_count] => 2
                [status] => publish
                [created] =>
            )

        [1] => stdClass Object
            (
                [id] => 2
                [title] => Basic Routing
                [content] => content 2
                [comment_count] => 10
                [status] => publish
                [created] =>
            )

        [2] => stdClass Object
            (
                [id] => 3
                [title] => Nested Layout Menggunakan Blade
                [content] => content 3
                [comment_count] => 1
                [status] => draft
                [created] =>
            )
    )

Bagaimana jika kita ingin mengganti `stdClass` dengan `Kelas` buatan sendiri, apakah bisa?

Nah, itulah salah satu peran **ORM (Object Relational Mapper)**, yaitu memetakan hasil query dari database ke dalam bentuk obyek yang sudah kita definisikan sebelumnya. Bentuk yang sudah kita definisikan sebelumnya ini biasa disebut dengan **Model (M dari MVC)**.

Mengambil contoh tabel post di atas, kita ingin agar hasil query dari tabel tersebut dipetakan menjadi obyek model Post. Untuk itu kita harus definisikan dulu model Post. Buat sebuah file baru `app/models/Post.php`:

    <?php

    class Post extends Eloquent {

        protected $table = 'post';

    }

Setiap model yang kita bikin harus meng-extends kelas `Eloquent` bawaan laravel. `Eloquent` sendiri artinya kurang lebih 'elok nian' :P

Selanjutnya kita bisa melakukan berbagai macam query melalui ORM.

Mendapatkan semua row:

    $posts = Post::all();

Mendapatkan satu row berdasar primary key:

    $singlePost = Post::find(1);
    echo '<pre>';
    print_r($singlePost);
    echo '</pre>';

Kode di atas akan menghasilkan:

    Post Object
    (
        [table:protected] => post
        [connection:protected] =>
        [primaryKey:protected] => id
        [perPage:protected] => 15
        [incrementing] => 1
        [timestamps] => 1
        [attributes:protected] => Array
            (
                [id] => 1
                [title] => Halo bro
                [content] => content 1
                [comment_count] => 2
                [status] => publish
                [created] =>
            )

Coba perhatikan, sekarang kita sudah mendapatkan `Post Object`, bukan lagi `stdClass Object` seperti sebelumnya. Itu berarti, jika kita menambahkan atribut atau fungsi apapun di kelas Post yang sudah kita bikin, maka atribut dan fungsi tersebut juga bisa dipanggil oleh obyek-obyek yang dihasilkan dari hasil query.

Buka kembali file app/models/Post.php, lalu modifikasi seperti berikut ini:

    <?php

    class Post extends Eloquent {

        protected $table = 'post';
        public $newAttribute = 'new attribute';

        public function url()
        {
            return 'http:://www.domain.com/post/' . $this->id;
        }

    }

Maka kita bisa memanggil atribut dan fungsi tersebut seperti berikut ini:

    $singlePost = Post::find(1);
    echo $singlePost->newAttribute; // output: 'new attribute'
    echo '<br>';
    echo $singlePost->url(); // output: 'http://www.domain.com/post/1'

Semua fungsi yang tersedia di `Query Builder` bisa dipakai untuk melakukan query via `ORM`.

    $posts = Post::where('status', 'publish')->get();

#### Insert, Update, Delete

Untuk menambahkan record baru ke database, caranya cukup sederhana:

1. Buat obyek baru
2. Set atribut-atributnya
3. Panggil fungsi `save()`

Mari kita lihat contohnya:

    $newPost = new Post;
    $newPost->title = 'Yeah, Laravel emang nge-jazz';
    $newPost->content = 'Pharetra Elit Condimentum Ligula Sem';
    $newPost->status = 'draft';
    $newPost->save();

Jalankan kode di atas, dan tadaaaa.... error kan?

    Exception
    SQLSTATE[42S22]: Column not found: 1054 Unknown column 'updated_at' in 'field list' (SQL: insert into `post` (`title`, `content`, `status`, `updated_at`, `created_at`) values (?, ?, ?, ?, ?)) (Bindings: array ( 0 => 'Yeah, Laravel emang nge-jazz', 1 => 'Pharetra Elit Condimentum Ligula Sem', 2 => 'draft', 3 => '2013-10-12 08:03:01', 4 => '2013-10-12 08:03:01', ))

Secara default, Eloquent memerlukan dua kolom tambahan untuk setiap tabel, yaitu `updated_at` dan `created_at`, yang akan digunakan untuk mencatat waktu insert dan waktu update secara otomatis. Untuk itu, tambahkan kedua kolom tersebut di tabel `post` Anda, keduanya bertipe `datetime`.

Jalankan kembali kode di atas, dan cek database Anda:
![](<https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/4-interaksi-dengan-database/table-post-inserted.png>)
Record baru sudah ditambahkan, lengkap dengan info tentang kapan record tersebut di-insert.

Untuk melakukan update di row tertentu, caranya juga sangat sederhana:

    $post = Post::find(1);
    $post->title = 'New Title';
    $post->save();

Cek kembali table post Anda, perhatikan record dengan id = 1, apakah title-nya berubah? Apakah kolom updated_at sudah terisi secara otomatis?

Sedangkan untuk menghapus row tertentu, `Eloquent` sudah menyediakan fungsi `delete()`:

    // menghapus satu row via obyek
    $post = Post::find(2);
    $post->delete();

    // menghapus banyak row sekaligus
    Post::where('status', 'draft')->delete();


### Kesimpulan
Yup, sekarang kita sudah bisa melakukan query ke database memanfaatkan fitur-fitur yang sudah disediakan oleh laravel. Dari ketiga cara tersebut, menggunakan ORM adalah cara yang paling direkomendasikan karena lebih fleksibel, kode lebih terorganisir dan mudah dipahami, dan tentunya lebih OOP.

Tetapi terkadang ada kasus dimana ORM memiliki kelemahan, terutama dalam segi performansi, yaitu ketika berhubungan dengan data yang sangat banyak (jutaan row). Untuk kasus tersebut, Anda selalu memiliki pilihan untuk menggunakan dua metode lainnya.

Kalau saya pribadi, selalu gunakan ORM, hingga suatu saat aplikasi terasa lambat, baru dilakukan optimasi :D.

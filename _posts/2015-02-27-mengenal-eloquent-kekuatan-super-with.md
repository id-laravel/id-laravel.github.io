---
layout: post
title: "Mengenal Eloquent: Kekuatan Super `with`"
---

> Saya asumsikan Anda sudah sudah pernah menggunakan Eloquent ORM bawaan Laravel dan sudah tahu apa itu relationship semisal belongsTo, hasOne, hasMany, dan lain sebagainya.

Langsung saja, untuk artikel kali ini kita akan menggunakan database dengan struktur seperti ini:

	
	CREATE TABLE `wilayah_provinsi` (
	  `id` varchar(2) NOT NULL,
	  `nama` varchar(30) NOT NULL,
	  PRIMARY KEY (`id`)
	);

	CREATE TABLE `wilayah_kabupaten` (
	  `id` varchar(4) NOT NULL,
	  `provinsi_id` varchar(2) NOT NULL,
	  `nama` varchar(30) NOT NULL,
	  PRIMARY KEY (`id`)
	);	
	
	CREATE TABLE `wilayah_kecamatan` (
	  `id` varchar(7) NOT NULL,
	  `kabupaten_id` varchar(4) NOT NULL,
	  `nama` varchar(30) NOT NULL,
	  PRIMARY KEY (`id`)
	);

	CREATE TABLE `wilayah_desa` (
	  `id` varchar(10) NOT NULL,
	  `kecamatan_id` varchar(7) DEFAULT NULL,
	  `nama` varchar(40) DEFAULT NULL,
	  PRIMARY KEY (`id`)
	);

Tidak ada yang aneh bukan? Jika Anda pernah membuat sistem informasi untuk pemerintahan atau aplikasi toko online yang ada fitur pengiriman barang pasti familiar dengan skema database di atas. `Provinsi hasMany Kabupaten` (begitu juga sebaliknya, `Kabupaten belongsTo Provinsi`), `Kabupaten hasMany Kecamatan` (begitu juga sebaliknya, `Kecamatan belongsTo Kabupaten`), dan `Kecamatan hasMany Desa` (dan begitu juga sebaliknya, `Desa belongsTo Kecamatan`).

> Sebagai bonus, Anda bisa [mendownload database wilayah administratif Indonesia dalam format dump MySQL disini](/resources/wilayah_administratif_indonesia.sql).

Selanjutnya kita perlu membuat model untuk masing-masing tabel sekaligus mendefinisikan relasi antar model.

### Model Provinsi	

	<?php namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Provinsi extends Model {
	
		protected $table = 'wilayah_provinsi';
	
	    public function kabupaten()
	    {
	        return $this->hasMany('App\Kabupaten');
	    }
	}


### Model Kabupaten

	<?php namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Kabupaten extends Model {
	
	    protected $table = 'wilayah_kabupaten';
	    
	    public function kecamatan()
	    {
	        return $this->hasMany('App\Kecamatan');
	    }
	
	    public function provinsi()
	    {
	        return $this->belongsTo('App\Provinsi');
	    }
	}


### Model Kecamatan

	<?php namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Kecamatan extends Model {
	
	    protected $table = 'wilayah_kecamatan';
	
	    public function desa()
	    {
	        return $this->hasMany('App\Desa');
	    }
	
	    public function kabupaten()
	    {
	        return $this->belongsTo('App\Kabupaten');
	    }
	}


### Model Desa

	<?php namespace App;
	
	use Illuminate\Database\Eloquent\Model;
	
	class Desa extends Model {
	
	    protected $table = 'wilayah_desa';
	
	    public function kecamatan()
	    {
	        return $this->belongsTo('App\Kecamatan');
	    }
	}

	
### Contoh Kasus: Mencari Desa Sukamakmur

Sekarang mari kita gunakan database diatas untuk memecahkan salah satu misteri terbesar masa kecil kita. Masih ingat dengan pelajaran Bahasa Indonesia di Sekolah Dasar dulu? Seringkali cerita yang ada di buku menggunakan nama tempat seperti Sukamiskin dan Sukamakmur. Saya pikir itu adalah tempat fiktif karangan penulis belaka. Sampai akhirnya saya menemukan database nama desa di seluruh Indonesia. Saatnya membuktikan kebenaran dengan cara yang diakui programmer.

Setelah database siap, mari kita buat route baru di `routes.php`:

	Route::get('/', function(){
	
	    $desa = \App\Desa::where('nama', 'like', '%sukamakmur%')->get();
	
	    return view('index', compact('desa'));
	});

Kode di atas juga sangat sederhana, kita mencoba mengambil semua data `Desa` yang namanya mengandung kata **sukamakmur** lalu mengirimkannya ke view `index.blade.php` untuk ditampilkan.

Selanjutnya kita buat file `resources/views/index.blade.php`:

{% raw %}

	<table>
	    <thead>
	    <tr>
	        <th>Nama Desa</th>
	        <th>Kecamatan</th>
	        <th>Kabupaten</th>
	        <th>Provinsi</th>
	    </tr>
	    </thead>
	    <tbody>
	    @foreach($desa as $item)
	        <tr>
	            <td>{{ $item->nama }}</td>
	            <td>{{ $item->kecamatan->nama }}</td>
	            <td>{{ $item->kecamatan->kabupaten->nama }}</td>
	            <td>{{ $item->kecamatan->kabupaten->provinsi->nama }}</td>
	        </tr>
	    @endforeach
	    </tbody>
	</table>
	
{% endraw %}	

Sekali lagi, tidak ada yang aneh kan? Selain nama Desa, kita juga menampilkan nama Kecamatan, Kabupaten, dan Provinsi agar lebih jelas lokasinya.

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/sukamakmur.png)

Dan ternyata desa Sukamakmur benar-benar ada, dan tidak hanya satu tapi sepuluh. Lalu yang dimaksud oleh penulis buku desa Sukamakmur yang mana ya? Ah, untuk urusan itu biarlah penulis dan Tuhan saja yang tahu. Tugas kita adalah menganalisa query yang dihasilkan. Ada banyak cara untuk bisa melihat query yang dihasilkan oleh Eloquent, saya pilih cara paling praktis dan paling terkini: [install Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar).

Dan ini hasilnya:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/sukamakmur-debugbar-tanpa-with.png)

> Kenapa bisa jadi 31 query? 1 query untuk select from desa. Untuk masing-masing desa, Eloquent akan melakukan query untuk mendapatkan kecamatan terkait (+10 query). Untuk masing-masing kecamatan, query lagi untuk mendapatkan kabupaten terkait (+10 query). Begitu juga dengan masing-masing kabupaten untuk mendapatkan provinsi terkait (+10 query). Jumlah query bisa meningkat drastis sesuai jumlah desa yang dihasilkan di query pertama.

Jadi, sesuai judul di atas, mari kita manfaatkan `with` untuk mengoptimasi query yang dihasilkan.

    $desa = \App\Desa::where('nama', 'like', '%sukamakmur%')->with('kecamatan')->get();
    
Query yang dihasilkan:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/sukamakmur-debugbar-with-kecamatan.png)

Yihaaa, jumlah query lumayan berkurang. Jika kita bisa menambahkan `->with('kecamatan')` maka kok rasa-rasanya kita juga bisa melakukan hal yang sama untuk kabupaten dan provinsi. Mari kita coba:

    $desa = \App\Desa::where('nama', 'like', '%sukamakmur%')->with('kecamatan', 'kabupaten', 'provinsi')->get();
    
Tetooot... wrong answer.

	BadMethodCallException in Builder.php line 1991:
	Call to undefined method Illuminate\Database\Query\Builder::kabupaten()
	
Kita tidak bisa menggunakan kode diatas karena `Desa` tidak memiliki relasi langsung dengan `Kabupaten` ataupun `Provinsi`. Yang bisa kita lakukan adalah melakukan `nested with`:

    $desa = \App\Desa::where('nama', 'like', '%sukamakmur%')
        ->with([
            'kecamatan' => function($query) {
                return $query->with([
                    'kabupaten' => function($query) {
                        return $query->with('provinsi');
                }]);
            }])
        ->get();

Saya agak kesusahan menjelaskan kode diatas, jadi semoga Anda bisa memahaminya sendiri. Lalu, bagaimana hasil querynya?

#### Update
Kita bisa melakukan nested with dengan cara yang lebih simpel dengan menggunakan notasi *dot*:

    $desa = \App\Desa::where('nama', 'like', '%sukamakmur%')->with('kecamatan.kabupaten.provinsi')->get();

Dua buah kode terakhir sama-sama menghasilkan query seperti berikut:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/sukamakmur-debugbar-nested-with.png.png)

Yup, kita berhasil memangkas jumlah query dari 31 menjadi hanya 4.

### Global `with`

Jika Anda tidak mau berulang-ulang menambahkan `with` di setiap query, kita bisa menggantinya dengan menambahkan variable `$with` ke masing-masing model.

Contoh untuk model `Desa` bisa kita tambahkan:

    protected $with = ['kecamatan'];
    
Untuk model yang lain silakan ditambahkan sendiri sesuai nama relasinya.

Selanjutnya kita kembalikan query seperti semula:

	$desa = \App\Desa::where('nama', 'like', '%sukamakmur%')->get();
	
Cek query yang ditampilkan di debugbar, bagaimana hasilnya?

### P.S.

Konsep diatas biasa dikenal dengan istilah `lazy loading` dan [eager loading](http://laravel.com/docs/5.0/eloquent#eager-loading). Pada contoh pertama yang menghasilkan 31 query, Laravel menerapkan prinsip `lazy loading`: query dilakukan hanya jika dibutuhkan. Ketika di view kita memanggil `$item->kecamatan` maka pada saat itulah Eloquent melakukan query untuk mendapatkan data kecamatan terkait. Anda bisa melakukan eksperimen, misalnya dengan tidak menampilkan nama provinsi dan kabupaten, lalu cek query yang dihasilkan. Atau Anda bisa mengosongkan view (jadi tidak melakukan looping dan tidak menampilkan data apapun), maka Eloquent cuma akan melakukan satu kali query.

Sebaliknya, dengan memanggil `with`, Anda meminta Eloquent untuk melakukan [eager loading](http://laravel.com/docs/5.0/eloquent#eager-loading): lakukan semua query yang dibutuhkan, termasuk query untuk mengambil data terkait. Pada contoh ketiga (dengan nested with), meskipun view dikosongkan, query yang dihasilkan tetap sama, yaitu 4. Hal ini karena Eloquent sudah mengambil semua data di awal (eager), tidak peduli apakah data itu akan digunakan atau tidak.

Fitur eager loading dengan with ini bisa digunakan untuk semua jenis relasi. Gunakan insting programmer Anda memutuskan kapan harus menggunakannya. Penggunaan `with` secara tepat bisa meningkatkan kecepatan aplikasi sekaligus menghindari penggunaan `join table` secara manual menggunakan `fluent query builder`.

### Bonus
Pada contoh diatas, kita baru menerapkan eager loading untuk relasi `belongsTo`. Anda bisa eksplorasi sendiri untuk relasi `hasMany`. Selamat mencoba :)
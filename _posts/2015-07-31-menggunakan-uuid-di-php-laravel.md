---
title: Menggunakan UUID (Universally Unique Identifier) di PHP / Laravel
layout: post
tags: [php, laravel-5, laravel-4, basic, uuid, database]
---

## Problem 1: Tebak-Tebak Berhadiah

Selama ini, kita sering menggunakan _Auto-Increment Integer_ sebagai _Primary Key_ dalam tabel-tabel _database_ kita. Kemudian biasanya dalam aplikasi web, kita mengakses data tersebut dengan alamat URL seperti ini:

    http://myapplication.com/user?id=105
    http://myapplication.com/user/105

Pengguna aplikasi kita bisa mengenali dengan mudah URL tersebut, dimana `User ID` kita adalah `105`. Suatu saat pengguna tersebut iseng-iseng mengakses URL dan mengganti `User ID` misal `104`, atau `106`. Sehingga User bisa mengetahui siapa User yang mendaftar sebelum dan sesudah dirinya, padahal bisa jadi itu tidak diperbolehkan. Atau, pengguna menggunakan `User ID = 1`, yang mana biasanya User ID `1` itu adalah _User Administrator_, tentu ini berbahaya.

Atau bisa saja ada orang iseng, _hacker_, yang penasaran, lalu membuat sebuah _program_ untuk mendapatkan data-data semua User, hanya dengan perintah sederhana, sebagai contoh:

    for ($i = 1; $i <= 1000, $i++) {
        saveData('http://myapplication.com/user?id=' . $i);
    }

    // Result:
    // http://myapplication.com/user?id=1
    // http://myapplication.com/user?id=2
    // http://myapplication.com/user?id=...
    // http://myapplication.com/user?id=999
    // http://myapplication.com/user?id=1000    

Dengan _script_ sederhana, _Hacker_ ini bisa mendapatkan semua data-data User hanya dalam waktu singkat saja.


## Problem 2: Primary Key Conflict dan Scalabillity

Ceritanya, kita telah berhasil membuat sebuah aplikasi besar, dan digunakan di satu tempat. Data-datanya sudah ribuan. Kemudian ada permintaan untuk memasang aplikasi tersebut di tempat lain juga, sehingga nantinya akan ada 2 _server_ aplikasi, atau bahkan lebih.

Data-data aplikasi di Server #1 sudah menggunakan _Primary Key_ `ID` katakanlah `1 s/d 1.000.000`. Aplikasi di Server #2, karena baru, tentu saja akan menggunakan _Primary Key_ `ID` dari `0` lagi, dan `auto-increment` juga. Sampai saat ini tentu tidak ada masalah, karena 2 aplikasi tersebut berjalan sendiri-sendiri.

Di kemudian hari, ada permintaan untuk menggabungkannya jadi 1 tempat, karena alasan agar lebih mudah dikelola dan distribusi terpusat. Pertanyaannya, lalu bagaimana menggabungkannya? Apakah sekedar `copy` dan `paste` bisa? Jawabannya tentu tidak bisa, karena pasti akan ada data bentrok/konflik di keduanya, disebabkan _Primary Key_ `ID` banyak yang sama. Padahal sebuah _Primary Key_ harus **unique**.

Dalam kasus lain, aplikasi yang memiliki jumlah transaksi yang sangat banyak, masif, dan cepat, misal dalam 1 detik ada 1000 transaksi/_insert_ data baru, fungsi `auto-increment` ini akan tidak berfungsi dengan baik. Namun jika _insert_ masih sebatas 1-2 menit sekali, hal ini belum jadi masalah.

## Solusi: Apa itu UUID (Universally Unique Identifier) ?

Dari [Wikipedia](https://en.wikipedia.org/wiki/Universally_unique_identifier):
    
> The intent of UUIDs is to enable distributed systems to uniquely identify information without significant central coordination. In this context the word unique should be taken to mean "practically unique" rather than "guaranteed unique". Since the identifiers have a finite size, it is possible for two differing items to share the same identifier. The identifier size and generation process need to be selected so as to make this sufficiently improbable in practice. Anyone can create a UUID and use it to identify something with reasonable confidence that the same identifier will never be unintentionally created by anyone to identify something else. Information labeled with UUIDs can therefore be later combined into a single database without needing to resolve identifier (ID) conflicts.

Gampangnya, UUID adalah kumpulan 32 karakter (_String_) yang dibuat secara acak (_random_) dengan teknik khusus yang dijamin unik untuk setiap data.  Dalam waktu 1 detik pun, jika di-_generate_ 1000 UUID, kecil kemungkinan ada UUID yang sama. Sehingga lebih cocok untuk digunakan sebagai _Primary Key_.

Contoh UUID (tanpa strip):

    25769c6cd34d4bfeba98e0ee856f3e7a
    00b245066523042a3bf4698f30617f0e
    0179ec949e72ed4df4e0182965a71073

UUID tersebut tentu saja sulit ditebak oleh pengguna karena tidak mempunyai pola khusus. Jika ada _hacker_ yang ingin menggunakan program _looping_ untuk mendapatkan seluruh data User, maka dia perlu membuat banyak kombinasi 32 karakter tersebut, tentu tidak mudah dan membutuhkan waktu lama.


## Library UUID Generator untuk PHP / Laravel
Jika kita _search_ _Composer Package_ di [Packagist](https://packagist.org/search/?q=uuid ) _library_ yang populer digunakan untuk membuat UUID ini adalah [ramsey/uuid](https://packagist.org/packages/ramsey/uuid) / _website:_ [RAMSEY/UUID](https://benramsey.com/projects/ramsey-uuid/) / _source:_ [GitHub](https://github.com/ramsey/uuid).

Tambahkan _package_ ini di _composer.json_ dengan perintah:
    
    composer require ramsey/uuid

Kemudian untuk menggunakannya, dapat menggunakan contoh seperti yang ada di dokumentasi _library_ ini:

    require 'vendor/autoload.php';
 
    use Ramsey\Uuid\Uuid;
 
    // Generate a version 1 (time-based) UUID object
    $uuid1 = Uuid::uuid1();
    echo $uuid1->toString() . "\n"; // e4eaaaf2-d142-11e1-b3e4-080027620cdd
 
    // Generate a version 3 (name-based and hashed with MD5) UUID object
    $uuid3 = Uuid::uuid3(Uuid::NAMESPACE_DNS, 'php.net');
    echo $uuid3->toString() . "\n"; // 11a38b9a-b3da-360f-9353-a5a725514269
 
    // Generate a version 4 (random) UUID object
    $uuid4 = Uuid::uuid4();
    echo $uuid4->toString() . "\n"; // 25769c6c-d34d-4bfe-ba98-e0ee856f3e7a

    // Generate a version 5 (name-based and hashed with SHA1) UUID object
    $uuid5 = Uuid::uuid5(Uuid::NAMESPACE_DNS, 'php.net');
    echo $uuid5->toString() . "\n"; // c4a760a8-dbcf-5254-a0d9-6a4474bd1b62
 
UUID yang dibuat ada beberapa jenis versi (versi 1 s/d 5), masing-masing mempunyai kebutuhan sendiri-sendiri. Saya biasanya menggunakan versi 4.


### Tipe Data Database

Karena kita menggunakan UUID _string_ sebagai _Primary Key_, maka tipe data _field_ yang dibuat tidak bisa _Integer_, namun harus _Variable Character (VARCHAR)_, dengan panjang 32 karakter maksimum. Di Laravel, untuk _Migration_ dan _Schema Builder_ juga harus disesuaikan:

    Schema::create('users', function(Blueprint $table) 
    {
        $table->string('id', 32)->primary();
    });


### Eloquent ORM

Agar bisa menggunakan UUID di _Model Eloquent ORM_, kita harus menonaktifkan terlebih dahulu fitur _auto increment_, dengan cara:

    class User extends Model {

        protected $table = 'users';

        public $incrementing = false;

    }

Kemudian kita bisa menggunakan UUID ini pada saat `Create/Update` data seperti biasanya.

    use Ramsey\Uuid\Uuid;

    class UserController extends Controller {

        public function store()
        {
            $user           = new User;
            $user->id       = Uuid::uuid4()->getHex(); // toString();
            $user->name     = "Yoga Hanggara";
            $user->save();
        }

        public function update($id)
        {
            $user = User::find($id);
            $user->save();
        }
    }


### Efek Samping

Salah satu efek samping menggunakan UUID sebagai _Primary Key_ adalah tidak bisa melakukan _sorting_ atau _order by_ `ID` ini, karena datanya berupa _String_, bukan _Integer_ seperti biasanya. Untuk kebutuhan ini, kita harus pintar-pintar memanipulasi kolom `created_at` / `updated_at`.

Kesulitan lainnya adalah, `ID/UUID` ini menjadi susah untuk diingat :p

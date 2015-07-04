---
title: Mengenal Struktur Direktori Laravel 5
layout: post
tags: [laravel-5, basic]
---

Pada kesempatan kali ini saya akan membahas tentang struktur direktori pada laravel 5. Mengapa hal ini ingin saya bahas? Menurut saya laravel 5 memiliki susunan direktori yang berbeda dari framework-framework PHP lainnya. Secara garis besar, kebanyakan framework PHP yang menganut pola MVC (Model-View-Controller) menggunakan skema direktori dengan nama "Model", "View" dan "Controller" yang seluruhnya dikumpulkan kedalam sebuah direktori utama yang bernama "src" atau "app" / "application" (seperti Code Igniter). Pada skema tersebut, direktori "Model" digunakan untuk menyimpan class PHP yang berhubugan dengan model database, kemudian direktori "Controller" digunakan untuk menyimpan class PHP yang berhubungan dengan application logic dan direktori "View" digunakan untuk menyimpan file-file yang berhubungan tampilan aplikasi. Konvensi struktur direktori tersebut juga digunakan oleh laravel versi 5 namun dengan struktur yang sedikit berbeda dari biasanya dan (menurut saya) hal ini akan membuat bingung para pengguna framework yang baru berpindah dari framework lain seperti Yii / Code Igniter.

Oke, Berikut ini adalah struktur direktori dari laravel 5:

	|-- app
	|   |-- Console
	|   |   `-- Commands
	|   |-- Events
	|   |-- Exceptions
	|   |-- Http
	|   |   |-- Controllers
	|   |   |-- Middleware
	|   |   `-- Requests
	|   |-- Jobs
	|   |-- Listeners
	|   `-- Providers
	|-- bootstrap
	|   `-- cache
	|-- config
	|-- database
	|   |-- factories
	|   |-- migrations
	|   `-- seeds
	|-- public
	|-- resources
	|   |-- assets
	|   |   `-- less
	|   |-- lang
	|   |   `-- en
	|   `-- views
	|       |-- errors
	|       |-- layout
	|       `-- vendor
	|-- storage
	|   |-- app
	|   |-- framework
	|   |   |-- cache
	|   |   |-- sessions
	|   |   `-- views
	|   `-- logs
	|-- tests

Hal pertama yang terlintas dalam pikiran saya saat melihat struktur direktori diatas adalah "Waw, banyak sekali sub direktorinya?", "untuk apa sih direktori Events, Middleware, Request, Jobs, dll?", "kemana perginya direktori Model?" dan banyak pertanyaan-pertanyaan lainnya. Nah, melalui artikel ini saya akan mencoba membahas beberapa direktori utama yang perlu diperhatikan pada saat menggunakan framework ini.

## app/Http

Direktori ini merupakan direktori yang dibuat secara khusus untuk menyimpan seluruh file-file yang berkaitan dengan proses request dan response Http. Dikretori ini memiliki tiga buah sub direktori yang diantaranya adalah "Controllers", "Middleware" dan "Requests". Berikut ini adalah penjelasan mengenai fungsi dari ketiga buah sub direktori tersebut:

* app/Http/Controllers: direktori ini digunakan untuk menyimpan seluruh class Controller yang kita buat seperti misalnya ProductController.php, SalesController.php, dll.
* app/Http/Middleware: direktori ini digunakan untuk menyimpan seluruh class yang berhubungan dengna middleware PHP. secara umum middleware adalah sebuah class yang akan dieksekusi sebelum request yang masuk diberikan kepada Controller. Tujuan dari class Middleware adalah untuk melakukan filter seperti misalnya menolak akses dari user yang belum login. untuk penjelasan lengkapnya tentang middleware bisa baca dokumentasinya [disini](http://laravel.com/docs/5.1/middleware).
* app/Http/Requests: direktori ini hanya berisikan sebuah class yaitu Request.php yang dapat digunakan untuk mendapatkan data dari form request yang dikirim oleh web browser. Selama saya menggunakan laravel-5 direktori ini tidak pernah saya sentuh sama sekali karena sepertinya memang tidak perlu.

## database/migrations

Direktori ini berisikan file-file migrations yang digenerate oleh laravel pada saat kita menjalankan perintah `php artisan make:migration`. fitur migration sendiri sangat berguna untuk melakukan perubahan pada database baik itu penambahan tabel, penambahan kolom, menghapus kolom, menghapus tabel serta melakukan roll-back setiap perubahan database yang kita buat terutama pada saat kita mengerjakan sebuah project di dalam sebuah tim. untuk penjelasan lebih lanjut terkait fitur migration pada laravel silahkan baca dokumentasinya [disini](http://laravel.com/docs/5.1/migrations).

## database/seeds

Direktori ini berisikan file-file dabase seeds yang digenerate oleh laravel pada saat kita menjalankan perintah `php artisan make:seeder`. fitur seeding di laravel sendiri sangat berguna apabila kita ingin melakukan inisialisasi data pada table yang kita buat. untuk penjelasan lebih lanjut terkait fitur seeding pada laravel silahkan baca dokumentasinya [disin](http://laravel.com/docs/5.1/seeding).

## public

Pada dasarnya laravel memisahkan antara direktori public dan private. direktori public adalah direktori dimana seluruh resource aplikasi dapat diakses melalui web browser seperti misalnya gambar, javascript dan css. Sedangkan direktori private sendiri berisikan seluruh kode PHP yang telah kita buat ataupun yang merupakan bawaan dari framwork laravel itu sendiri. Umumnya, dalam melakukan proses deployment laravel yang secure, hanya direktori `public` ini sajalah yang diletakkan di dalam direktori `public_html` pada web server sedangkan direktori lainnya diletakkan di luar direktori `public_html` tersebut.

## resources

Direktori ini memiliki tiga buah sub direktori yaitu "assets", "lang" dan views. Berikut ini adalah penjelas singkat terkait fungsi dari masing-masing sub direktori tersebut:

* assets: Sejak rilis versi 5, laravel memiliki sebuah fitur yang ber nama laravel [elixir](http://laravel.com/docs/5.1/elixir). Fitur ini ditujukan untuk membantu para pengguna laravel untuk mengcompile file less, saas dan coffescript yang mereka buat. Nah, direktori ini ditujukan untuk menyimpan resources tersebut yang nantinya akan secara otomatis dicompile oleh laravel dengan menggunakan `gulp` dan dipindahkan ke dalam direktori `public`. Selain itu kita juga dapat menyimpan resources berupa image atau berkas-berkas lain yang nantinya akan dipindahkan oleh laravel kedalam direktori `public` dengan cara yang sama. Untuk penjelasan lebih lanjut terkait fitur laravel elixir, silahkan baca dokumentasinya [disini](http://laravel.com/docs/5.1/elixir).
* lang: Secara default laravel sudah memiliki support terhadap implementasi localization yang dapat membantu para pengguna framework untuk menciptakan aplikasi web yang multi bahasa. Direktori ini menyimpan seluruh definisi bahasa yang telah kita buat. Untuk penjelasan lebih lanjut terkait penggunaan fitur localization pada laravel, silahkan baca dokumentasinya [disini](http://laravel.com/docs/5.1/localization).
* views: Direktori ini digunakan untuk menyimpan seluruh file html / template blade yang kita buat.

## test

Laravel merupakan sebuah framework yang didesain dengan mindset unit testing. Oleh karena itu, secara default laravel sudah menyediakan library-library yang dibutuhkan untuk dapat melakukan unit testing seperti PHPUnit dan Mockery. Nah, direktori ini berfungsi untuk menyimpan seluruh file test yang dibuat untuk kemudian dijalankan oleh PHPUnit.

Nah, sepertinya saya sudah memaparkan beberapa direktori penting yang harus diperhatikan dalam menggunakan laravel 5. Eh, tunggu dulu. Kayaknya masih ada yang ketinggalan nih, kira-kira apa ya?

## Dimanakah saya harus meletakkan class Model di laravel 5?

Salah satu yang membuat saya bingung pada saat menggunakan laravel 5 adalah bahwa tidak adanya direktori bernama "Models" seperti framework-framework PHP MVC lainnya. Lalu, dimanakah seharusnya kita meletakkan class Models yang sudah dibuat? Apakah kita harus membuat sendiri folder bernama models di `app/Http`? Sebetulnya tidak ada konvensi khusus dimana letak class model berada, akan tetapi jika melihat default model user (User.php) yang disediakan oleh laravel, maka kita dapat meletakkan class Model yang dibuat langsung di dalam folder `app/Http` seperti misalnya `app/Http/Product.php`.

Oke, seperti sampai disini dulu yang bisa saya sampaikan. semoga bermanfaat untuk rekan-rekan semua. 
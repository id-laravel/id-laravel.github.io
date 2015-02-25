---
layout: post
title: Instalasi Laravel 4
---

Tidak seperti framework PHP kebanyakan, dimana Anda bisa download satu set folder, taruh di web server, dan aplikasi siap dijalankan, Laravel sedikit berbeda dalam hal instalasi. Laravel memiliki dependensi (ketergantungan) terhadap beberapa library PHP lainnya, dimana library tersebut tidak disertakan dalam [source laravel yang tersedia untuk didownload](https://github.com/laravel/laravel). Oleh karena itu Anda haru mendownload library yang dibutuhkan tersebut secara terpisah.

Merepotkan ??

Tidak juga

Seperti yang sudah pernah saya jelaskan [dalam tulisan lainnya](http://id-laravel.com/kenapa-memilih-laravel/), salah satu hal menarik dari Laravel adalah tentang [Composer](http://getcomposer.org). Composer-lah yang akan mengurusi segala ketergantungan Laravel dengan library lainnya. Dengan kata lain, kita tidak perlu mendownload satu persatu library yang dibutuhkan. Pokoknya terima beres  . **Prinsip kerja Composer sama dengan apt-get di linux atau npm di nodejs**. Karena Composer merupakan sesuatu yang cool dan keren, maka tidak ada salahnya kita install terlebih dahulu.

###Install Composer

Pengguna Windows bisa langsung download [Composer Installer](http://getcomposer.org/Composer-Setup.exe), jalankan proses instalasi, done.

Bagi penggunal Linux dan Mac bisa menjalankan perintah berikut:
<p><code>curl -sS https://getcomposer.org/installer | php</code></p>
<p><code>mv composer.phar /usr/local/bin/composer</code></p>

Untuk mengetes apakah instalasi berhasil, ketikkan perintah <code>composer</code> di terminal/console/command prompt Anda.

Ok, kembali ke masalah instalasi Laravel, ada 3 alternatif yang bisa Anda pilih:

Metode 1: Via <code>composer create-project</code> (recommended)

Metode 2: Download laravel + <code>composer update</code>

Metode 3: Download laravel dan semua dependensi yang dibutuhkan

###Metode 1:  Via <code>composer create-project</code> (recommended)

Buka terminal, console, atau command prompt, masuk ke webroot folder Anda dan jalankan perintah berikut untuk setup aplikasi Laravel:

<code>composer create-project laravel/laravel sampleApp --prefer-dist</code>

Composer akan bekerja untuk Anda, mendownload laravel versi terakhir beserta semua library yang dibutuhkan.

<figure>
	<img src="https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/laravel-installation-process.png" alt=""  />
	<figcaption>Proses instalasi laravel</figcaption>
</figure>

Jika sudah selesai, buka http://localhost/sampleApp/public, apa yang Anda lihat?

###Metode 2: download laravel dan install dependensi menggunakan <code>composer install</code>

Download [laravel versi terbaru langsung dari github](http://github.com/laravel/laravel/archive/master.zip). Ekstrak file zip tersebut ke dalam folder sampleApp di webroot Anda. Selanjutnya buka terminal/console/command prompt, masuk ke folder tersebut dan jalankan perintah:

<code>php composer.phar install</code>

atau

<code>composer install</code>

Tunggu sampai Composer selesai bekerja, lalu buka http://localhost/sampleApp/public, apa yang Anda lihat?

###Metode 3: Download laravel dan semua dependensi yang dibutuhkan

Jika Anda masih bertanya-tanya kenapa Laravel tidak seperti framework lainnya yang tinggal download, ekstrak, jalankan aplikasi, maka metode yang ketiga ini bisa sedikit menghibur Anda. Kebetulan ada orang baik diluar sana yang sudah melakukan setup laravel dan mendownload semua dependensi yang diperlukan (artinya orang tersebut sudah melakukan entah metode 1 atau metode 2). Anda bisa mendownload file yang sudah lengkap tersebut [disini](https://github.com/mandado/laravel-preloaded/archive/master.zip). Selanjutnya ekstrak file tersebut dan pindahkan isinya ke folder sampeApp di webroot Anda.

Jika sudah, buka http://localhost/sampleApp/public, apa yang Anda lihat?

**Perhatian**
Cara ini tidak dianjurkan karena file tersebut tidak dijamin up to date. Artinya bisa jadi file yang Anda download bukan merupakan Laravel versi terbaru. Pun demikian dengan library lainnya. Tapi masih oke lah jika Anda hanya sekedar ingin coba-coba.

###Welcome To Laravel

<figure>
	<img src="https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/laravel-welcome.png" alt=""   />
	<figcaption>Selamat datang di laravel</figcaption>
</figure>

Jika Anda sudah berhail melihat gambar diatas, selamat, Anda sudah tiba di dunia Laravel dan berhasil melakukan langkah pertama untuk menjadi seorang **web artisan**.

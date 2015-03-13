---
layout: post
title: Menghilangkan folder public di URL pada aplikasi Laravel
tags: [tips, url]
---

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/rajaampat.png)

Jika Anda sudah berani membaca postingan ini, maka saya asumsikan Anda sudah familiar dengan Laravel, atau minimal Anda sudah berhasil [menginstall Laravel](http://id-laravel.com/post/instalasi-laravel-4) di komputer Anda. Lebih keren lagi kalau Anda sudah berhasil membuat aplikasi beneran, baik itu proyekan atau produk sendiri. Jika tidak keberatan, mention [@id_laravel](http://twitter.com/id_laravel) di twitter ya, nanti aplikasinya bakal dimunculin di bagian [Showcase](http://id-laravel.com/tag/showcase) :D

Salah satu yang tidak menyenangkan dari Laravel, selain instalasinya yang tidak mainstream, adalah url aplikasi yang harus ketambahan embel-embel **/public**. Jadi misalkan Anda punya domain laravel-no-public.com, maka aplikasi Laravel bisa diakses dengan mengetikkan url **laravel-no-public.com/public**.

Ga lucu kan...

Untuk mengatasinya, ada beberapa alternatif cara yang bisa dilakukan, tergantung seberapa geeks Anda.

### Cara 1: Anda Punya Server Sendiri
Jika Anda seorang sysadmin, atau mempunyai server sendiri, maka menghilangkan **/public** merupakan perkara mudah. Edit saja file `httpd.conf` (atau sejenisnya) sehingga document root merujuk ke folder `laravel/public`.

    <VirtualHost *:80>
        DocumentRoot "/path/to/laravel/public"
        ServerName laravel-no-public.com
        ServerAlias www.laravel-no-public.com
    </VirtualHost>

### Cara 2: Anda Hanya Memiliki CPanel
Jika Anda tidak cukup beruntung untuk bisa mengakses server secara langsung dan hanya diberi fasilitas CPanel, maka cara manual berikut ini masih bisa dilakukan.

> Pada dasarnya, entry point dari aplikasi Laravel adalah file `index.php` yang ada di dalam folder **public**. Jika Anda ingin mengakses url aplikasi tanpa **/public** di belakang, maka salah satu cara yang bisa dilakukan adalah memindahkan file `public/index.php` ke document root (biasanya folder public_html atau folder www).

#### 2.1. Ubah Struktur Folder

Katakanlah Anda memiliki struktur folder seperti berikut ini:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/folder-structure-1.png)


Selanjutnya, buat sebuah folder baru dengan nama **protected**:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/folder-structure-2.png)

Lalu pindahkan semua file dan folder (kecuali folder **public**) ke dalam folder **protected** yang baru saja dibuat:

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/folder-structure-3.png)

Terakhir, pindahkan isi folder **public** ke luar sehingga setara dengan folder **protected** tadi. **Pastikan file `.htaccess` juga ikut dipindahkan**. Folder public yang kosong bisa Anda hapus.

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/folder-structure-4.png)

Sampai sini Anda sudah bisa mengakses aplikasi tanpa harus menambahkan embel-embel **/public** di belakang, tapi akan ditemui error seperti ini:

    Warning: require(/Users/uyab/Sites/public_html/public/../bootstrap/autoload.php): failed to open stream: No such file or directory in /Users/uyab/Sites/public_html/public/index.php on line 21

    Fatal error: require(): Failed opening required '/Users/uyab/Sites/public_html/public/../bootstrap/autoload.php' (include_path='.:/Applications/MAMP/bin/php/php5.4.10/lib/php') in /Users/uyab/Sites/public_html/public/index.php on line 21

Sampai disini, setup folder sudah selesai, selanjutnya tinggal mengupdate beberapa file terkait konfigurasi path sehingga bisa merujuk ke struktur folder yang baru.

#### 2.2. Edit index.php

    require __DIR__.'/protected/bootstrap/autoload.php';

    ...

    $app = require_once __DIR__.'/protected/bootstrap/start.php';

#### 2.3. Edit protected/bootstrap/paths.php

	'public' => __DIR__.'/../..',


Selesai, sekarang Anda bisa mengakses aplikasi tanpa embel-embel **/public** di belakang.

![image](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/public-removal/site-no-public.png)



Credits:

Banner Image: [Raja Ampat](https://www.google.com/search?site=&tbm=isch&source=hp&biw=1280&bih=621&q=rajaampat&oq=rajaampat&gs_l=img.3..0l2j0i24j0i10i24j0i24j0i10i24l2.814.2381.0.2446.9.9.0.0.0.0.82.582.8.8.0....0...1ac.1.32.img..1.8.580.eI_JjBPvD3c#q=raja+ampat&tbm=isch)

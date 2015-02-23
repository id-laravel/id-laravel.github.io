---
title: Kenapa memilih Laravel?
layout: post
---

Woohoo… framework baru lagi? Mungkin pertanyaan Anda sama dengan saya, sudah ada cukup banyak framework PHP di dunia ini, mulai dari yang ringan dan mudah dipelajari seperti [CodeIgniter](http://codeigniter.com), yang terlalu kompleks dan enterprise seperti [Zend Framework](http://framework.zend.com), yang bisa simsalabim bikin prototype CRUD dalam hitungan detik semacam [CakePHP](http://cakephp.org),  hingga yang lebih robust seperti [Yii Framework](http://yiiframework.com).

Kemunculan framework bisa dikatakan mirip dengan kondisi partai di Indonesia, setiap musim selalu saja ada yang baru, dengan ideologi yang sebenarnya ga beda-beda jauh dari yang sudah ada. Kalau bukan performa yang sangat cepat, pasti yang diandalkan adalah kecepatan development dimana berbagai macam kebutuhan standard seperti autentikasi, form validation, dan query ke database sudah disediakan out of the box.

<figure>
	<img src="https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/bendera-partai.jpg" alt=""/>
	<figcaption>Framework PHP = partai di Indonesia, kebanyakan, ideologinya mirip-mirip</figcaption>
</figure>

Nah, sejak tahun 2012 muncul satu fenomena yang cukup berbeda dan menarik perhatian, dimana ada satu framework yang membawa ideologi baru yang selama ini jarang diperhatikan, yaitu aspek “clean code” dan “expressiveness”. Framework ini mengaku “clean and classy”, kodenya lebih singkat, mudah dimengerti, dan ekspressif, jadi hanya dengan membaca sekilas kode yang ditulis Anda sudah bisa menduga apa maksudnya tanpa perlu membaca dokumentasi. Framework ini dinamakan **LARAVEL**.

Jadi, apa saja yang dimiliki laravel yang membuat saya jatuh hati padanya, dan mungkin juga Anda?

### PHP 5.3
Tentu Anda sudah tahu bahwa php 5.3 memiki cukup banyak [fitur baru](http://php.net/manual/en/migration53.new-features.php) dalam segi bahasa, yang membuat PHP terasa lebih modern dan powerfull. Laravel dikembangkan secara khusus untuk PHP 5.3, jadi framework ini bisa memanfaatkan berbagai macam kelebihan yang dimiliki PHP versi baru tersebut. Tidak ada backward compatibility dengan PHP versi sebelumnya.

Beberapa fitur yang cukup penting adalah namespace, anonymous function, dan autoloading.

Dengan namespace, Anda bisa membuat dua kelas dengan nama yang sama.

    // file1.php
    namespace Jungle;

    class Tarzan {
      static function says() {
    	  echo 'auoowww';
      }
    }

    // file2.php
    namespace City;

    class Tarzan {
      static function says() {
    	  echo 'haloo';
      }
    }

Anonymous function memungkinkan Anda membuat inline function, fungsi tanpa nama, seperti yang biasa Anda temui di JavaScript.

    $input = array(1, 2, 3, 4, 5);
    $output = array_filter($input, function ($v) { return $v > 2; });

> <b>Tahukah Kamu?</b>
> Taylor Oatwell, sang creator Laravel, ternyata memiliki latar belakang .Net. Seperti yang sudah umum diketahui bahwa teknologi .Net biasa digunakan untuk membuat aplikasi enterprise. Dan Taylor Oatwell mencoba mengaplikasikan pengalamannya tersebut ke dalam Laravel. Dia baru mulai belajar PHP setelah versi 5.3 dirilis dan Laravel sangat beruntung karena keterlambatan mengenal PHP tersebut membuat Laravel tidak terkontaminasi dengan ‘backward compatibility’ PHP dan bisa fokus memanfaatkan fitur-fitur barunya.

### Syntax yang *Cool & Expressive*
Coba bandingkan dua buah kode berikut, yang mememiliki tujuan yang sama, tapi dengan gaya penulisan yang berbeda:


    // kode 1, framework xxx
    $uri = Uri::create('some/uri', array(), array(), true)

    // kode 2, Laravel
    $url = URL::to_secure('some/uri');


Untuk kode pertama, Anda pasti bertanya-tanya apa sih maksud parameter kedua, ketiga, dan keempat. Singkatnya, parameter keempat berfungsi sebagai flagging, true untuk https dan false untuk http.

Laravel melakukan pendekatan yang berbeda dengan membuang parameter yang sifatnya flagging dan memilih untuk membuat dua fungsi yang berbeda. Bagi saya pendekatan semacam ini lebih jelas karena minimal satu parameter fungsi telah berkurang. Less is more.

Contoh lain dimana laravel memiliki kesederhanaan adalah masalah routing. Pada prinsipnya membangun website hanyalah masalah request-response. Ada request terhadap halaman x dan Anda harus menyediakan response x. Untuk itulah Laravel menerapkan prinsip routing yang sangat simpel:

    // output html menggunakan simpel echo
    Route::get('halo', function()
    {
        echo 'halo, saya web artisan';
    });

    // output menggunakan view terpisah, seperti yang lazim ditemui di framework berbasis MVC
    Route::get('home', function()
    {
        return View::make('home.index');
    });


Ok, terlihat terlalu simpel malahan, dan mungkin Anda bertanya-tanya dimana Controllernya?  Kita akan membahasnya lebih mendalam di kesempatan lain. Untuk saat ini saya hanya ingin memperlihatkan betapa Laravel sangan simpel dan bersih, bahkan tanpa Model, View, atau Controller pun Anda tetap bisa membuat website  :)

### Composer
[Composer](http://getcomposer.org) adalah sebuah ‘dependency manager’ untuk PHP. Anda bisa menginstall suatu library melalui composer dan composer akan secara otomatis menginstall library lain yang dibutuhkan, tanpa perlu mendownload satu persatu. Mirip dengan apt get install di sistem operasi linux.

Contoh file yang mendeskripsikan dependensi:

    {
        "require": {
            "vendor/package": "1.3.2",
            "vendor/package2": "1.*",
            "vendor/package3": ">=2.0.3"
    	}
    }

Lalu jalankan:
<pre class="prettyprint lang-basic"><code>composer update</code></pre>

Dan seluruh library yang Anda butuhkan akan otomatis didownload dan siap digunakan. Untuk lebih jelasnya silakan kunjungi [https://packagist.org/](https://packagist.org).

### Official Website yang Keren

<figure>
	<img src="https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/website%20laravel.png" alt=""/>
	<figcaption>Tampilan homepage laravel.com</figcaption>
</figure>

Web laravel.com terlihat simpel, menarik, jelas dan mudah digunakan, dengan pilihan warna yang out of the box. Jika mereka bisa membuat website yang indah dan enak dilihat, maka saya yakin mereka juga bisa membuat framework yang indah dan nyaman digunakan.

> "Good programmer write code for machine, great programmer write code for other programmer"

### Link Terkait
Jika Anda tertarik mempelajari lebih jauh tentang Laravel (sekarang sudah versi 4), silakan kunjungi link-link di bawah ini. Jika Anda tertarik untuk berbagi ilmu tengan Laravel di website ini, silakan colek twitter [@id_laravel](http://twitter.com/id_laravel). Membuat web seharusnya bisa menjadi pekerjaan yang menyenangkan untuk semua orang, dan Laravel bisa membantu mewujudkannya.

[http://laravel.com](http://)

[http://codebright.daylerees.com/](http://)

[http://four.laravel.com/docs](http://)

[http://forums.laravel.io/](http://)

[http://forums.laravel.io/](http://)

[https://laracasts.com/](http://)

---
layout: post
title: Memisah File Log Aplikasi
tags: [snippet, log]
---

## Apa Itu Log Aplikasi?

Log aplikasi adalah segala catatan terkait dengan aplikasi kita. Catatan ini biasanya dituliskan oleh developer (atau otomatis ditulis oleh framework yang dipakai) untuk membantu proses debugging atau bug fixing di kemudian hari.

Laravel secara default menyimpan log aplikasi di file `storage/logs/laravel.log`. Setiap `error` atau `exception` yang terjadi saat aplikasi berjalan akan disimpan di file tersebut.

Jika kita ingin menambah log secara manual, kita bisa memanggil beberapa fungsi yang sudah disediakan:

	Log::emergency($log);
	Log::alert($log);
	Log::critical($log);
	Log::error($log);
	Log::warning($log);
	Log::notice($log);
	Log::info($log);
	Log::debug($log);

Urutan fungsi-fungsi di atas juga menyatakan level seberapa penting log tersebut, dimulai dari `emergency` yang paling penting dan diakhiri dengan `debug` yang tidak terlalu penting. Dokumentasi tentang Log bisa dibaca lebih lengkap di [website Laravel](http://laravel.com/docs/5.1/errors#logging).

Yang menjadi masalah adalah, apapun fungsi yang kita panggil, semua log akan ditulis ke dalam satu file yang sama, yaitu `laravel.log`. Jadi log untuk debugging aplikasi bercampur dengan log terkait error aplikasi. Hal ini sedikit menyusahkan ketika ternyata aplikasi kita masih banyak errornya, sehingga log debugging kita dengan cepat 'tenggelam' ditimpa log error yang mengalir tiada henti :D.

## Tantangan
Bagaimana caranya memisah file log untuk masing-masing level? Jadi `Log::error()` akan ditulis ke `error.log`, `Log::info()` ditulis ke `info.log`, dan `Log::debug()` ditulis ke `debug.log`.

## (Pencarian) Solusi
Pencarian solusi dari tantangan ini sedikit berliku. Sumber pertama tetap website [laravel.com](http://laravel.com). Di bagian [konfigurasi logging](http://laravel.com/docs/5.1/errors#configuration) dijelaskan bahwa di belakang layar Laravel menggunakan `library` [Monolog](https://github.com/Seldaek/monolog). Jika kita ingin memodifikasi perilaku `Log` bawaan Laravel, kita bisa membuka file `app/bootstrap/app.php` dan menambahkan kode berikut di akhir baris tepat sebelum `return $app`:

	$app->configureMonologUsing(function($monolog) {
	    $monolog->pushHandler(...);
	});

Pertanyaan selanjutnya, apa yang harus ditambahkan di `pushHandler`? Apa itu `pushHandler`?

Pencarian berlanjut ke sebuah diskusi di [laravel.io](http://laravel.io/forum/02-09-2014-laraverl-custom-logs) dengan penemuan potongan kode berikut:

	use Monolog\Logger;
	use Monolog\Handler\StreamHandler;
	
	$view_log = new Logger('View Logs');
	$view_log->pushHandler(new StreamHandler('path/to/log.log', Logger::INFO));
	
	$view_log->addInfo("User $user clicked");

Ada sedikit pencerahan, tapi solusi belum terbayang, maka pencarian terus dilanjutkan. Tujuan berikutnya adalah [sebuah diskusi di laracasts.com](https://laracasts.com/discuss/channels/general-discussion/advance-logging-with-laravel-and-monolog). Disini ada potongan kode yang mirip dengan kode sebelumnya:

	$bubble = false;
	
	// Stream Handlers
	$infoStreamHandler = new StreamHandler( storage_path("/logs/laravel_info.log"), Monolog::INFO, $bubble);
	$warningStreamHandler = new StreamHandler( storage_path("/logs/laravel_warning.log"), Monolog::WARNING, $bubble);
	$errorStreamHandler = new StreamHandler( storage_path("/logs/laravel_error.log"), Monolog::ERROR, $bubble);
	
	// Get monolog instance and push handlers
	$monolog = $log->getMonolog();
	$monolog->pushHandler($infoStreamHandler);
	$monolog->pushHandler($warningStreamHandler);
	$monolog->pushHandler($errorStreamHandler);
	
Akhirnya pencarian dilanjutkan ke [halaman github Monolog](https://github.com/Seldaek/monolog) dan membaca source code.
	
Sampai disini mulai muncul beberapa temuan penting:

* 	Laravel menggunakan Monolog
* 	Monolog punya fungsi pushHandler
*  Ada 3 parameter penting di pushHandler:
	*  Handler itu sendiri
	*  Level log yang ingin di handle
	*  $bubble, apakah log ini akan diteruskan ke atas (ke level yang lebih rendah).

### Handler
Handler ini mengatur aksi apa yang akan dilakukan terkait log yang terjadi. Yang paling lumrah adalah menulikan ke file. Tapi bisa juga log ini dikirim via email, diteruskan ke syslog, atau dikirim ke layanan manajamen log seperti [loggly](https://www.loggly.com/). Daftar lengkap handler yang didukung oleh Monolog bisa dilihat [disini](https://github.com/Seldaek/monolog/tree/master/src/Monolog/Handler).

### Level Log
Seperti sudah disebutkan sebelumnya, ada delapan level log yang tersedia dan sudah baku digunakan. Parameter level log ini memungkinkan kita untuk mendaftarkan handler yang berbeda untuk setiap level. Misalnya untuk log error dikirim ke email, tapi kalau debug dan warning cukup ditulis ke file saja.

### Bubble
Parameter `$bubble` mengindikasikan apakah setelah sebuah log diproses oleh handler tertentu akan diteruskan ke handler lainnya (jika memang ada).

Untuk lebih jelasnya, silakan praktekkan kode berikut ini:

	...
    $bubble = false; // silakan diganti true atau false, dan lihat hasilnya
    $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/error1.log", \Monolog\Logger::ERROR, $bubble));
    $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/error2.log", \Monolog\Logger::ERROR, $bubble));
    ...
    
Lalu panggil kode berikut dari manapun:

    \Log::error('error');    
	
Jika `$bubble=true` maka error log akan tercatat di kedua file, sedangkan jika `$bubble=false` error log hanya akan tercatat di file error2.log (handler yang terakhir didaftarkan). 

## Solusi

Dari hasil pencarian di atas, akhirnya ketemu solusi seperti berikut ini:

	$app->configureMonologUsing(function ($monolog) use ($app) {
	    $bubble = false;
	
        $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/debug.log", Logger::DEBUG,
            $bubble));
        $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/info.log", Logger::INFO,
            $bubble));            
        $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/notice.log", Logger::NOTICE,
            $bubble));

	});	

Atau dengan sedikit ilmu 'opreker', kita tahu bahwa Monolog sudah memiliki fungsi `getLevels()` sehingga kode diatas bisa dipercantik menjadi seperti ini:

	$app->configureMonologUsing(function ($monolog) use ($app) {
	    $bubble = false;
	
	    foreach ($monolog->getLevels() as $name => $level) {
	        $name = strtolower($name);
	        $monolog->pushHandler(new \Monolog\Handler\StreamHandler($app->storagePath() . "/logs/{$name}.log", $level,
	            $bubble));
	    }
	});	
	
Kembali mengingatkan, kode diatas ditambahkan ke file `app/bootstrap/app.php`, di akhir baris tepat sebelum `return $app`.
	
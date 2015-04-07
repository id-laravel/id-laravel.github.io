---
layout: post
title: Afikaaa... Ada Yang Baru Nih di PHP 7
tags: [php]
---

<iframe width="640" height="480" src="https://www.youtube.com/embed/4mdQB9x6Lk4" frameborder="0" allowfullscreen></iframe>  

<br />  
  
PHP 7 dijadwalkan rilis tahun 2015 ini. Sudah sangat lama sejak terakhir kali kita menikmati update versi mayor, dari PHP 4 ke PHP 5, yang terjadi di tahun 2004 yang lampau. Ya, sudah lebih dari sepuluh tahun sejak keluarga 5.x dikenalkan pertama kali dan merajalela hingga sekarang. Meskipun ada banyak perubahan siginifikan seperti `namespace` di PHP 5.3 dan `trait` di PHP 5.4, tetapi versi yang dipakai masih tetap 5.x, belum menjadi <del>PHP 6</del> PHP 7.

Saat ini diskusi tentang fitur-fitur apa saja yang akan ada di PHP 7 sudah hampir rampung dirumuskan. Ada beberapa perubahan signifikan yang menarik untuk kita intip bersama-sama. Yuk mari...

### Spaceship Operator <=>

*Spaceship operator* atau disebut juga *three way comparison operator* adalah operator perbandingan yang memiliki 3 kemungkinan *return value*: 0 jika yang dibandingkan setara, -1 jika nilai sebelah kiri lebih kecil, dan 1 jika nilai sebelah kiri lebih besar.

Berikut ini contoh penggunaannya, dikutip dari [https://wiki.php.net/rfc/combined-comparison-operator](https://wiki.php.net/rfc/combined-comparison-operator):


	// Integers
	echo 1 <=> 1; // 0
	echo 1 <=> 2; // -1
	echo 2 <=> 1; // 1
	 
	// Floats
	echo 1.5 <=> 1.5; // 0
	echo 1.5 <=> 2.5; // -1
	echo 2.5 <=> 1.5; // 1
	 
	// Strings
	echo "a" <=> "a"; // 0
	echo "a" <=> "b"; // -1
	echo "b" <=> "a"; // 1
	 
	echo "a" <=> "aa"; // -1
	echo "zz" <=> "aa"; // 1
	 
	// Arrays
	echo [] <=> []; // 0
	echo [1, 2, 3] <=> [1, 2, 3]; // 0
	echo [1, 2, 3] <=> []; // 1
	echo [1, 2, 3] <=> [1, 2, 1]; // 1
	echo [1, 2, 3] <=> [1, 2, 4]; // -1
	 
	// Objects
	$a = (object) ["a" => "b"]; 
	$b = (object) ["a" => "b"]; 
	echo $a <=> $b; // 0
	 
	$a = (object) ["a" => "b"]; 
	$b = (object) ["a" => "c"]; 
	echo $a <=> $b; // -1
	 
	$a = (object) ["a" => "c"]; 
	$b = (object) ["a" => "b"]; 
	echo $a <=> $b; // 1
	 
	// only values are compared
	$a = (object) ["a" => "b"]; 
	$b = (object) ["b" => "b"]; 
	echo $a <=> $b; // 0

### Scalar Type Hints

Sejak PHP 5, kita bisa mendefinisikan tipe parameter untuk suatu fungsi seperti dibawah ini:

	<?php
		function coblos(User $citizen, $number) {
			echo $citizen->name . " mencoblos partai nomor urut " . $number;
		}

Namun, tipe data yang bisa dipakai untuk *type hint* hanya `object` dan `array`. Di PHP 7 nanti, ada tambahan dukungan untuk *type hint* , yaitu empat tipe data primitif (scalar): `int`, `float`, `string`, dan `bool`. 

Sebagai contoh, kode di bawah ini valid untuk PHP 7, tapi tidak untuk PHP 5:

	<?php
		function coblos(User $citizen, int $number) {
			echo $citizen->name . " mencoblos partai nomor urut " . $number;
		}


### Return Type Declaration

Selain *type hint* untuk argumen fungsi, PHP 7 juga sudah mendukung *return type declaration* dimana kita bisa mendeklarasikan tipe data dari nilai yang dikembalikan oleh fungsi tersebut.

	function helloWorld(): string {
	    return "hello world";
	}


### Kapan Rilis?

PHP 7 dijadwalkan akan dirilis pada bulan Oktober 2015. Jadi tunggu saja kelanjutan kisahnya. 

## Kemana PHP 6?

Nah, ngomong-ngomong soal versi, kenapa tiba-tiba muncul PHP 7 dan bukan PHP 6.  Apakah para *core developer* PHP salah ketik? Rasanya tidak mungkin. Apakah 6 dianggap angka sial yang harus dihindari? Mustahil juga. Atau karena petinggi partai nomor 6 dianggap melanggar HAM? Ngawur. Lalu kenapa? 

#### Layu Sebelum Berkembang
Alkisah beberapa tahun yang lalu, sudah ada wacana untuk mengembangkan PHP 6 dengan bebeerapa perubahan. Yang paling menonjol adalah adanya dukungan terhadap unicode dengan menggunakan encoding UTF-16. Presentasi dan publikasi sudah dilakukan di banyak tempat. Orang sudah terlanjur mengenal PHP 6 sebagai PHP yang mendukung unicode, meskipun belum secara resmi dirilis.

**Ternyata kenyataan tidak seindah harapan...**

Implementasi di level interpreter agar mendukung UTF-16 tidak mudah dilakukan. 4 tahun berselang tanpa ada perkembangan berarti, akhirnya PHP 6 menyerah pada takdir. Sampai versi 5.6 sekarang, PHP masih tidak mendukung unicode.

#### Demokrasi

Ketika kemudian versi mayor berikutnya akan dirilis, timbul pertanyaan besar, apakah akan dinamai versi 6 atau versi 7? Jika mengikuti kaidah penamaan yang normal, tentunya dari PHP 5 dilanjutkan ke PHP 6. Tetapi, karena pada prakteknya "PHP 6" pernah ada (meski tidak benar-benar dirilis secara resmi), pernah menjadi perbincangan dimana-mana, dan menjadi referensi untuk versi PHP yang mendukung UTF-16, maka akhirnya setelah melalui proses demokrasi yang jujur dan adil diputuskanlah PHP 7 sebagai nama untuk versi mayor selanjutnya.

Kami tunggu kehadiranmu, PHP 7. 

Jangan PHP-in kami (lagi) ya ;)
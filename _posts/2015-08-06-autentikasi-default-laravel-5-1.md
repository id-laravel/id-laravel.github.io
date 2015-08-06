---
layout: post
title: "Autentikasi Default Laravel 5.1"
tags: [autentikasi, login, logout, registrasi, reset password]
---

## Preambul

Jika Anda mengikuti perkembangan Laravel sejak versi 5 keatas, maka fitur autentikasi sempat dimunculkan secara default. Kita bisa langsung memakainya tanpa perlu koding sedikitpun, seperti yang pernah dibahas diartikel [Autentikasi Default Laravel 5](/post/autentikasi-default-laravel-5/) sebelumnya.

Tapi setelah Laravel 5.1 rilis, ternyata fitur ini dihilangkan, atau lebih tepatnya setengah hilang. File migrasi dan `Controller` untuk autentikasi masih tersedia di `app/Http/Controller/Auth/AuthController.php`, tetapi `route` dan `view` sudah tidak ada. Pada kesempatan kali ini kita akan mencoba "membangkitkan kembali" fitur autentikasi yang hilang tersebut.

## Migration
Setelah meng-install Laravel dan melakukan konfigurasi database, jalankan perintah `php artisan migrate` untuk membuat tabel-tabel yang diperlukan dalam proses autentikasi.

## Login
Buka file `app/Http/routes.php` dan tambahkan `routes` untuk melakukan login dan logout:

	Route::get('auth/login', 'Auth\AuthController@getLogin');
	Route::post('auth/login', 'Auth\AuthController@postLogin');
	Route::get('auth/logout', 'Auth\AuthController@getLogout');

Lalu tambahkan `view` untuk melakukan login di `resources/views/auth/login.blade.php`:

	@if (count($errors) > 0)
	    <div class="alert alert-danger">
	        <ul>
	            @foreach ($errors->all() as $error)
	                <li>{{ $error }}</li>
	            @endforeach
	        </ul>
	    </div>
	@endif

	<form method="POST" action="/auth/login">
	    {!! csrf_field() !!}

	    <div>
	        Email
	        <input type="email" name="email" value="{{ old('email') }}">
	    </div>

	    <div>
	        Password
	        <input type="password" name="password" id="password">
	    </div>

	    <div>
	        <input type="checkbox" name="remember"> Remember Me
	    </div>

	    <div>
	        <button type="submit">Login</button>
	    </div>
	</form>

Halaman login bisa diakses di `auth/login` dan hasilnya seperti dibawah ini. 
![Form Login Laravel](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/autentikasi/default-login-form-laravel.png)

Silakan dicoba-coba. Pastinya Anda belum bisa login karena belum mendaftar. Jadi langkah selanjutnya adalah membuat form registrasi.


## Registrasi

Buka kembali file `routes.php`, tambahkan `routes` untuk melakukan registrasi seperti dibawah ini:

	Route::get('auth/register', 'Auth\AuthController@getRegister');
	Route::post('auth/register', 'Auth\AuthController@postRegister');

Selanjutnya tambahkan file `resources/views/auth/register.blade.php`:

	@if (count($errors) > 0)
	    <div class="alert alert-danger">
	        <ul>
	            @foreach ($errors->all() as $error)
	                <li>{{ $error }}</li>
	            @endforeach
	        </ul>
	    </div>
	@endif

	<form method="POST" action="/auth/register">
	    {!! csrf_field() !!}

	    <div>
	        Name
	        <input type="text" name="name" value="{{ old('name') }}">
	    </div>

	    <div>
	        Email
	        <input type="email" name="email" value="{{ old('email') }}">
	    </div>

	    <div>
	        Password
	        <input type="password" name="password">
	    </div>

	    <div>
	        Confirm Password
	        <input type="password" name="password_confirmation">
	    </div>

	    <div>
	        <button type="submit">Register</button>
	    </div>
	</form>

Halaman registrasi tersebut bisa diakses di `auth/register`, tampilannya seperti ini:

![Form Registrasi Laravel](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/autentikasi/default-registration-form-laravel.png)

Silakan mencoba melakukan registrasi dengan mengisi data yang benar.

## Lupa Password

Fitur selanjutnya adalah "lupa password" dimana user yang lupa dengan passwordnya sendiri, bisa meminta aplikasi untuk mengirimkan link untuk reset password ke emailnya. Tentu saja dengan catatan, user tersebut tidak lupa alamat emailnya :D

Seperti biasa, setiap penambahan halaman selalu dimulai dengan penambahan `routes`:

	Route::get('password/email', 'Auth\PasswordController@getEmail');
	Route::post('password/email', 'Auth\PasswordController@postEmail');

Tambahkan juga file `resources/views/auth/password.blade.php`:

	<form method="POST" action="/password/email">
	    {!! csrf_field() !!}

	    <div>
	        Email
	        <input type="email" name="email" value="{{ old('email') }}">
	    </div>

	    <div>
	        <button type="submit">
	            Send Password Reset Link
	        </button>
	    </div>
	</form>

Kita juga perlu menambahkan view untuk tampilan emailnya di `resoruces/views/emails/password.blade.php`:

	Click here to reset your password: {{ url('password/reset/'.$token) }}
	
![Lupa Password Laravel](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/autentikasi/forgot-password.png)	

Isikan alamat email yang Anda gunakan ketika registrasi. Jika benar, maka aplikasi akan mengirimkan link untuk reset password ke alamat email tersebut.

Karena fitur ini memerlukan pengiriman email, maka Anda harus melakukan konfigurasi email terlebih dahulu. Di aplikasi yang sesungguhnya, Anda akan mempunyai sebuat mail server tersendiri atau memanfaatkan layanan pengirim email seperti [mandrill](https://mandrillapp.com), [mailgun](http://www.mailgun.com/), [ses](https://aws.amazon.com/ses/), dan lain sebagainya.

Jika Anda perhatikan file `config/mail.php` di bagian `driver`, disitu ada beberapa mail driver yang sudah didukung secara default oleh Laravel. Untuk keperluan testing, kita bisa menggunakan driver yang disebutkan terakhir, yaitu `log`. 

Buka file `.env` di folder instalasi Laravel, lalu ubah bagian `MAIL_DRIVER=mailtrap` menjadi `MAIL_DRIVER=log`. Dengan menggunakan driver `log`, maka semua email yang dikirim oleh aplikasi tidak benar-benar dikirim ke alamat tujuan, melainkan hanya ditulis di file `storage/logs/laravel.log`.

Silakan diisi form reset passwordnya, lalu perhatikan isi file `laravel.log`:

	[2015-08-05 08:10:55] local.DEBUG: Message-ID: <ac54799c65c307f64c41ada1dbb36b32@base.dev>
	Date: Wed, 05 Aug 2015 08:10:55 +0000
	Subject: Your Password Reset Link
	From: 
	To: uyab.exe@gmail.com
	MIME-Version: 1.0
	Content-Type: text/html; charset=utf-8
	Content-Transfer-Encoding: quoted-printable

	Click here to reset your password: http://base.dev/password/reset/d6f77bab44cdcb4471fa95082d6ac7dd5aade781d5fa67b3a5b930b9bce8b795

Meskipun kurang enak dibaca, paling tidak kita sudah bisa mendapatkan link untuk reset password. Link ini akan digunakan pada proses selanjutnya.

## Reset Password

Nah, kita sudah sampai pada bagian terakhir autentikasi, yaitu reset password. Tambahkan `routes` berikut ini:

	Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
	Route::post('password/reset', 'Auth\PasswordController@postReset');

Lalu tambahkan juga file `resources/views/auth/reset.blade.php`:

	<form method="POST" action="/password/reset">
	    {!! csrf_field() !!}
	    <input type="hidden" name="token" value="{{ $token }}">

	    <div>
	        <input type="email" name="email" value="{{ old('email') }}">
	    </div>

	    <div>
	        <input type="password" name="password">
	    </div>

	    <div>
	        <input type="password" name="password_confirmation">
	    </div>

	    <div>
	        <button type="submit">
	            Reset Password
	        </button>
	    </div>
	</form>

Selanjutnya buka link reset password di browser:

![](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/autentikasi/reset-password.png)

Tadaa, Anda sudah berhasil membangkitkan kembali fitur autentikasi yang hilang di Laravel 5.1.

## Catatan

Tolong jangan komplain kalau form autentikasi yang dihasilkan jelek, karena memang tidak ada CSS-nya. Silakan dipercantik sendiri. Bisa pakai [bootstrap](http://getbootstrap.com/), [foundation](http://foundation.zurb.com/), [uikit](http://getuikit.com/), [semantic-ui](http://semantic-ui.com/) dan belasan css framework diluar sana.
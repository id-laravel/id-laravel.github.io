---
layout: post
title: "Memodifikasi Default Login Laravel 5.1"
tags: [autentikasi, login, logout, 5.1]
---

> Artikel ini untuk Laravel 5.1 dan ada baiknya Anda membaca dulu artikel tentang [Autentikasi Default Laravel 5.1](/post/autentikasi-default-laravel-5-1/).

Jika Anda merasa fitur autentikasi bawaan Laravel tidak mencukupi kebutuhan dan berniat membuat autentikasi sendiri, sebaiknya baca dulu artikel ini sampai tuntas. Siapa tahu kebutuhan Anda sebenarnya bisa diakomodir, hanya saja belum tahu caranya.

## 1. Login Dengan Username
Default login Laravel menggunakan email dan password untuk mengidentifikasi akun. Namun kita bisa dengan mudah mengganti email menjadi username. Caranya seperti di bawah ini:

	// 1. tambahkan property $username ke AuthController
	class AuthController extends Controller
	{
	    protected $username = 'username'; // 'username' bisa diganti sesuai kebutuhan
	    ...
	
	// 2. ganti field email menjadi username di auth/login.blade.php
	// sebelum
	<input type="email" name="email" value="{{ old('email') }}">
	
	// sesudah
	<input type="username" name="username" value="{{ old('username') }}">

Sekali lagi, jika Anda belum pernah menggunakan autentikasi bawaan Laravel, baca kembali tutorial [Autentikasi Default Laravel 5.1](/post/autentikasi-default-laravel-5-1/).


## 2. Mengganti Redirect Setelah Registrasi
Defaultnya setelah berhasil registrasi akan diredirect ke `/home`. Untuk mengubah url redirect, tambahkan property $redirectPath ke AuthController dan isi sesuai kebutuhan:

	class AuthController extends Controller
	{
		$redirectPath = 'dashboard/profile';

## 3. Mengganti Redirect Setelah Login
Jika halaman yang dituju setelah login sama dengan halaman yang dituju setelah registrasi, maka kita tidak perlu melakukan apa-apa. Tapi jika berbeda, misalnya setelah login diredirect ke `dashboard/welcome`, maka kita harus tambahkan fungsi berikut ini ke AuthController:

	public function authenticated($request, $user)
	{
		// Fungsi ini akan dipanggil setelah user berhasil login.
		// Kita bisa menambahkan aksi-aksi lainnya, misalnya mencatat waktu last_login user.
		return redirect('dashboard/welcome');
	}


## 4. Menambahkan Pengecekan Status User
Seringkali tabel user memiliki kolom status yang isinya `active`, `blocked` atau `pending`. Lalu hanya user yang statusnya `active` yang boleh login. Login default Laravel tidak melakukan pengecekan seperti ini. Untuk itu kita harus memodifikasi lagi AuthController dengan menambahkan fungsi seperti ini:

	// Fungsi getCredentials ini aslinya ada di Illuminate\Foundation\Auth\AuthenticatesUsers.
	// Yang dilakukan disini adalah meng-override fungsi tersebut dan menambahkan kolom status dalam pengecekan.
	protected function getCredentials(Request $request)
	{
		// aslinya
		// return $request->only($this->loginUsername(), 'password');
	  
		// dimodifikasi jadi seperti ini
		return $request->only($this->loginUsername(), 'password') + ['status' => 'active'];
	}


## 5. Otomatis Logout Jika Browser Ditutup 
Buka file config/sessions.php, cari baris berikut dan ubah nilainya menjadi `true`:

    'expire_on_close' => false,
    
## Penutup
    
Sekian 5 modifikasi autentikasi bawaan Laravel versi On The Spot. Trik-trik seperti ini tidak ditemui dalam dokumentasi resmi di website [laravel.com](laravel.com). Hanya Tuhan, Taylor Otwell, dan Anda yang suka menelusuri source code yang tahu. *Keep reading !*
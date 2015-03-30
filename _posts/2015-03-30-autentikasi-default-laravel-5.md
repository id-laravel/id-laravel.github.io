---
layout: post
title: "Autentikasi Default Laravel 5"
tags: [autentikasi, login, logout, registrasi, reset password]
---

Satu hal yang hampir pasti kita jumpai ketika membuat sebuah website adalah proses autentikasi yang meliputi login, logout, registrasi, dan reset password. Fungsi-fungsi standard seperti itu biasanya cukup *straightforward* (tidak ribet) dan mudah diimplementasi. Tetapi harus membuat fungsi tersebut berulang-ulang setiap kali memulai suatu proyek jelas bukan pilihan yang bagus.

Programmer yang berpengalaman biasanya sudah mempunyai senjata berupa template aplikasi (*base application*) dengan fungsi-fungsi standard di dalamnya yang bisa digunakan kembali (*reuse*). Nah, bagi Anda yang belum memilikinya bisa memanfaatkan proses autentikasi bawaan Laravel yang memang sudah disediakan secara default. Kita tinggal memakai dan atau memodifikasinya sesuai keperluan. 

Mari kita coba bersama-sama.

## Konfigurasi Database dan Migration

Pastikan konfigurasi database Anda sudah benar karena Laravel akan menggunakannya untuk menyimpan data user. Untuk stuktur tabel, kita tidak perlu mendefinisikan sendiri karena Laravel sudah menyediakan `migration file` yang tinggal dipanggil.

Buka console/command prompt/terminal, masuk ke folder instalasi laravel dan ketikkan:

	php artisan migrate
	
Laravel akan menjalankan migrasi database, jika berhasil maka seharusnya Anda melihat pesan seperti ini:

	Migration table created successfully.
	Migrated: 2014_10_12_000000_create_users_table
	Migrated: 2014_10_12_100000_create_password_resets_table
	
Cek database Anda untuk mempelajari struktur tabel yang dihasilkan.

## Registrasi User

Setelah database dikonfigurasi dengan benar, Anda bisa mengakses url `<local-url>/auth/register` untuk mencoba form registrasi. Silakan bereksperimen menjadi user yang 'nakal' dengan memasukkan input yang salah. Anda akan melihat bahwa fitur bawaan ini sudah dilengkapi dengan validasi.

![Halaman registrasi Laravel](/images/halaman-registrasi-laravel.png)

![Halaman registrasi disertai validasi Laravel](/images/halaman-registrasi-dengan-validasi-laravel.png)

## Login dan Logout

Setelah berhasil melakukan registrasi, Anda bisa mencoba login dengan mengakses url `<local-url>/auth/login` atau dengan mengklik tombol login yang sudah disedikan di header web. Jika berhasil, Anda akan dibawa ke halaman home dan tombol login berubah menjadi logout.

![Halaman login Laravel](/images/halaman-login-laravel.png)

## Reset Password

Tidak perlu kuatir jika pengguna aplikasi Anda lupa dengan passwordnya sendiri karena Laravel juga sudah menyedikan fitur untuk menangani hal tersebut, dengan memanfaatkan email. 

Sama seperti cara kerja kebanyakan aplikasi web, user yang lupa password akan diminta untuk mengisikan alamat emailnya. Selanjutnya Laravel akan mengrimkan link untuk mengganti password melalui email tersebut.

![Halaman reset password Laravel](/images/halaman-reset-password-laravel.png)

Karena link reset password dikirim lewat email, maka pastikan konfigurasi *mail driver* Anda sudah benar (cek file `config/mail.php`). Untuk kasus ini, saya menggunakan layanan [https://mailtrap.io](https://mailtrap.io) sebagai SMTP server.

![Email reset password Laravel](/images/email-reset-password-laravel.png)

Buka link yang dikirim ke email, maka Anda akan menjumpai form untuk mengganti password seperti berikut ini:

![Halaman reset password Laravel](/images/halaman-reset-password-laravel-2.png)

## Pesan Sponsor

Kita sudah melihat bersama-sama bagaimana Laravel bisa mempercepat proses development web. Bahkan tanpa harus menulis satu baris kode pun, kita telah mempunyai fitur autentikasi yang berfungsi lengkap dan bisa dipakai di *production site*. Jadi bagaimana, semakin tertarik dengan Laravel? ;)
---
layout: post
title: Kolom Password Dalam Autentikasi, Bisakah Diganti?
tags: [autentikasi]
---


Secara *default*, Laravel 5 sudah menyediakan [*boilerplate* autentikasi](/post/autentikasi-default-laravel-5/) yang bisa langsung dipakai. Namun, Laravel berasumsi bahwa tabel yang digunakan untuk autentikasi adalah tabel `users` yang didalamnya terdapat dua buah kolom: `email` dan `password`. Dua field inilah yang dijadikan inputan ketika login ataupun registrasi.

## Jon Bertanya
Apakah kita bisa mengganti nama kolom yang digunakan, misalnya dari `password` menjadi `sandi`?

## Dodo Menjawab
Bisa Aja.

Kolom password digunakan baik ketika registrasi ataupun login. Oleh karena itu, kita harus memodifikasi *file-file* yang digunakan untuk masing-masing proses tersebut.


### Registrasi

#### Langkah 1. Ubah `View`

Buka file `resources/views/auth/register.blade.php`. Disitu terdapat dua buah tag `input`, yaitu untuk password dan password_confirmasion. Ubah atribut `name` masing-masing menjadi "sandi" dan "sandi_confirmation":

	...

	<div class="form-group">
		<label class="col-md-4 control-label">Password</label>
		<div class="col-md-6">
			<input type="password" class="form-control" name="sandi">
		</div>
	</div>

	<div class="form-group">
		<label class="col-md-4 control-label">Confirm Password</label>
		<div class="col-md-6">
			<input type="password" class="form-control" name="sandi_confirmation">
		</div>
	</div>

	...


#### Langkah 2. Ubah `Service Registrar`

Buka file `app/Services/Registrar.php`, disitu bisa kita dapati "password" tertulis di dua tempat. Ganti dua-duanya dengan "sandi".

	<?php namespace App\Services;
	
	use App\User;
	use Validator;
	use Illuminate\Contracts\Auth\Registrar as RegistrarContract;

	class Registrar implements RegistrarContract {
	
		/**
		 * Get a validator for an incoming registration request.
		 *
		 * @param  array  $data
		 * @return \Illuminate\Contracts\Validation\Validator
		 */
		public function validator(array $data)
		{
			return Validator::make($data, [
				'name' => 'required|max:255',
				'email' => 'required|email|max:255|unique:users',
				// 'password' => 'required|confirmed|min:6',
				'sandi' => 'required|confirmed|min:6',
			]);
		}
	
		/**
		 * Create a new user instance after a valid registration.
		 *
		 * @param  array  $data
		 * @return User
		 */
		public function create(array $data)
		{
	
			return User::create([
				'name' => $data['name'],
				'email' => $data['email'],
				// 'password' => bcrypt($data['password']),
				'sandi' => bcrypt($data['sandi']),
			]);
		}
	
	}

#### Langkah 3. Ubah Model `User`

Buka file `app/User.php`, lakukan perubahan di bagian `$fillable`, ganti "password" menjadi "sandi":

	protected $fillable = ['name', 'email', 'sandi'];
	

Selesai, Anda bisa mencoba kembali proses registrasi bawaan Laravel dan membuktikan sendiri apakah langkah-langkah di atas sudah benar. Cukup 3 langkah. Gampang kan?

### Login
	
#### Langkah 1. Ubah Model `User`

Buka kembali file `app/User.php`, tambahkan (atau lebih tepatnya override) fungsi `getAuthPassword`:

    public function getAuthPassword()
    {
        return $this->sandi; // default return $this->password;
    }

#### Langkah 2. Berdoa

Silakan berdoa, dilanjutkan dengan melakukan pengujian login menggunakan data hasil registrasi sebelumnya. Berhasilkah?
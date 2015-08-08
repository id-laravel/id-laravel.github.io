---
title: Middleware, Manfaat dan Penggunaannya
layout: post
tags: [laravel-5, basic]
---

Dalam melakukan pengembangan aplikasi berbasis web, seringkali kita berkeinginan untuk memfilter setiap _request_ yang masuk kedalam aplikasi kita. Hal ini dilakukan dengan tujuan untuk melakukan proses verifikasi terhadap setiap _request_ yang masuk seperti misalnya melakukan pengecekan status login, _privillage_, atau bahkan melakukan pengecekan token CSRF (Cross-Site Request Forgery) untuk memastikan bahwa _request_ yang masuk berasal dari komputer yang valid. Dengan menggunakan _framework_ Laravel, kita dapat mengimplementasikan mekanisme tersebut dengan bantuan fitur Middleware yang telah disediakan oleh laravel-5 (pada laravel-4 fitur ini disebut sebagai `filter` dengan konsep yang sedikit berbeda).

So, apa sih Middleware itu? sebenarnya dalam dunia IT istilah `middleware` biasa digunakan untuk menyebut sebuah perangkat lunak yang berperan sebagai "penengah" antara sebuah aplikasi dengan aplikasi lain untuk mempermudah proses integrasi antara aplikasi-aplikasi tersebut. Dalam konteks Laravel, Middleware merupakan sebuah _Class_ khusus yang berperan sebagai "penengah" antara _request_ yang masuk dengan _Controller_ yang dituju. Secara umum, prinsip kerja Middleware adalah mencegat _request_ yang masuk untuk kemudian diproses terlebih dahulu sebelum diberikan kepada _Controller_ yang dituju atau diarahkan ke _Controller_ yang lain. Dengan menggunakan fitur ini, kita dapat membuat komponen yang _reusable_ untuk melakukan pekerjaan-pekerjaan tersebut.

### Membuat Middleware Sederhana

Ok, sekarang bagaimana sih cara mengggunakananya? Secara _default_ Laravel telah menyediakan tiga buah Middleware dengan nama `Authenticate.php`, `RedirectIfAuthenticated.php` dan `VerifyCsrfToken.php` yang berlokasi di direktori `app/Http/Middleware`. Untuk dapat menambahkan Middleware baru kita cukup membuat kelas baru dengan format berikut ini:

    <?php

    namespace App\Http\Middleware;

    use Closure;

    class MyMiddleware
    {
        public function handle($request, Closure $next)
        {
            //letakkan kode kamu disini...
        }
    }

Seperti yang terlihat pada kode diatas, dalam setiap Middleware terdapat sebuah _method_ khusus yang bernama `handle()`. _Method_ tersebut memiliki dua buah parameter yaitu `Illuminate\Http\Request $request` dan `Closure $next`. _Method_ ini akan dipanggil secara otomatis oleh Laravel ketika kita meregistrasikan middleware tersebut. Lalu, kode seperti apakah yang harus kita letakkan di dalam _method_ `handle()` tersebut. Berikut ini adalah contoh bagaimana membuat mendefinisikan _method_ `handle()` yang digunnakan untuk memfilter setiap request agar alamat yang dituju hanya dapat diakses oleh _user_ dengan _role_ `admin`.

    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if($user->role === User::ROLE_ADMIN) {
            return $next($request);
        }

        return redirect('home');
    }

Contoh kode di atas merupakan kode sederhana yang melakukan pengecekan terhadap _role_ dari _user_ yang sedang login pada saat itu. Apabila _user_ yang sedang login memiliki _role_ `admin`, maka kita akan meneruskan _request_ yang masuk dan memberikannya kepada _Controller_ yang dituju (dengan memanggil _method_ `$next($request)`). Namun, apabila _user_ yang melakukan _request_ tidak memiliki _role_ sebagai `admin`maka kita akan me-_redirect user_ tersebut ke halaman `home`. Dengan cara ini kita dapat mem-filter setiap _request_ yang masuk dengan mudah.

### Before/After Middleware

Secara umum, Middleware pada laravel dapat digolongkan kedalam dua kelompok yaitu `After Middleware` dan `Before Middleware`. `After Middleware` merupakan Middleware yang diproses setelah _request_ masuk kedalam _Controller_, sedangkan `Before Middlware` merupakan Middleware yang diproses sebelum _request_ masuk kedalam _Controller_. Berikut ini adalah contoh mendefinisikan kedua buah Middlware tersebut.

    <?php

    namespace App\Http\Middleware;

    use Closure;

    class BeforeMiddleware
    {
        public function handle($request, Closure $next)
        {
            //lakukan sesuatu terhadap request yang masuk..

            return $next($request)
        }
    }

Contoh kode di atas merupakan contoh bagaimana mendefinisikan sebuah `Before Middleware` pada Laravel. Pada kode tersebut terlihat bahwa _request_ yang masuk akan diproses terlebih dahulu sebelum diteruskan ke _Controller_ yang dituju.

    <?php

    namespace App\Http\Middleware;

    use Closure;

    class AfterMiddleware
    {
        public function handle($request, Closure $next)
        {
            $response = $next($request);

            //lakukan sesuatu terhadap response yang diperoleh

            return $response
        }
    }

Berbeda dengan 'Before Middleware', pada `After Middleware` kita meneruskan _request_ yang masuk ke _Controller_ yang dituju terlebih dahulu hingga mendapatkan _response_ dari _Controller_ tersebut. Setelah mendapatkan _response_ yang dimaksud, kita akan memproses _response_ tersebut secara lebih lanjut di dalam method `handle()` dan setelah itu akan dikembalikan untuk kemudia di _render_ oleh _web browser_.

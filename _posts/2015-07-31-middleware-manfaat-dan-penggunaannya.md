---
title: Middleware, Manfaat dan Penggunaannya
layout: post
tags: [laravel-5, basic]
---

Dalam melakukan pengembangan aplikasi berbasis web, seringkali kita berkeinginan untuk memfilter setiap _request_ yang masuk kedalam aplikasi kita. Hal ini dilakukan dengan tujuan untuk melakukan proses verifikasi terhadap setiap _request_ yang masuk seperti misalnya melakukan pengecekan status login, _privillage_, atau bahkan melakukan pengecekan token CSRF (Cross-Site Request Forgery) untuk memastikan bahwa _request_ yang masuk berasal dari komputer yang valid. Dengan menggunakan _framework_ Laravel, kita dapat mengimplementasikan mekanisme tersebut dengan bantuan fitur Middleware yang telah disediakan oleh laravel-5 (pada laravel-4 fitur ini disebut sebagai `filter` dengan konsep yang sedikit berbeda).

So, apa sih Middleware itu? sebenarnya dalam dunia IT istilah `middleware` biasa digunakan untuk menyebut sebuah perangkat lunak yang berperan sebagai "penengah" antara sebuah aplikasi dengan aplikasi lain untuk mempermudah proses integrasi antara aplikasi-aplikasi tersebut. Dalam konteks Laravel, Middleware merupakan sebuah _Class_ khusus yang berperan sebagai "penengah" antara _request_ yang masuk dengan _Controller_ yang dituju. Secara umum, prinsip kerja Middleware adalah mencegat _request_ yang masuk untuk kemudian diproses terlebih dahulu sebelum diberikan kepada _Controller_ yang dituju atau diarahkan ke _Controller_ yang lain. Dengan menggunakan fitur ini, kita dapat membuat komponen yang _reusable_ untuk melakukan pekerjaan-pekerjaan tersebut.

## Cara Mendefinisikan Middleware

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

## Before/After Middleware

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

Berbeda dengan 'Before Middleware', pada `After Middleware` kita meneruskan _request_ yang masuk ke _Controller_ yang dituju terlebih dahulu hingga mendapatkan _response_ dari _Controller_ tersebut. Setelah mendapatkan _response_ yang dimaksud, kita akan memprosesnya lebih lanjut sebelum nantinya dikembalikan ke _web browser_ untuk kemudian di _render_.

## Meregistrasikan Middlware Secara Global

Setiap Middleware yang dibuat dapat diregistrasikan secara global sehingga Middleware terssebut akan selalu dipanggil setiap ada _request_ yang masuk. untuk dapat meregistrasikan Middleware yang dibuat secara global, kita dapat menambahkannya di dalam _file_ `app/Http/Kernel.php` seperti contoh di bawah ini:

    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,

        \App\Http\Middleware\MyGlobalMiddleware::class, //Middlware yang baru dibuat
    ];

## Meregistrasikan Middlware Pada Routes

Selain dapat didefinisikan secara global, komponen Middleware yang dibuat juga dapat diregistrasikan secara spesifik untuk digunakan pada `Routes` tertentu dengan cara menambahkan nama Middleware yang dibuat kedalam _file_ `app/Http/Kernel.php` seperti contoh dibawah ini:

    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'csrf' => \App\Http\Middleware\VerifyCsrfToken::class,
        'oauth' => \LucaDegasperi\OAuth2Server\Middleware\OAuthMiddleware::class,
        'oauth-owner' => \LucaDegasperi\OAuth2Server\Middleware\OAuthOwnerMiddleware::class,
        'my-middlware' => \App\Http\Middleware\MyGlobalMiddleware::class, //Middlware yang baru dibuat
    ];

Setelah meregistrasikan Middleware kita kedalam `$routeMiddleware` seperti contoh diatas, berikutnya adalah memberitahu Laravel `Routes` mana saja yang akan menggunakan Middleware tersebut dengan cara menambahkan _key_ `middlware` pada bagian _route options_ yang berada di _file_ `app/Http/routes.php` seperti contoh dibawah ini:

    Route::get('admin', [
        'uses' => 'AdminController@index',
        'middleware' => 'my-middleware'
    ]);

## Meregistrasikan Middleware Pada Controller

Selain dapat diregistrasikan secara global dan disematkan pada _Routes_, Middleware juga dapat diregistrasikan secara spesifik pada _Controller_. Dengan meregistrasikan Middleware yang dibuat kedalam Controller, Middleware tersebut akan berlaku untuk setiap method yang ada di dalam _Controller_ tersebut. Lalu, apa bedanya ketika kita mendefinisikan Middleware pada _Routes_ dengan mendefinisikannya pada _Controller_? Perbedaannya adalah, ketika kita mendefinisikan Middleware pada _Controller_, kita dapat memberikan opsi kepada Middleware tersebut agar hanya dieksekusi pada _method_ tertentu saja ataupun meng-_exclude_ beberapa _method_ yang tidak ingin disematkan Middleware. Berikut ini adalah contoh bagaimana mendefinisikan Middleware pada Controller:

    class MyController extends Controller
    {
        function __construct()
        {
            $this->middleware('my-middleware');
            $this->middleware('log-middleware', ['only' => ['foo', 'bar']]); //selected method
            $this->middleware('subscribe-middleware', ['except' => ['baz']]) ; //exclude method
        }
    }  

## Lebih Lanjut Tentang Middleware

Penjelasan diatas hanya mencakup dasar-dasar dan penggunaan secara umum dari Middlware Laravel-5. Untuk penjelasan lebih lanjut terkait dengan Middleware seperti misalnya pemanfaatan _method_ `terminate()` dan penggunaan parameter pada Middleware, saya merekomendasikan rekan-rekan sekalian untuk langsung membaca dokumentasi tentang Middleware [disini](http://laravel.com/docs/5.1/middleware). Sekian yang bisa saya sampaikan pada kesempatan kali ini semoga artikel ini dapat bermanfaat untuk rekan-rekan sekalian. Selamat belajar dan bereksperimen :).

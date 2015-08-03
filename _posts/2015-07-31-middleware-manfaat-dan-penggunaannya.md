---
title: Middleware: Manfaat dan Penggunaannya
layout: post
tags: [laravel-5, basic]
---

Dalam melakukan pengembangan aplikasi berbasis web, seringkali kita berkeinginan untuk memfilter setiap _request_ yang masuk kedalam aplikasi kita. Hal ini dilakukan dengan tujuan untuk melakukan proses verifikasi terhadap setiap _request_ yang masuk seperti misalnya melakukan pengecekan status login, _privillage_, atau bahkan melakukan pengecekan token CSRF (Cross-Site Request Forgery) untuk memastikan bahwa _request_ yang masuk berasal dari komputer yang valid. Dengan menggunakan _framework_ laravel, kita dapat mengimplementasikan mekanisme tersebut dengan bantuan fitur Middleware yang telah disediakan oleh laravel-5 (pada laravel-4 fitur ini disebut sebagai `filter`).

So, apa sih Middleware itu? sebenarnya dalam dunia IT istilah `middleware` biasa digunakan untuk menyebut sebuah perangkat lunak yang berperan sebagai "penengah" antara sebuah aplikasi dengan aplikasi lain untuk mempermudah proses integrasi antara aplikasi-aplikasi tersebut. Dalam konteks Laravel, Middleware merupakan sebuah _Class_ khusus yang berperan sebagai "penengah" antara _request_ yang masuk dengan _Controller_ yang dituju. Secara umum, prinsip kerja Middleware adalah mencegat _request_ yang masuk untuk kemudian diproses terlebih dahulu sebelum diberikan kepada _Controller_ yang dituju atau diarahkan ke _Controller_ yang lain. Dengan menggunakan fitur ini, kita dapat membuat komponen yang _reusable_ untuk melakukan pekerjaan-pekerjaan tersebut.

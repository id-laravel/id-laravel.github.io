---
layout: post
title: "Package Pilihan Minggu #2: Manipulasi File"
tags: [package]
---

> Kali ini kita akan menampilkan package yang harus dimiliki untuk mempermudah melakukan manipulasi file: membaca/menulis file excel, membuat file pdf, membuat file zip, hingga manipulasi gambar.

## Laravel Excel
Baca tulis file excel (spreadsheet) tidak pernah semudah ini karena [Laravel Excel](https://github.com/Maatwebsite/Laravel-Excel) menyediakan API untuk export/import spreadsheet khas Laravel: elegan dan mudah dipahami. Saat ini file yang didukung adalah xls, xlsx, dan csv.

Link: [http://www.maatwebsite.nl/laravel-excel/docs](http://www.maatwebsite.nl/laravel-excel/docs)

## Laravel DOMPDF

DOMPDF adalah library PHP untuk menghasilkan file PDF dari format HTML. Jika kamu tidak memerlukan file dengan presisi tingkat tinggi dari sisi layout, maka DOMPDF bisa menjadi jalan pintas untuk menghasilkan file PDF tanpa perlu mengatur posisi x dan y secara manual. Nah, Laravel DOMPDF adalah wrapper (pembungkus) untuk library tersebut agar bisa langsung diintegrasikan dengan Laravel.

[https://github.com/barryvdh/laravel-dompdf](https://github.com/barryvdh/laravel-dompdf)

## Intervention Image

Package yang satu ini merupakan favorit para developer untuk memanipulasi gambar. Mau bikin thumbnail, cropping image, menambahkan watermark, hingga menambahkan beberapa filter ala instagram bisa dilakukan dengan mudah. Lebih indahnya lagi, package ini telah mendukung integrasi dengan Laravel secara default. Super sekali...

[http://image.intervention.io/](http://image.intervention.io/)

## Zipper
Ini adalah wrapper untuk ZipArchive dengan beberapa penambahan fungsi yang sangat bermanfaat. Kamu bisa membuat file archive dalam format zip ataupun sebaliknya, mengekstrak ~~kulit manggis~~ file zip.

[https://github.com/Chumper/Zipper](https://github.com/Chumper/Zipper)

> Ada yang belum disebutkan? Membaca atau menulis file word? Membuat barcode? Tuliskan di kolom komentar ya ;)

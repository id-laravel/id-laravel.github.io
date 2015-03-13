---
layout: post
title: Menangani Error 404
tags: [error]
---

    // file app/routes.php:
    App::error(function($exception, $code)
    {
        return 'error ' . $code ;
    });

    // Jika ingin men-trigger HTTP error secara manual, panggil kode di bawah dari manapun
    App::abort(404); // berlaku juga untuk error HTTP yang lain, misalnya 403, 500

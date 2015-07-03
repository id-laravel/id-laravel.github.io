---
title: Mengenal Struktur Direktori Laravel 5
layout: post
tags: [laravel-5][basic]
---

Pada kesempatan kali ini saya akan membahas tentang struktur direktori pada laravel 5. Mengapa hal ini ingin saya bahas? Menurut saya laravel 5 memiliki susunan direktori yang berbeda dari framework-framework PHP lainnya. Secara garis besar, kebanyakan framework PHP yang menganut pola MVC (Model-View-Controller) menggunakan skema direktori dengan nama Model, View dan Controller dimana direktori "Model" digunakan untuk menyimpan class PHP yang berhubugan dengan model database, kemudian direktori "Controller" digunakan untuk menyimpan class PHP yang berhubungan dengan application logic dan direktori "View" digunakan untuk menyimpan file-file yang berhubungan tampilan aplikasi. Konvensi struktur direktori tersebut juga digunakan oleh laravel versi 5 walaupun dengan struktur yang sedikit berbeda (dan membingungkan bagi pemula).

Oke, Berikut ini adalah struktur direktori dari laravel 5:

	|-- app
	|   |-- Console
	|   |   `-- Commands
	|   |-- Events
	|   |-- Exceptions
	|   |-- Helpers
	|   |-- Http
	|   |   |-- Controllers
	|   |   |-- Middleware
	|   |   `-- Requests
	|   |-- Jobs
	|   |-- Listeners
	|   `-- Providers
	|-- bootstrap
	|   `-- cache
	|-- config
	|-- database
	|   |-- factories
	|   |-- migrations
	|   |-- seeds
	|   `-- sql

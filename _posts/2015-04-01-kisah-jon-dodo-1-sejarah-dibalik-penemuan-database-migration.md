---
layout: post
title: "Kisah Jon Dodo 1: Sejarah Dibalik Penemuan Database Migration"
tags: [database, migration]
---

> Ini adalah kisah fiktif belaka. Kesamaan nama dan tempat hanya kebetulan semata.


## Prolog

Dahulu kala, di sudut kota antah berantah di sebuah negeri kepulauan yang tidak cukup genah, hiduplah dua orang sahabat karib yang cukup nyentrik. Orang pertama, Jon, adalah seorang sarjana pertanian lulusan universitas ternama di negeri tersebut. Orang kedua, Dodo, adalah jebolan sekolah tinggi akuntansi yang terakreditasi C.

Yang membuat nyentrik sepasang sahabat karib tersebut adalah, saat ini keduanya **berprofesi sebagai programmer**, sebuah profesi yang sama sekali tidak ada hubungannya dengan jurusan yang mereka ambil semasa kuliah. Ah, mungkin saya terlalu berlebihan dengan istilah nyentrik. Mungkin lebih enak disebut *'cross platform'*.

Suatu ketika mereka berdua terlibat dalam proyek yang sama, proyek besar pembuatan sistem informasi akademik terintegrasi untuk sebuah kampus yang belum lama berdiri. Karena ini proyek besar, maka proses pengembangannya pun dibagi dalam beberapa tahap. Total waktu yang dicanangkan adalah 24 bulan yang dibagi dalam 6 tahapan. Untuk setiap tahap akan ada satu modul besar yang dirilis dan siap dipakai.

Waktu pun berjalan, duo programmer bersama-sama dengan *project manager* dan analis bekerja sebagaimana mestinya. Requirement (mengidentifikasi kebutuhan user) dilakukan secara bertahap untuk setiap tahapan. Jadi tidak serta merta semua kebutuhan fungsional tergambar jelas di awal, melainkan hanya untuk modul yang akan dikerjakan berikutnya saja. 

Karena setiap modul saling terkait, maka ketika mengerjakan modul berikutnya otomatis akan berimbas juga dengan modul yg sudah selesai dikerjakan sebelumnya. Kode harus disesuaikan disana sini. Pun demikian dengan database, tambah tabel, tambah kolom, ubah tipe data, hingga penambahan index harus dilakukan agar aplikasi yang dibangun bisa memenuhi kebutuhan fungsional yang diinginkan.

Nah, bagaimana Jon dan Dodo meng-handle perubahan *database* inilah yang menarik, karena selain di *localhost* masing-masing komputer, ada juga server *production* (yang sudah live, digunakan banyak orang dan berisi data hasil inputan *user*) yang tentu saja juga harus di-*update* sesuai perubahan yang terjadi.

## Sinkronisasi Primitif

Dalam prakteknya, Jon dan Dodo selalu berbagi tugas secara adil. Jika Jon mengerjakan fungsi A, maka Dodo mengerjakan fungsi A` yang tingkat kesulitannya sama. Jika terkait fungsi yang dikerjakannya Jon harus melakukan menambah kolom, dia tinggal 'teriak' saja ke Dodo: "Hei Do, gua nambah kolom **role** ni di tabel **user**. Tipenya abebebeh...". Begitu juga sebaliknya, jika Dodo perlu menambah kolom atau tabel tinggal 'teriak' balik ke Jon. Begitulah model sinkronisasi paling primitif yang mereka temukan: **via teriakan**. Seiring perkembangan jaman, ada banyak variasi lain yang ditemukan: via sms, via chatting, atau via email. 

4 bulan berselang, tiba saatnya Jon dan Dodo harus mengupdate aplikasi di server *production*. *Source code* terbaru diupload di server, tinggal timpa, beres. Ketika dicoba, muncul error:

	Column not found: 1054 Unknown column 'role' in 'field list' on object 'User'

Aaah, mereka lupa meng-*update* *database*. Kolom role belum ditambahkan. Eh, bukan hanya itu perubahannya. Sepanjang 4 bulan ini ada cukup banyak perubahan database yang dilakukan, dan **mereka berdua tidak ingat apa saja perubahannya**.

Sejenak mereka berdua berpandangan, sejurus kemudian masing-masing sibuk dengan laptop dan *hape* masing-masing. Mencoba mencari-cari riwayat email, chatting, dan sms sambil mengingat-ingat teriakan yang sudah mereka ucapkan selama 4 bulan terakhir. Dua jam berlalu, terkumpullah belasan catatan terkait database. Satu persatu catatan tersebut diaplikasikan di server *production*. Takut masih ada yang terlewat, mereka akhirnya membuka phpmyadmin dan membandingkan struktur setiap tabel antara yang ada di *localhost* dengan *production*.

Ayam jantan sudah berkokok ketika mereka berdua akhirnya yakin tidak ada perubahan yang terlewat.

## Sinkronisasi Terpusat

Memasuki fase berikutnya, Jon dan Dodo tidak mau mengulangi kesalahan yang sama. Setelah berunding cukup lama, mereka sepakat untuk mencatat setiap perubahan yang terjadi terkait struktur database ke dalam sebuah file `changelog.sql`.

Jika Dodo menambah kolom `role` di tabel `user`, maka Dodo harus mencatatnya di file tersebut. Bukan dalam bentuk *human-friendly* seperti 'tambah kolom role di tabel user', melainkan query dalam format sql: `alter table user add column role enum('admin', 'dosen', 'mahasiswa')`. Harapannya, semua pihak yang perlu update database tinggal *copy-paste query* tersebut di server masing-masing.

Kira-kira seperti inilah penampakan 'catatan harian' sql yang ditulis duo programmer tersebut:

![image](/images/changelog-sql.png)

Di akhir bulan keempat berikutnya, tibalah saatnya untuk update aplikasi ke server *production*. Kali ini mereka berdua dengen percaya diri menyerahkan 'catatan harian' sql mereka ke admin server untuk dijalankan. Beres, kali ini mereka berdua bisa pulang bahkan sebelum matahari terbenam.

### Manusia Tempatnya Lupa

Sudah 2 dari 6 tahapan berhasil dikerjakan. Di tahap berikutnya, mereka koding seperti biasanya, ditambah dengan aktivitas rutin menulis 'catatan harian' di `changelog.sql` jika ada perubahan database. Hingga waktunya tiba, untuk yang kesekian kalinya, mereka harus meng-*update* aplikasi di server *production*. 

Kesuksesan *deployment* di tahapan berikutnya menjadikan Jon dan Dodo semakin percaya diri. Setelah meng-upload kode, mereka menyerahkan kembali 'catatan harian' sql, yang panjangnya sudah 2 kali lipat sejak terakhir kali mereka kesini, untuk dijalankan di server, ketika tiba-tiba mereka teringat (atau lebih tepatnya melupakan) sesuatu: **query-nya harus dijalankan dari mulai line berapa ya**? Menjalankan semua `query` dari awal jelas akan menimbulkan banyak *error*, misalnya terkait `Duplicate column name`.

Ayam jantan sudah berkokok ketika mereka berdua akhirnya bisa menyelesaikan persoalan tersebut. 

## Sinkronisasi Otomatis

Belajar dari kesalahan sebelumnya, sekarang Jon dan Dodo sepakat untuk membuat satu  'catatan harian' baru setiap harinya dan diberi nama sesuai tanggal hari tersebut. Jadilah ada file `changelog-01012015.sql` (untuk tanggal 1 Januari 2015), `changelog-02012015.sql` (tanggal 2 Januari 2015) dan seterusnya. Jika nanti tiba saatnya untuk meng-update aplikasi ke server, mereka tinggal mencari file-file dengan nama tanggal setelah tanggal update terakhir. Sekarang mereka hanya perlu mengingat satu buah tanggal, yaitu tanggal *deployment* ke server yang terakhir kalinya. Jika terakhir kali update ke server dilakukan tanggal 24 Desember 2014, maka di update berikutnya mereka tinggal mencari file `changelog-2512204.sql`, `changelog-2612204.sql` dan seterusnya.

## Epilog

Mega Proyek ini akhirnya berjalan dengan baik tanpa kendala yang berarti. Jon dan Dodo tidak lagi bermasalah dengan perubahan database. Klien senang, admin server senang, tim pengembang senang. Di proyek-proyek selanjutnya, mereka selalu menerapkan cara ini selama proses pengembangan aplikasi. Mereka menyebutnya dengan metode "A Lazy Programmer Diary".

Kisah perjuangan Jon dan Dodo menemukan metode pencatatan perubahan struktur database ini kemudian menjadi inspirasi beberapa *framework* PHP untuk membuat sebuah fitur yang kemudian terkenal dengan nama ***Database Migration***.

[Bersambung ke bagian 2](/post/kisah-jon-dodo-2-database-migration-laravel)
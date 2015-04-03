---
layout: post
title: "Kisah Jon Dodo 2: Database Migration di Laravel"
tags: [database, migration]
---

> Jika Anda tertarik dengan kisah fiktif dibalik penemuan *database migration*, jangan lewatkan bagian pertama dari artikel ini: [Kisah Jon Dodo 1: Sejarah Dibalik Penemuan Database Migration](/post/kisah-jon-dodo-1-sejarah-dibalik-penemuan-database-migration/) 

Jika Anda pernah memakai tools versioning seperti git atau SVN, maka konsep yang dibawa oleh *database migration* sejatinya sama, yaitu untuk mendokumentasikan setiap perubahan yang terjadi terhadap skema *database*. Dari dokumentasi tersebut kita bisa mengulang langkah-langkah perubahan dari awal hingga akhir ataupun membatalkan perubahan ke beberapa langkah sebelumnya. Jika ada programmer yang bergabung di tengah jalan, dia tinggal 'menjalankan' dokumentasi tersebut untuk mendapatkan skema database yang sama dengan programmer lainnya. Tidak perlu lagi melakukan *dump database* atau menjalankan *script* 'catatan harian' sql secara manual.

Jika Anda sudah membaca [kisah fiktif dibalik *database migration*](/post/kisah-jon-dodo-1-sejarah-dibalik-penemuan-database-migration/), maka fungsi *database migration* sama dengan "sinkronisasi terorganisir" yang ditemukan oleh Jon dan Dodo. Bedanya, *database migration* lebih canggih, lebih otomatis, dan sudah menyedikan banyak "perintah" yang bisa dipakai untuk mempermudah proses sinkronisasi *database*.

Ok, untuk lebih jelasnya mari kita ikuti kelanjutan kisah Jon Dodo di bawah ini.

## Konfrontasi

Petualangan Jon Dodo berlanjut terus. Belasan proyek pembuatan website mereka kerjakan dengan sangat baik. Rekan-rekan sejawatnya silih berganti memuji metode yang mereka gunakan untuk mencatat perubahan *database*. Sampai suatu ketika mereka tergabung dalam sebuah tim dengan Taylor Otwell, programmer asal negeri Paman Sam yang pindah warga negara setelah menikah dengan gadis asal Tegal.

Seperti biasa, di awal proyek tim programmer melakukan inisiasi dan standardisasi yang akan dipakai selama proses pengerjaan. Bahasa pemrograman, framework, standard penulisan kode, struktur aplikasi, *versioning*, dan tentu saja tentang pencatatan perubahan *database*. Jon dan Dodo menjelaskan panjang lebar tentang metode "sinkronisasi terorganisir" yang biasa mereka pakai. Di akhir penjelasan, Taylor mengangguk-angguk dan berkata, "Kenapa kita tidak pakai fitur *migration* bawaan Laravel?".

Dua jam berikutnya dilalui dengan perdebatan panjang tentang pendirian masing-masing. Jon dan Dodo bersikukuh metode mereka sudah teruji sukses diaplikasikan di banyak proyek, jadi kenapa harus pakai metode lain. Sementara Taylor beranggapan metode yang dipakai Jon Dodo, meskipun fungsinya sama, tetapi masih primitif dan banyak hal yang harus dilakukan secara manual. Jon Dodo beranggapan fitur *migration* Laravel hanya membuang-buang waktu karena harus mempelajari sintaks baru padahal fungsinya sama saja dengan metode yang biasa mereka pakai. Taylor juga tidak kalah ngotot, mengubah database lewat phpmyadmin kemudian harus mencatat *query* yang dijalankan ke sebuah file dianggap membuang-buang waktu.

## "Pertempuran" Darat

Istirahat makan siang sedikit mencairkan suasana. Perdebatan sejenak berhenti. Masing-masing menikmati hidangan yang telah disajikan. *Project Manager* terlihat tersenyum. Secercah ide sudah muncul di kepala. 

"Mari kita bandingkan masing-masing metode... dengan sebuah contoh kasus", suara lantang Si PM mengagetkan semua orang. Jon menelan bulat-bulat suap terakhir makanannya, meski belum tuntas dikunyah.

Dan dibawah ini adalah gambaran apa yang terjadi dalam beberapa jam berikutnya. Anda bisa mencoba sendiri masing-masing metode dan menyimpulkan mana yang lebih baik.

### Kasus 1. Buat tabel baru `product`

#### Jon Dodo

1. Buka phpmyadmin, buat tabelnya
2. Copy-paste query yang dihasilkan ke `changelog-13242014.sql`:

		CREATE TABLE `products` (
		  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
		  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
		  `price` int(11) NOT NULL,
		  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
		  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
		  PRIMARY KEY (`id`)
		);

#### Taylor Otwell

1. Dari terminal/command prompt/console, masuk ke direktori laravel, jalankan perintah:

		php artisan make:migration create_table_products --create=products

2. Buka file `database/migrations/xxxx_create_table_products.php` yang sudah di-*generate*, edit seperti ini:

		public function up()
		{
			Schema::create('products', function(Blueprint $table)
			{
				$table->increments('id');
				$table->string('name');
				$table->index('price');
				$table->timestamps();
			});
		}
	
		public function down()
		{
			Schema::drop('products');
		}

3. Jalankan perintah `php artisan migrate`. Cek database Anda.	
	
### Kasus 2. Modifikasi tabel `product`, tambahkan kolom `discount`

#### Jon Dodo

1. Buka phpmyadmin, edit tabel `product`
2. Copy paste query yang dihasilkan ke `changelog-13092015.sql`

#### Taylor Otwell

1. Jalankan perintah:

		php artisan make:migration add_discount_to_product --table=products

2. Buka file `database/migrations/xxxx_add_discount_to_product.php` yang di-*generate*, edit seperti ini:

		public function up()
		{
			Schema::table('products', function(Blueprint $table)
			{
				$table->smallInteger('discount');
			});
		}
	
		public function down()
		{
			Schema::table('products', function(Blueprint $table)
			{
				$table->dropColumn('discount');
			});
		}


3. Jalankan perintah `php artisan migrate`. Cek database Anda.

### Kasus 3. Aplikasi naik ke *production* untuk pertama kali

#### Jon Dodo

1. Buka file changelog-13092015.sql, jalankan query-nya di server
2. Buka file changelog-14092015.sql, jalankan query-nya di server
3. Buka file changelog-15092015.sql, jalankan query-nya di server
4. Dan seterusnya sesuai file changelog yang ada

#### Taylor Otwell

1. Jalankan perintah `php artisan migrate` di server, otomatis semua perubahan database akan diaplikasikan

### Kasus 4. Update aplikasi di *production* 

#### Jon Dodo

1. Cek tanggal terakhir kali aplikasi naik *production*
2. Cari semua file changelog-xxxxxxx.sql setelah tanggal tersebut
3. Jalan query-nya satu persatu

#### Taylor Otwell

1. Jalankan perintah `php artisan migrate`

### Kasus 5. Rollback

Fitur baru ternyata bermasalah, aplikasi dan database harus dikembalikan ke versi sebelumnya.

#### Jon Dodo

1. Mengecek perubahan terakhir, balikkan (rollback) secara manual. Misalnya, kika ada query untuk `create table`, maka tabel tersebut harus di *delete* secara manual.

#### Taylor Otwell

1. Jalankan perintah `php artisan migrate:rollback`

### Kasus 6. Tim Baru

Di tengah proyek ada programmer baru yang bergabung, dan harus meng-*install* aplikasi di komputernya.

#### Jon Dodo

Minta programmer tersebut melakukan:

1. Buka file changelog-13092015.sql, jalankan query-nya
2. Buka file changelog-14092015.sql, jalankan query-nya
3. Buka file changelog-15092015.sql, jalankan query-nya
4. Dan seterusnya...

#### Taylor Otwell

1. Minta programmer tersebut menjalankan perintah `php artisan migrate:refresh`

### Kasus 7. Ganti database dari MySQL ke PostgreSQL

#### Jon Dodo

1. Serius lu? (Jon Dodo harus mengubah **semua *query*** dari sintaks MySQL ke PostgreSQL)

#### Taylor Otwell
 
1. Ganti konfigurasi database, tidak perlu mengubah kode *migration*, dan tinggal jalankan perintah `php artisan migrate`


## Serah Terima Kekuasaan

Jon dan Dodo kalah telak. Setelah dibandingkan lewat 7 macam kasus, *migration* bawaan Laravel jauh lebih lengkap dan efektif. Di awal-awal memang terlihat lebih ribet karena harus harus mendefinisikan skema *database* dalam bentuk kode php, biasa disebut dengan `Schema Builder`. Tapi selanjutnya sangat memudahkan, terutama dalam proses *deployment* aplikasi. Dimanapun aplikasi hendak di-install, tinggal jalankan perintah `php artisan migrate` dan database siap digunakan. Tidak ada tanggal yang harus diingat, semua pencatatan dilakukan secara otomatis oleh Laravel.

...

Dalam perjalanan pulang, Jon berkata ke Dodo, "Laravel ga banget ya, nyontek ide kita tentang metode perubahan *database*.". 

"Iya sih, tapi mereka mengeksekusinya dengan lebih baik, memanjakan penggunanya", balas Dodo.

Jon masih tetap Jon, begitu pula Dodo. Duo programmer nyentrik dengan ego level dewa yang tidak mudah diubah pendiriannya. Tapi kali ini Laravel berhasil meyakinkan mereka.

> Dokumentasi lengkap tentang migration bisa dilihat di [http://laravel.com/docs/master/migrations](http://laravel.com/docs/master/migrations).
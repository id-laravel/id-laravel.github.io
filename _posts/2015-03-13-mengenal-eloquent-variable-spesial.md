---
layout: post
title: "Mengenal Eloquent: Variable-Variable Spesial"
---

Untuk pembahasan kali ini, kita akan menggunakan contoh data dan struktur model pada [artikel sebelumnya tentang pembagian wilayah di Indonesia](http://id-laravel.com/post/mengenal-eloquent-kekuatan-super-with).

## [#](#hidden) $hidden

Variable `$hidden` digunakan untuk menyembunyikan atribut model (kolom tabel) ketika kita memanggil fungsi `toArray()` atau `toJson()`.

Kode:

	Route::get('hidden', function(){
	
	    $sragen = \App\Kabupaten::where('nama', 'like', '%Sragen%')->first();
	
	    return $sragen->toArray();
	});

Output:

	{"id":"3314","provinsi_id":"33","nama":"Kab. Sragen"}
	
Tambahkan kode berikut di model `Kabupaten`:

    protected $hidden = ['id'];
    
Maka output yang dihasilkan:

	{"provinsi_id":"33","nama":"Kab. Sragen"}
	

## [#](#visible) $visible

Selanjutnya edit kembali model `Kabupaten`:

    protected $hidden = ['id'];
    protected $visible = ['nama'];
    
Output:

	{"nama":"Kab. Sragen"}    

Jika `$visible` kita set isinya, maka `Eloquent` hanya akan menampilkan atribut yang tercantum didalam variable tersebut dan **akan mengabaikan `$hidden`** (apapun isinya). Jadi cukup salah satu saja yang kita isi. **Yang perlu diingat**, `$visible` lebih tinggi prioritasnya dibanding `$hidden`. 

Kalau begitu mana yang dipakai? Tergantung kebutuhan. Misal jika Kita punya model User lalu kebutuhannya adalah password tidak boleh ditampilkan sedangkan atribut yang lain boleh, maka lebih cepat mengisi `$hidden = ['password']`. Jika suatu ketika ada penambahan kolom, maka kolom tersebut akan otomatis muncul sebagai atribut User.


## [#](#appends) $appends

Secara default, toArray() dan toJson() hanya akan menampilkan data sesuai struktur tabel model yang bersangkutan. Pada contoh sebelumnya, tabel kabupaten terdiri dari 3 kolom: id, provinsi_id, nama. Maka output jsonnya pun hanya menampilkan 3 atribut tersebut.

Nah, ada kalanya kita juga ingin menampilkan data yang berasal dari perhitungan dinamis atau disebut atribut virtual, yaitu atribut yang tidak berkorelasi dengan kolom di database. Sebagai contoh, untuk model Kabupaten kita ingin menampilkan atribute `nama_provinsi` padahal tidak ada kolom `nama_provinsi` di tabel `kabupaten`. Maka yang perlu dilakukan adalah mengubah model Kabupaten menjadi seperti berikut:


    protected $visible = ['nama', 'nama_provinsi'];

    protected $appends = ['nama_provinsi'];

    // accessor
    public function getNamaProvinsiAttribute()
    {
        return $this->provinsi->nama;
    }

Ketika menambahkan atribut ke $appends, maka kita juga harus menambahkan accessor yang bersesuaian. Penjelasan tentang accessor bisa dilihat langsung di [dokumentasi laravel tentang accessor](http://laravel.com/docs/5.0/eloquent#accessors-and-mutators).

**Yang perlu diperhatikan**, karena kita menggunakan `$visible`, maka apa yang kita tambahkan di `$appends` harus ditambahkan juga ke `$visible` agar atribut tersebut dimunculkan. Sedangkan jika kita memakai `$hidden`, maka apa yang kita tambahkan ke `$appends` akan otomatis dimunculkan sebagai atribut tanpa perlu menuliskannya lagi di `$hidden`.

## [#](#timestamps) $timestamps
Secara default, Eloquent akan beranggapan bahwa semua tabel yang kita buat selalu memiliki dua buah kolom: `created_at` untuk mencatat kapan suatu record ditambahkan ke database dan `updated_at` untuk mencatat kapan suatu record terakhir diperbarui datanya. Jika merasa tidak membutuhkannya, maka kita bisa menonaktifkan fitur ini dengan mengubah variable `$timestamps` menjadi `false`.

	// Model Kabupaten (file Kabupaten.php)
    public $timestamps = false;

## [#](#fillable) $fillable

Variable `$fillable` berguna untuk mendaftarkan atribut (nama kolom) yang bisa kita isi ketika melakukan insert atau update ke database. Kita tahu bahwa untuk menambahkan record baru ke database, bisa dilakukan dengan melakukan `mass assignment` seperti ini:

	// anggap saja ini hasil inputan dari user
	$input = ['nama' => 'Kabupaten Sragentina', 'provinsi_id' => 33];
	
	// simpan ke database
    \App\Kabupaten::create($input);

Tapi ada catatannya, yaitu kita harus mendaftarkan nama kolom yang akan diisi ke `$fillable`:

    protected $fillable = ['nama', 'provinsi_id'];
        
Jika kita lupa mengisi `$fillable`, maka `Eloquent` akan secara otomatis mengabaikan atribut yang bersangkutan. Contoh, jika kita ubah `$fillable` menjadi seperti ini:

    protected $fillable = ['nama'];
    
Lalu menjalankan kembali kode untuk insert:

	// anggap saja ini hasil inputan dari user
	$input = ['nama' => 'Kabupaten Sragentina Asri', 'provinsi_id' => 33];
	
	// simpan ke database
    \App\Kabupaten::create($input);
   
Maka `Eloquent` hanya akan menyimpan `nama` kabupaten, sedangkan `provinsi_id` akan diabaikan dan tidak tersimpan ke database.   

## [#](#guarded) $guarded
Kebalikan dari `$fillable` adalah `$guarded`. Semua kolom yang kita tambahkan ke `$guarded` akan diabaikan oleh Eloquent ketika kita melakukan insert/update. Secara default `$guarded` isinya `array("*")`, yang berarti semua atribut tidak bisa diset melalui `mass assignment`. Itulah sebabnya, jika kita tidak mengubah baik $fillable ataupun $guarded, ketika melakukan mass assignment akan ditampilkan exception:

	MassAssignmentException in Model.php line 421:
	nama

$fillable memiliki prioritas yang lebih tinggi dibanding $guarded, jadi kita tetap bisa mengisi nama kabupaten dan provinsi_id meskipun model Kabupaten kita set seperti ini:

    protected $guarded = ['nama'];

	// Jika ada kolom yang sama, $fillable akan mengoverride $guarded, dalam kasus ini berarti 'nama' akan tetap disimpan ke database
    protected $fillable = ['nama', 'provinsi_id'];

## [#](#dates) $dates
Manipulasi tanggal dengan PHP menjadi pekerjaan yang tidak begitu menyenangkan. Tetapi semua itu berubah sejak adanya library [Carbon](https://github.com/briannesbitt/Carbon). Carbon menyediakan API untuk memanipulasi tanggal dan waktu secara lebih OOP dan *developer friendly*.

Secara default, `Eloquent` akan mengubah kolom timestamps (created_at dan updated_at) menjadi obyek `Carbon`. Oleh karenanya, kita bisa melakukan hal-hal seperti ini:

	$user->created_at->diffForHumans() // output: 1 years ago
	$user->created_at->diffInDays() // output: 365	

Jika ada atribut lain yang ingin kita daftarkan sebagai obyek `Carbon`, maka harus kita tambahkan ke `$dates`:

    protected $dates = ['tanggal_berdiri'];
    	
Maka kita bisa mengeksekusi kode berikut:

    $sragen = \App\Kabupaten::where('nama', 'like', '%Sragen%')->first();
	return $sragen->tanggal_berdiri->diffForHumans()    

Output:

	286 years ago


> Untuk mencobanya sendiri, silakan tambahkan kolom tanggal_berdiri (tipe date) di tabel kabupaten dan isi dengan data sembarang.

## [#](#casts) $casts

Kita biasa menyimpan tipe data boolean sebagai tinyint di database. Sebagai contoh, kita bisa menambahkan kolom has_adipura ke tabel kabupaten untuk menandai apakah suatu kabupaten/kota pernah meraih penghargaan adipura. Tanpa mengeset $casts, maka hasil jsonnya adalah seperti ini:

	{"nama":"Kab. Sragen","has_adipura":"0","nama_provinsi":"Jawa Tengah"}

Kita berharap has_adipura memiliki tipe data boolean, tapi Eloquent menampilkannya sebagai string "0" atau "1". Pemrosesan di PHP tidak akan menimbulkan masalah karena akan dikonversi secara benar: "0" menjadi false dan "1" menjadi true. Masalah terjadi jika kita melakukan pemrosesan di Javascript, karena baik "0" dan "1" sama-sama dianggap true.

Untuk menghindari kerancuan tersebut, kita perlu memberitahu Eloquent untuk melakukan casting atribut has_adipura:

    protected $casts = [
        'has_adipura'   => 'boolean'
    ];
    
Output yang dihasilkan:

	{"nama":"Kab. Sragen","has_adipura":false,"nama_provinsi":"Jawa Tengah"}
	
Laravel 5 bisa melakukan casting untuk tipe data berikut: integer, real, float, double, string, boolean, object dan array.	
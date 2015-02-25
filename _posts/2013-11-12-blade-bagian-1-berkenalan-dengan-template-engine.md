---
layout: post
title: "Blade Bagian 1: Berkenalan Dengan Template Engine"
---

![German Sword](https://dl.dropboxusercontent.com/u/21271348/id-laravel.com/blade-bagian-1/german-sword.jpg)

### Apa Itu Templating Engine?
Jika Anda sudah familiar dengan [smarty](http://www.smarty.net/), [twig](http://twig.sensiolabs.org/), atau [dwoo](http://dwoo.org/), maka bagian ini tidak penting lagi, lanjut saja ke pembahasan berikutnya.

Jika Anda merasa belum pernah memakai template engine sebelumnya, maka saya yakin Anda bohong. Kenapa? Karena pada dasarnya PHP sendiri adalah sebuah template engine.

Coba perhatikan potongan kode berikut:

    ...
    <ul>
        <?php foreach($posts as $post): ?>
        <li> <?php echo $post->title ?> </li>
        <?php endforeach; ?>
    </ul>
    ...

Anda menggabungkan tag HTML dan kode PHP untuk menghasilkan tampilan sesuai keinginan. Anda punya template HTML yang statis lalu mengisinya dengan data dinamis dari PHP.

Selanjutnya perhatikan kode berikut:

    <?php
        $html = '';
        $html .= '<ul>';
        foreach($posts as $post){
            $html .= '<li>' . $post->title . '</li>';
        }
        $html .= '</ul>';

        echo $html;
    ?>

Outputnya sama, tapi kali ini Anda tidak memanfaatkan PHP sebagai sebuah template engine. Anda hanya menggunakan PHP sebagai sebuah bahasa yang mampu melakukan pengolahan string. Dalam hal ini string yang dihasilkan adalah tag HTML.

Mana yang lebih baik? Untuk kebanyakan kasus, kode pertama jelas lebih baik. Dengan menulis tag HTML sebaga tag HTML (bukan sebagai string, dimana untuk menulisnya harus dibungkus tanda petik), maka Anda bisa memanfaatkan fitur *autocomplete* dan *syntax highlighting* yang disediakan oleh [editor kesayangan](http://sublimetext.com). Selain itu, kode pertama juga lebih mudah dibaca, bahkan oleh orang yang tidak familiar dengan PHP sekalipun.

Ok, sampai sini paham kan apa itu template engine? Kalau ditanya apa definisinya saya pun cukup sulit menjelaskan, jadi harapan saya contoh sederhana di atas bisa memberi gambaran apa itu *template engine*.

### Apa Itu Blade?
Singkatnya, **blade** adalah template engine bawaan Laravel. Blade menawarkan syntax yang lebih mudah dan singkat untuk dipakai dalam menghasilkan dokumen HTML.

Masih memakai contoh kode di atas, jika ditulis ulang menggunakan blade akan menjadi seperti ini:

{% raw %}

    ...
    <ul>
        @foreach($posts as $post)
        <li> {{ $post->title }} </li>
        @endforeach
    </ul>
    ...

{% endraw %}

Jauh lebih singkat dan lebih enak dibaca kan? Tapi yang pasti Anda akan cukup kagok menulisnya. Tapi tenang, itu cuma karena belum terbiasa saja dengan 'keindahan' laravel blade :)

### Blade Syntax
Pengecekan menggunakan `if else`, `looping array` untuk menampilkan data, dan meng-`echo` `variable` adalah task yang biasa kita lakukan ketika membuat web. Laravel tahu kebutuhan itu, maka disediakanlah blade untuk mempermudah kita melakukan task yang rutin dan sering dilakukan tersebut.

#### *Echo variable*

{% raw %}
    Halo bro {{ $name }}

    // identik dengan:
    Halo bro <?php echo $name ?>
{% endraw %}

#### *Echo variable* dengan aman (*escape* html)

{% raw %}
    Halo bro {{{ $name }}}

    // identik dengan:
    Halo bro <?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?>
{% endraw %}

#### *Echo variable* atau *default value* (Laravel versi 4.1)

{% raw %}
    Halo bro {{ $name or 'guest' }}

    // identik dengan:
    Halo bro <?php echo isset($name)?$name:'guest' ?>
{% endraw %}

#### Kondisional

    @if (count($posts) === 1)
        Ada satu tulisan baru
    @elseif (count($posts) > 1)
        Ada beberapa tulisan baru
    @else
        Tidak ada tulisan baru
    @endif


    // kebalikan dari if, hanya dijalankan jika kondisi TIDAK terpenuhi
    @unless ($isLogin)
        Anda tidak berhak mengakses halaman ini
    @endunless

#### Iterasi

{% raw %}

    @for ($i = 0; $i < 10; $i++)
        <span>nilai i = {{ $i }}<span>
    @endfor

    @foreach ($posts as $post)
        <p>Judul = {{ $post->title }}</p>
    @endforeach

    @while (true)
        <p>Forever alone... eh, forever looping</p>
    @endwhile

{% endraw %}

#### Include sub-view

    @include('folder.subview')

    // passing variable
    @include('folder.subview', array('var1' => 'value1'))

#### Komentar

{% raw %}

    {{-- Ini komentar, tidak akan ditampilkan --}}

{% endraw %}

### Cara Kerja Blade
Untuk bisa menggunakan blade di proyek laravel Anda, hanya ada satu hal yang harus dilakukan. Ganti nama file view Anda, misalnya dari `sample.php` menjadi `sample.blade.php`.

Selanjutnya, laravel akan menerjemahkan tag-tag blade menjadi tag-tag PHP yang bersesuaian. Tidak ada proses aneh-aneh didalamnya. Kode `@if(true)` akan diterjemahkan menjadi `<?php if(true): ?>`. Straightforward.

Karena ada proses tambahan untuk menerjemahkan dari blade ke PHP, tentu performansi akan sedikit berkurang. Tapi tenang saja, tidak akan begitu berasa kok, saya jamin. Apalagi laravel cukup pintar untuk mendeteksi apakah file blade sudah berubah sejak terakhir kali diterjemahkan. Jika ternyata tidak ada perubahan, maka file hasil terjemahan sebelumnya akan langsung dipakai.

Untuk lebih jelasnya, mari kita praktekkan saja. Tambahkan router baru seperti berikut:

    Route::get('blade-sample', function(){

        return View::make('blade-sample');

    });

Lalu buat file `app/views/blade-sample.blade.php`:

{% raw %}

    @foreach(array(1,2,3) as $i)
    {{ $i }}
    @endforeach

{% endraw %}

Lihat hasilnya di browser. Tampak tulisan '123'. Selanjutnya buka folder `app/storage/views`, dan Anda akan menemukan file dengan nama yang aneh semisal `d9c6e88599f63fd69746818d3514ff5d`. Jika Anda buka, isinya adalah seperti ini:

    <?php foreach(array(1,2,3) as $i): ?>
    <?php echo $i; ?>
    <?php endforeach; ?>

Ini adalah file PHP hasil terjemahan dari file blade. File PHP inilah yang pada akhirnya akan digunakan untuk merender view. Seperti itu saja cara kerjanya, tidak ada yang aneh-aneh kan?

### Template Inheritance dan Section Overwrite
Contoh-contoh di atas memperlihatkan betapa **blade** hanya menggantikan cara penulisan tag php menjadi lebih sederhana dan lebih sedikit karakter. Sebenarnya ada fitur lain yang akan membuat Anda tercengang dan semakin jatuh cinta dengan **blade**, yaitu **template inheritance** dan **section overwrite**.

Berhubung hari sudah mulai gelap, kita lanjutnya di esok hari ya ;) Jangan lupa follow twitter [@id_laravel](http://twitter.com/id_laravel) biar selalu update dengan perkembangan Laravel Indonesia.

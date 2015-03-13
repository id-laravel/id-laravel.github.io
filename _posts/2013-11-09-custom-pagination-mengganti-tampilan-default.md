---
layout: post
title: "Custom Pagination: Mengganti Tampilan Default"
tags: [paginasi]
---

Edit file app/config/view.php:

    ...
    'pagination' => 'pagination::slider',

Ada 3 jenis paginasi yang secara default sudah disediakan oleh laravel 4, yaitu: **slider** dan **simple** (untuk bootstrap 2.x), serta **slider-3** (untuk bootstrap 3).

#### Custom Pagination
Jika Anda ternyata cukup berani membuat tampilan paginasi sesuai selera sendiri, maka tidak perlu khawatir karena hal tersebut juga dimungkinkan. Cukup ganti `pagination::slider` dengan `elements/custom-pagination`, lalu buat sebuah file baru  `app/views/elements/custom-pagination.php`. Isinya copy paste saja dari default slider yang ada di `vendor/framework/src/Illuminate/Pagination/views/slider.php`, lalu modifikasi sesuai kebutuhan.

    <?php
    	$presenter = new Illuminate\Pagination\BootstrapPresenter($paginator);
    ?>

    <?php if ($paginator->getLastPage() > 1): ?>
    	<div class="pagination">
    		<ul>
    			<?php echo $presenter->render(); ?>
    		</ul>
    	</div>
    <?php endif; ?>

Sebagai contohnya, misalnya jadi seperti ini:

{% raw %}

    <?php
        $presenter = new Illuminate\Pagination\BootstrapPresenter($paginator);

        $prevUrl = $paginator->getUrl($paginator->getCurrentPage() - 1);

        $nextPage = $paginator->getCurrentPage() + 1;
        if($nextPage > $paginator->getLastPage())
        {
            $nextPage = $paginator->getCurrentPage();
        }
        $nextUrl = $paginator->getUrl($nextPage);

    ?>
    <div class="btn-group">
        <a href="{{ $prevUrl }}" class="btn"><i class="icon icon-chevron-left"></i></a>
        <span class="btn">{{ $paginator->getCurrentPage() }} / {{ $paginator->getLastPage() }}</span>
        <a href="{{ $nextUrl }}" class="btn"><i class="icon icon-chevron-right"></i></a>
    </div>
    
{% endraw %}

Beberapa fungsi yang dimiliki object `$paginator` yang mungkin berguna untuk membuat style paginasi sesuai selera Anda antara lain:

    $paginator->getTotal();
    $paginator->getFrom();
    $paginator->getTo();
    $paginator->getCurrentPage();
    $paginator->getPerPage();
    $paginator->getLastPage();

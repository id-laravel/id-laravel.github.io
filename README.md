# Poole

*The Strange Case of Dr. Jekyll and Mr. Hyde* tells the story of a lawyer investigating the connection of two persons, Dr. Henry Jekyll and Mr. Edward Hyde. Chief among the novel's supporting cast is a man by the name of Mr. Poole, Dr. Jekyll's loyal butler.

-----

Poole is the butler for [Jekyll](http://jekyllrb.com), the static site generator. It's designed and developed by [@mdo](https://twitter.com/mdo) to provide a clear and concise foundational setup for any Jekyll site. It does so by furnishing a full vanilla Jekyll install with example templates, pages, posts, and styles.

![Poole](https://f.cloud.github.com/assets/98681/1834359/71ae4048-73db-11e3-9a3c-df38eb170537.png)

See Poole in action with [the demo site](http://demo.getpoole.com).

There are currently two official themes built on Poole:

* [Hyde](http://hyde.getpoole.com)
* [Lanyon](http://lanyon.getpoole.com)

Individual theme feedback and bug reports should be submitted to the theme's individual repository.


## Contents

- [Usage](#usage)
- [Options](#options)
  - [Rems, `font-size`, and scaling](#rems-font-size-and-scaling)
- [Development](#development)
- [Author](#author)
- [License](#license)


## Usage

### 1. Install Jekyll

Poole is built for use with Jekyll, so naturally you'll need to install that. On Macs, it's rather straightforward:

```bash
$ gem install jekyll
```

**Windows users:** Windows users have a bit more work to do, but luckily [@juthilo](https://github.com/juthilo) has your back with his [Run Jekyll on Windows](https://github.com/juthilo/run-jekyll-on-windows) guide.

You may also need to install Pygments, the Python syntax highlighter for code snippets that plays nicely with Jekyll. Read more about this [in the Jekyll docs](http://jekyllrb.com/docs/templates/#code_snippet_highlighting).

### 2a. Quick start

To help anyone with any level of familiarity with Jekyll quickly get started, Poole includes everything you need for a basic Jekyll site. To that end, just download Poole and start up Jekyll.

### 2b. Roll your own Jekyll site

Folks wishing to use Jekyll's templates and styles can do so with a little bit of manual labor. Download Poole and then copy what you need (likely `_layouts/`, `*.html` files, `atom.xml` for RSS, and `public/` for CSS, JS, etc.).

### 3. Running locally

To see your Jekyll site with Poole applied, start a Jekyll server. In Terminal, from `/Poole` (or whatever your Jekyll site's root directory is named):

```bash
$ jekyll serve
```

Open <http://localhost:4000> in your browser, and voilà.

### 4. Serving it up

If you host your code on GitHub, you can use [GitHub Pages](https://pages.github.com) to host your project.

1. Fork this repo and switch to the `gh-pages` branch.
  1. If you're [using a custom domain name](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages), modify the `CNAME` file to point to your new domain.
  2. If you're not using a custom domain name, **modify the `baseurl` in `_config.yml`** to point to your GitHub Pages URL. Example: for a repo at `github.com/username/poole`, use `http://username.github.io/poole/`. **Be sure to include the trailing slash.**
3. Done! Head to your GitHub Pages URL or custom domain.

No matter your production or hosting setup, be sure to verify the `baseurl` option file and `CNAME` settings. Not applying this correctly can mean broken styles on your site.

## Options

Poole includes some customizable options, typically applied via classes on the `<body>` element.


### Rems, `font-size`, and scaling

Poole is built almost entirely with `rem`s (instead of pixels). `rem`s are like `em`s, but instead of building on the immediate parent's `font-size`, they build on the root element, `<html>`.

By default, we use the following:

```css
html {
  font-size: 16px;
  line-height: 1.5;
}
@media (min-width: 38em) {
  html {
    font-size: 20px;
  }
}

```

To easily scale your site's typography and components, simply customize the base `font-size`s here.


## Development

Poole has two branches, but only one is used for active development.

- `master` for development.  **All pull requests should be to submitted against `master`.**
- `gh-pages` for our hosted site, which includes our analytics tracking code. **Please avoid using this branch.**


## Author

**Mark Otto**
- <https://github.com/mdo>
- <https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3

/*

Venue Template

http://www.templatemo.com/tm-522-venue

*/

body {
  font-family: 'Raleway', 'sans-serif';
  background-color: #fff;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

p {
  font-size: 13px;
  color: #7a7a7a;
  line-height: 24px;
  left: 0.25px;
}

section {
  padding-top: 80px;
}


.section-heading {
  text-align: center;
  margin-bottom: 60px;
}

.section-heading span {
  font-size: 17px;
  display: block;
  margin: 0px;
  color: #4883ff;
}

.section-heading h2 {
  margin-bottom: 0px;
  margin-top: 14px;
  font-size: 23px;
  font-weight: 600;
  color: #232323;
  letter-spacing: 0.5px;
}


.blue-button a {
  display: inline-block;
  background-color: #4883ff;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 16px;
  text-decoration: none;
  border: 2px solid #4883ff;
  transition: all 0.5s;
}

.blue-button a:hover {
  background-color: transparent;
  color: #4883ff;
}


/* Header Style */

.cf:before, 
.cf:after {
  content: '';
  display: table;
  visibility: hidden;
}

.cf:after {
  clear: both;
}

.cf {
  *zoom: 1;
}

#header {
  overflow: visible;
  position: relative;
  background-color: #fff;
}


#primary-nav-button {
  background: transparent;
  display: none;
  position: absolute;
  border: none;
  bottom: 0;
  right: 15px;
  top: 0;
  z-index: 9;
  padding: 0;
  outline: none;
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 0;
}

#primary-nav-button:hover {
  background: rgba(0,0,0,0.05);
}

#primary-nav-button.selected {
  background: rgba(0,0,0,0.1);
}

#primary-nav-button:before {
  /* content: 'â˜°'; */
  content: '\2261';
  display: inline-block;
  background-color: #4883ff;
  font-size: 36px;
  font-style: normal;
  font-weight: normal;
  line-height: 1.05;
  width: 100px;
  height: 100px;
  line-height: 100px;
  color: inherit;
  speak: none;
  border: none;
}

#header .logo {
  float: left;
}

#header .logo img {
  width: 100%;
  overflow: hidden;
}

.menu {
  float: right;
}

.menu li {
  float: left;
  margin-left: 30px;
  position: relative;
  line-height: 100px;
}

.menu li:last-child {
  margin-right: 0;
}

.menu .sub-menu li {
  width: 100%;
  margin-left: 0px;
}

.menu li a {
  display: block;
  text-decoration: none;
}

#primary-nav li a {
  color: #121212;
  font-weight: bold;
  line-height: 100px;
  padding: 0px 15px;
  font-size: 15px;
  font-weight: 400;
  transition: all 0.5s;
}

#primary-nav li > a:hover,
#primary-nav li.selected > a {
  color: #4883ff;
}

.sub-menu {
  border-top: 3px solid #4883ff;
}

.sub-menu li a {
  line-height: 50px!important;
  font-size: 13px!important;
  color: #7a7a7a;
}

.downarrow {
    background: none;
    display: inline-block;
  padding: 0;
    text-align: center;
    min-width: 3px;
}

.sub-menu .downarrow {
  position: absolute;
  right: 0;
  top: 12px;
  font-size: 18px;
  padding-right: 10px;
}

.downarrow:before {
  content: '\25be';
  color: inherit;
  display: block;
  font-size: 1em;
  line-height: 1.1;
  width: 1em;
  height: 1em;
}

.menu .sub-menu {
  display: none;
  position: absolute;
  left: 0;
  max-height: 1000px;
}

.menu .sub-menu li {
  line-height: 40px;
}

.menu .sub-menu.hide {
  display: none;
}

#primary-nav .sub-menu {
  background: #fff;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.25);
  min-width: 160px;
  z-index: 200;
}

#primary-nav .sub-menu li {
  border-bottom: 1px solid #ddd;
}

#primary-nav .sub-menu li:last-child {
  border-bottom: 0;
}

#primary-nav .sub-menu .downarrow:before {
  content: '\25b8';
}

#primary-nav.mobile {
  display: none;
  position: absolute;
  top: 100px;
  background: #fff;
  width: 100%;
  right: 15px;
  left: 0;
  z-index: 999999;
}

#primary-nav.mobile .menu {
  text-align: center;
  width: 100%;
}

#primary-nav.mobile li {
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #ddd;
}

#primary-nav.mobile li:first-child  {
  width: 100%;
  margin: 0;
  border-top: 1px solid #ddd;
}

#primary-nav.mobile li.selected > a {
  border-bottom: 1px solid #ddd;
}

#primary-nav.mobile li:last-child {
  border: none;
}


#primary-nav.mobile .sub-menu {
  float: left;
  position: relative;
  width: 100%;
}

#primary-nav.mobile .sub-menu .downarrow {
  top: 15px;
  position: absolute;
  right: 15px;
}

.mobile .downarrow,
.mobile .sub-menu .downarrow {
  position: absolute;
  top:42px;
  right: 25px;
}

#primary-nav.mobile .sub-menu .downarrow:before {
  content: '\25be';
}
#primary-nav-button.mobile {
  display: inline-block;
}




/* Banner Style */

section.banner {
  padding: 0px;
}

.banner {
  background-image: url(../img/main_banner.jpg);
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner .banner-caption {
  padding: 200px 0px;
}

.banner .banner-caption .line-dec {
  width: 80px;
  height: 3px;
  background-color: #4883ff;
}

.banner .banner-caption h2 {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 42px;
  letter-spacing: 0.5px;
  color: #fff;
}

.banner .banner-caption span {
  font-size: 22px;
  color: #fff;
  letter-spacing: 0.5px;
}

.banner .banner-caption .blue-button {
  margin-top: 30px;
}

.banner .submit-form {
  border-bottom: 5px solid #4883ff;
  background-color: #fff;
  padding: 15px;
}

.submit-form .first-item {
  border-right: 1px solid #ddd;
}

.submit-form .second-item {
  border-right: 1px solid #ddd;
}

.submit-form .third-item {
  border-right: 1px solid #ddd;
}

.submit-form select {
  width: 100%;
  height: 50px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: #9a9a9a;
  outline: none;
  padding: 0px 10px;
  display: inline-block;
}

.submit-form input {
  width: 100%;
  height: 50px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: #9a9a9a;
  outline: none;
  padding: 0px 10px;
  display: inline-block;
  box-shadow: none;
}

.submit-form input:focus{
  border-width: 0px;
  outline:0; /* I have also tried outline:none */
  -webkit-appearance:none;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

.submit-form button {
  width: 100%;
  height: 50px;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  border-radius: 0px;
  background-color: #4883ff;
  font-size: 17px;
  letter-spacing: 0.5px;
  color: #fff;
  font-weight: 600;
  border: 2px solid #4883ff;
  transition: all 0.5s;
}

.submit-form button:hover {
  background-color: transparent;
  color: #4883ff;
}

.popular-places .owl-nav {
  display: none;
}

.popular-places .owl-dots {
  margin-top: 40px;
  text-align: center;
}

.popular-places .owl-dots .owl-dot span  {
  width: 12px;
  height: 12px;
  background-color: #cdcdcd!important;
  display: inline-block;
  border-radius: 50%;
  margin: 0 3px;
}

.popular-places .owl-dots .active span {
  background-color: #4883ff!important;
}

.popular-places .owl-dots button {
  outline: none;
}

.popular-places .popular-item .thumb {
  position: relative;
}

.popular-places .popular-item .thumb img {
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  border-radius: 5px;
}

.popular-places .popular-item .thumb .text-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 9;
  color: #fff;
}

.popular-places .popular-item .thumb .text-content h4 {
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: 0px;
  margin-bottom: 5px;
}

.popular-places .popular-item .thumb .text-content span {
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.5px;
  display: block;
}

.popular-places .popular-item .thumb .plus-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9;
}


.popular-places .popular-item .thumb .plus-button i {
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  transition: all 0.5s;
}

.popular-places .popular-item .thumb .plus-button i:hover {
  background-color: rgba(250,250,250,0.3);
}



section.featured-places {
  margin-top: 80px;
  padding-bottom: 80px;
  background-color: #f4f4f4;
}

.featured-places .featured-item .thumb {
  position: relative;
  z-index: 1;
}

.featured-places .featured-item .thumb img {
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.featured-places .featured-item .thumb .overlay-content {
  position: absolute;
  z-index: 9;
  top: 30px;
  left: 30px;
  color: #fff;
}

.featured-places .featured-item .thumb .overlay-content li {
  display: inline;
  margin-right: 3px;
}

.featured-places .featured-item .thumb .date-content {
  position: absolute;
  z-index: 9;
  top: 30px;
  right: 30px;
  color: #fff;
  text-align: center;
  width: 90px;
  height: 90px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  background-color: #4883ff;
  border-radius: 50%;
}

.featured-places .featured-item .thumb .date-content h6 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 18px;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
}

.featured-places .featured-item .thumb .date-content span {
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
  display: block;
  letter-spacing: 0.5px;
}

.featured-places .featured-item .down-content {
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
  padding: 20px 20px 0px 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.featured-places .featured-item .down-content h4 {
  margin-top: 0px;
  font-size: 19px;
  font-weight: 600;
  color: #232323;
  margin-bottom: 5px;
}

.featured-places .featured-item .down-content span {
  display: block;
  font-size: 13px;
  color: #4883ff;
  margin-bottom: 15px;
}

.featured-places .featured-item .down-content p {
  margin-bottom: 20px;
}

.featured-places .featured-item .down-content .col-md-6 {
  padding-left: 0px;
  padding-right: 0px;
}

.featured-places .featured-item .down-content .text-button {
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #ddd;
  margin: 0px -5px;
}

.featured-places .featured-item .down-content .first-button {
  border-right: 1px solid #ddd;
}

.featured-places .featured-item .down-content .text-button a {
  font-size: 12px;
  text-transform: uppercase;
  color: #7a7a7a;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  transition: all 0.5s;
}

.featured-places .featured-item .down-content .text-button a:hover {
  color: #4883ff;
}




section.our-services .service-item {
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 50px 30px;
}

section.our-services .service-item .icon img {
  max-width: 100%;
}

section.our-services .service-item h4 {
  font-size: 19px;
  font-weight: 600;
  color: #232323;
  margin-top: 30px;
  margin-bottom: 15px;
}

.our-services .left-content h4 {
  font-size:  19px;
  font-weight:  600;
  color:  #232323;
  margin-top: 0px;
  margin-bottom:  25px;
}

.our-services .left-content .blue-button {
  margin-top: 25px;
}

.down-services {
  border-top: 1px solid #ddd;
  margin-top: 60px;
  padding-top: 60px;
}
.accordion li {
  position: relative;
}
.accordion li a {
  border: 1px solid #ddd;
}
.accordion li:last-child a {
  
}
.accordion li p {
  display: none;
}
.accordion a {
  width: 100%;
  display: block;
  cursor: pointer;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.5px;
  color: #232323;
  user-select: none;
  padding: 15px 20px;
  text-decoration: none;
}
.accordion a:after {
  width: 15px;
  height: 15px;
  background-color: #ddd;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  content: " ";
  top: 22.5px;
  transform: rotate(-45deg);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.accordion p {
  margin: 0px;
  padding: 20px;
  border: 1px solid #ddd;
}

a.active:after {
  background-color: #4883ff;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}



section#video-container {
  margin-top: 80px;
}

#video-container  {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
  z-index: 1;
}

#video-container video,
.video-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
}

#video-container .video-overlay {
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  width: 100%;
}

#video-container .video-content {
  z-index: 99999;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

#video-container .video-content .inner {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}

#video-container .video-content .inner span {
  font-size: 17px;
  display: block;
  margin: 0px;
  color: #fff;
}

#video-container .video-content .inner h2 {
  margin-bottom: 0px;
  margin-top: 14px;
  font-size: 23px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.5px;
}

#video-container .video-content .inner a {
  margin-top: 30px;
  width: 60px;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 56px;
  color: #fff;
  background-color: rgba(250,250,250,0.1);
  font-size: 18px;
  border: 3px solid #fff;
  border-radius: 50%;
}



section.pricing-tables .table-item {
  text-align: center;
  background-color: #eeeeee;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0px 0px 40px 0px;
}

section.pricing-tables .table-item .top-content {
  background-color: #4883ff;
  padding: 30px;
  color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

section.pricing-tables .table-item .top-content h4 {
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0px;
  margin-bottom: 0px;
}

section.pricing-tables .table-item .top-content h1 {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-top: 20px;
  margin-bottom: 10px;
}

section.pricing-tables .table-item ul {
  margin: 40px 0px!important;
}

section.pricing-tables .table-item ul li {
  margin: 25px 0px;
}

section.pricing-tables .table-item ul li a {
  font-size: 14px;
  font-weight: 600;
  color: #4a4a4a;
  text-decoration: none;
  transition: all 0.5s;
}

section.pricing-tables .table-item ul li a:hover {
  color: #4883ff;
}

section.contact .section-heading {
  margin-top: 60px;
  margin-bottom: 30px;
}

.wrapper {
  text-align: center;
}

/* Modal button */
.modal-btn {
  display: inline-block;
  background-color: #4883ff;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 16px;
  text-decoration: none;
  border: 2px solid #4883ff;
  transition: all 0.5s;
}
.modal-btn:hover {
  background-color: transparent;
  color: #4883ff;
}

/* Modal */
.modal {
  background-color: rgba(0,0,0,.65);
  display: none;
  overflow: auto;
  position: fixed;
  z-index: 1000;
  padding-top: 10%;
  padding-bottom: 10%;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.modal-content .section-heading {
  text-align: left;
  margin-top: 0px!important;
}
.modal-content .section-heading h2 {
  margin-top: 10px;
}

.modal-content .left-content {
  padding: 30px;
}

.modal-content .left-content input {
  border-radius: 0px;
  padding-left: 15px;
  font-size: 13px;
  color: #aaa;
  background-color: #f4f4f4;
  border: 1px solid #eee;
  outline: none;
  box-shadow: none;
  line-height: 40px;
  height: 40px;
  width: 100%;
  margin-bottom: 25px;
}

.modal-content .left-content textarea {
  border-radius: 0px;
  padding-left: 15px;
  padding-top: 10px;
  font-size: 13px;
  color: #aaa;
  background-color: #f4f4f4;
  border: 1px solid #eee;
  outline: none;
  box-shadow: none;
  min-height: 140px;
  height: 160px;
  max-height: 180px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 25px;
}

.modal-content .left-content button {
  display: inline-block;
  background-color: #4883ff;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 0px;
  border: 2px solid #4883ff;
  transition: all 0.5s;
}

.modal-content .left-content button:hover {
  background-color: transparent;
  color: #4883ff;
}

.modal-content .right-content {
  background-color: #4883ff;
  padding: 30px 30px 65px 30px;
  color: #fff;
}

.modal-content .right-content .section-heading h2 {
  color: #fff;
}

.modal-content .right-content .section-heading span {
  color: #fff;
}

.modal-content .right-content p {
  margin-bottom: 50px;
  color: #fff;
}

.modal-content .right-content ul li span {
  font-size: 13px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.3px;
  width: 80px;
  display: inline-block;
}

.modal-content .right-content ul li a {
  font-size: 13px;
  color: #fff;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.modal-content .right-content ul li {
  margin: 10px 0px;
}

/* Modal Content */
.modal-content {
  position: relative;
  top: 0px;
  width: 60%;
  margin: 0 auto;
  background-color: #fff;
  //background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}
.modal-animated-in {
  animation: totop-in .3s ease;
}
.modal-animated-out {
  animation: totop-out .3s ease forwards;
}
.modal-content .close {
  position: absolute;
  right: -30px;
  top: -30px;
  width: 60px;
  height: 60px;
  z-index: 9999;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  color: #4883ff;
  border-radius: 50%;
  opacity: 1;
}

.modal-content .close:hover {
  background-color: #fff;
  color: #4883ff;
}

/* Keyframes */
@keyframes totop-in {
  0% {
    top: 600px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }  
}

@keyframes totop-out {
  0% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: -100%;
    opacity: 0;
  }  
}



footer {
  margin-top: 80px;
  padding: 80px 0px 70px 0px;
  border-top: 1px solid #ddd;
}

footer .footer-heading h4 {
  font-size: 21px;
  color: #232323;
  letter-spacing: 0.5px;
  margin-top: 15px;
  margin-bottom: 40px;
}


footer .about-veno .logo {
  margin-bottom: 40px;
}

footer .about-veno ul li a {
  width: 32px;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 32px;
  background-color: #cdcdcd;
  border-radius: 50%;
  font-size: 15px;
  color: #fff;
  margin-right: 3px;
  transition: all 0.5s;
}

footer .about-veno p {
  margin-bottom: 25px;
}

footer .about-veno ul li a:hover {
  background-color: #4883ff;
}

footer .useful-links ul li {
  margin-bottom: 12px;
}

footer .useful-links ul li a {
  font-size: 15px;
  color: #7a7a7a;
  letter-spacing: 0.5px;
  text-decoration: none;
  transition: all 0.5s;
}

footer .useful-links ul li a:hover {
  color: #4883ff;
}

footer .useful-links ul li i {
  color: #4883ff;
  font-size: 6px;
  position: relative;
  top: -3px;
  margin-right: 8px;
}

footer .contact-info p {
  margin-bottom: 25px;
}

footer .contact-info ul li {
  margin: 10px 0px;
}

footer .contact-info ul li span {
  font-size: 13px;
  color: #7a7a7a;
  font-weight: 600;
  letter-spacing: 0.3px;
  width: 80px;
  display: inline-block;
}

footer .contact-info ul li a {
  font-size: 13px;
  color: #4883ff;
  letter-spacing: 0.5px;
  text-decoration: none;
}

.sub-footer p {
  text-align: center;
  display: inline-block;
  background-color: #f4f4f4;
  width: 100%;
  margin-bottom: 0px;
  padding: 30px 0px;
  font-size: 15px;
  color: #aaaaaa;
}

.sub-footer a {
  text-decoration: none;
  color: #4883ff;
}


@media (max-width:992px) {

  .banner .banner-caption {
    padding: 200px 30px;
  }

  .submit-form input {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    border-radius: 0px;
  }

  .submit-form select {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    border-radius: 0px;
  }

  .featured-places .featured-item {
    margin-bottom: 30px;
  }

  .featured-places .featured-item .down-content .first-button {
    border-right: none;
  }

  section.our-services .service-item {
    margin-bottom: 30px;
  }

  .down-services .left-content {
    margin-bottom: 60px;
  }

  #video-container .video-content {
    padding: 0 30px;
    text-align: center;
  }

  .table-item {
    margin-bottom: 30px;
  }

  .modal-content {
    width: 90%;
  }
  .modal-content .close {
    right: 50%;
    left: 50%;
    transform: translateX(-50%);
    top: -30px;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
  }

  footer .useful-links {
    margin-top: 60px;
  }

  footer .contact-info {
    margin-top: 60px;
  }
  
}














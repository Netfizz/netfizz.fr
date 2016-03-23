var elixir = require('laravel-elixir');
require('laravel-elixir-spritesmith');
require('laravel-elixir-imagemin');
require('laravel-elixir-uncss');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    // Process SASS
    mix.sass('app.scss');

    // Process JS
    mix.browserify('app.js');


    if (elixir.config.production) {
        // CSS sprite
        mix.spritesmith(null, {
            src: 'resources/assets/images/sprites',
            imgOutput: 'resources/assets/images',
            imgPath: '/images/sprite.png',
            cssOutput: 'resources/assets/sass/base',
            cssName: '_sprite.scss',
            cssFormat: 'scss_maps',
            algorithm: 'top-down',
            imgOpts: {
                quality: 50
            },
            engineOpts: {
                imagemagick: true
            }
        });

        // Remove unecessary css rules
        mix.uncss('../../../public/css/app.css', {
            html: [
                'http://netfizz.dev/',
                'http://netfizz.dev/mentions-legales'
            ],
            ignore: [/page-loaded/, /transition-end/, /fonts-loaded/, /progressbar/, /btn-big/],
            timeout: 2500
        });
    }

    // Versioning assets
    mix.version([
        'css/app.css',
        'js/app.js'
    ]);

    // Reduce images size
    mix.imagemin();
});

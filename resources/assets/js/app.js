var Core = require('./component/core.js');
var App = window.App = new Core({
    components: {
        Font: require('./component/font')({
            fonts: 'Yanone Kaffeesatz',
            urls : 'https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz'
        }),
        Loader: require('./component/loader'),
        Ajax: require('./component/ajax'),
        Perspective: require('./component/perspective')
    },
    on:{
        'app.init' : function() {
            html.classList.remove('no-js');
            html.classList.add('js');
        },
        'loader.progress' : function() {
            html.classList.add('page-loading');
        },
        'loader.done' : function() {
            html.classList.remove('page-loading');
            html.classList.add('page-loaded');
            App.get('Perspective').fire();

            setTimeout(function() {
                html.classList.add('transition-end');
            }, 1000);
        },
        'font.loaded' : function() {
            html.classList.add('fonts-loaded');
        },
        'ajax.response' : function(response, context) {
            if (context === document.getElementById('bonjour')) {
                var email = response.responseText;
                var p = document.createElement('span');
                p.className = 'btn-big';
                p.innerHTML = email;
                context.parentNode.replaceChild(p, context);

                window.location = 'mailto:' + email;
            }
        }
    }
});


var html = document.documentElement;
App.init();
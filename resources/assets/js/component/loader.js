module.exports = function(){
    'use strict';

    var bar = null;
    var percent = 0;
    var nbLoaded = 0;

    // Get background images & fonts from css files
    var getItemsFromCSS = function() {
        var items = [];
        var styles = document.styleSheets;

        // Loop on each styleSheets files
        for (var i = 0; i < styles.length; i++) {
            var rules = styles[i].rules || styles[i].cssRules;

            // Loop on each css rules
            for (var x = 0; x < rules.length; x++) {
                var css = (rules[x].cssText) ? rules[x].cssText : rules[x].style.cssText;
                var bg;

                // Get every rule with asset url
                if (bg = css.match(/url\("(.+?)"\)(.+?);/)) {
                    if (items.indexOf(bg[1]) === -1) {
                        items.push(bg[1]);
                    }
                }
            }
        }

        // Create virtual imgs with every src
        return items.map(function(src) {
            var img = new Image();
            img.src = src;
            return img;
        });
    };

    // Add load event to every items
    var addLoadEvents = function(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener('load', fire);
            items[i].addEventListener('error', fire);
        }
    };

    // Event callback
    var fire = function() {
        if (bar === null) {
            createBar();
            bar = document.getElementById('progressbar');
        }

        nbLoaded++;
        percent = Math.round(nbLoaded / nbTotal * 100);
        bar.style.width = percent + '%';
    };

    var done = function() {
        bar.style.width = '100%';
        bar.classList.add('done');
        setTimeout(function() {
            document.body.removeChild(bar);
            App.emit('loader.done');
        }, 500)
    };

    var createBar = function() {
        App.emit('loader.progress');
        var bar = document.createElement('div');
        bar.id = 'progressbar';
        document.body.appendChild(bar);
    };

    // get assets in html & stylesheets
    var items = document.querySelectorAll('img, link[rel=stylesheet], script[src]');
    var itemsCSS = getItemsFromCSS();
    var nbTotal = items.length + itemsCSS.length + 1;

    // Set events
    addLoadEvents(items);
    addLoadEvents(itemsCSS);
    window.addEventListener('load', done);

    return {}
};
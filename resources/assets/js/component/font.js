var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

module.exports = function(opts) {

    var fonts = opts.fonts || null;
    var urls  = opts.urls || null;
    var observers = [];

    if( typeof fonts === 'string' ) {
        fonts = [fonts];
    }

    if( typeof urls === 'string' ) {
        urls = [urls];
    }

    var hash = function(s){
        var nHash = 0; if (!s.length) return nHash;
        for (var i=0,imax=s.length,n; i<imax; ++i) { n = s.charCodeAt(i); nHash = ((nHash<<5)-nHash)+n; nHash = nHash & nHash;}
        return Math.abs(nHash);
    };

    var addFontStyle = function(key) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage.getItem(key);
    };

    // load fonts from localStorage or async
    var loadFont = function(url) {
        var key = 'fonts-' + hash(url);
        try {
            if (localStorage.getItem(key)) {
                addFontStyle(key);
            } else {
                // We have to first load the font file asynchronously
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        // We save the file in localStorage
                        localStorage.setItem(key, request.responseText);
                        addFontStyle(key);
                    }
                };
                request.send();
            }
        } catch(e) {}
    };

    var handle = function() {
        urls.forEach(function(url) {
            loadFont(url);
        });

        fonts.forEach(function(font) {
            observers.push((new FontFaceObserver(font)).check());
        });

        Promise.all(observers).then(function () {
            App.emit('font.loaded');
        });
    };

    return {
        handle: handle
    };
};

module.exports = function(opts){
    'use strict';

    var defaultOpts = { selector: 'form[data-ajax]' };
    var params = opts || defaultOpts || {};

    var request = function(type, url, callback, formData, context) {
        App.emit('ajax.' + type.toLowerCase(), url, context);

        var r = new XMLHttpRequest();
        r.open(type, url, true);
        r.send(formData);


        r.onload = callback || function() {
            if (r.status == 200) {
                App.emit('ajax.response', r, context);
                return r;
            } else {
                App.info(['Ajax error.', r.status, r.responseText].join(' '));
                return null;
            }
        };

        // Handle network errors
        r.onerror = function() {
            App.info('Network Error');
            return null;
        };
    };

    var post = function(url, callback, formData, context) {
        return request('POST', url, callback, formData, context);
    };

    var get = function(url, callback) {
        request('GET', url, callback);
    };

    var handle = function(form) {
        form.addEventListener('submit', function(e) {
            var url = this.action || null;
            var formData = new FormData(this);

            post(url, null, formData, this);
            e.preventDefault();
        });
    };

    return {
        params: params,
        handle: handle,
        post: post,
        get: get
    }
};
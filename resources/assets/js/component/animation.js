module.exports = function(opts) {
    'use strict';

    var defaultOpts = { selector: '*[data-animated]' };
    var params = opts || defaultOpts || {};

    var handle = function(item) {

        var fire = (function(event) {
            // Don't fire event on childs
            if (item !== event.target) return;

            App.emit('animation.' +  event.type, item);

            // Fire only once
            item.removeEventListener(event.type, fire);
        });

        var events = ['animationstart', 'animationend', 'transitionend'];

        events.forEach(function(event) {
            item.addEventListener(event, fire);
        });
    };

    return {
        params: params,
        handle: handle
    };
};
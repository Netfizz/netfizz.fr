module.exports = function(options) {
    'use strict';

    var channels = {};
    var components = options.components || {};
    var subscriptions = options.on || {};

    // ============================= COMPONENTS ===================================
    var componentCore = (function() {
        var boot = function(name, app) {
            this.ComponentName = name;
            this.App = app;
        };

        // Provide default init function if doesn't exist
        var init = function() {
            if (typeof this.handle !== 'function') return;

            if(typeof this.params !== 'undefined' && typeof this.params.selector !== 'undefined') {
                var items = document.querySelectorAll(this.params.selector);
                for (var i = 0; i < items.length; i++)
                    this.handle(items[i]);
            } else {
                this.handle();
            }
        };

        return {
            boot: boot,
            init: init
        }
    })();

    var setComponent = function(name, callback) {
        // Boot component if necessary
        var instance = (typeof callback === 'function') ? new callback() : callback;

        // Extend component with core functions
        for (var key in componentCore) { instance[key] = componentCore[key]; }

        // Set default properties and methods
        instance.boot(name, App);

        // Add component instance to components list
        components[name] = instance;

        return components[name];
    };

    var addComponent = function(name, callback, replace) {
        // Check if component already exist
        if (name in components) {
            if (replace) {
                removeComponent(name);
            } else {
                throw new Error('Component name conflict: ' + name);
            }
        }

        setComponent(name, callback, App).init();
        return this;
    };

    var removeComponent = function(name) {
        if (name in components) {
            delete components[name];
        }
    };

    var getComponent = function(name) {
        return components[name];
    };

    var contains = function(name) {
        return (name in components);
    };


    // ============================= PUB / SUB ===================================
    var subscribe = function(channel, fn){
        info('subscribe ' + channel);

        if (!channels[channel]) channels[channel] = [];
        channels[channel].push({ context: this, callback: fn });
        return this;
    };

    var publish = function(channel){
        info('publish ' + channel);
        if (!channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        info(args);
        for (var i = 0, l = channels[channel].length; i < l; i++) {
            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    var unsubscribe = function(channel) {
        return this;
    };

    // ============================= CORE ===================================
    var init = function(events) {
        publish('app.init');

        setSubscriptions(events);

        for (var name in components) {
            components[name].init();
            publish('app.init.' +  name.toLowerCase(), components[name]);
        }
        return this;
    };

    // Debug
    var info = function() {
        if ((typeof debug !== 'undefined' && debug === true) || window.location.hash == '#debug') {
            console.log.apply(console, arguments);
        }
    };

    var setSubscriptions = function(events) {
        for (var name in events) {
            App.on(name, events[name]);
        }
    };

    var isMobile = function() {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    };

    var App = {
        info   : info,
        init    : init,
        add     : addComponent,
        remove  : removeComponent,
        get     : getComponent,
        has     : contains,
        on      : subscribe,
        off     : unsubscribe,
        emit    : publish,
        isMobile: isMobile
    };

    // Boot App
    (function(){
        // Boot subscriptions
        setSubscriptions(subscriptions);
        // Boot components
        for (var name in components) {
            setComponent(name, components[name]);
        }
    })(App);

    return App;
};
// Src : https://codyhouse.co/gem/parallax-hero-image/

module.exports = function(opts){
    'use strict';

    var defaultOpts = {
        selector: '*[data-perspective]',
        maxRotationY: 0.75,
        maxRotationX: 0.1
    };

    var params = opts || defaultOpts || {};

    //check media query
    var html = document.documentElement,
        halfWindowH = html.offsetHeight * 0.5,
        halfWindowW = html.offsetWidth * 0.5,
        maxRotationY = params.maxRotationY,
        maxRotationX = params.maxRotationX,
        bg = document.querySelector(params.selector + ' > *');

    function initBackground() {
        var aspectRatio = bg.offsetWidth/bg.offsetHeight;

        var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio),
            proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
            newImageWidth = Math.ceil(halfWindowW*2*proportions),
            newImageHeight = Math.ceil(newImageWidth/aspectRatio),
            newLeft = halfWindowW - newImageWidth/2,
            newTop = (wrapperHeight - newImageHeight)/2;

        document.querySelector(params.selector).style.height = wrapperHeight;
        bg.style.left = newLeft;
        bg.style.top = newTop;
        bg.style.width = newImageWidth;
    }

    function moveBackground(event) {
        var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
            rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

        if( rotateY > maxRotationY) rotateY = maxRotationY;
        if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
        if( rotateX > maxRotationX) rotateX = maxRotationX;
        if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

        var transform = 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)';
        bg.style.transform = transform;
    }

    function fire() {
        if (bg) {
            initBackground();

            window.onmousemove = function(e) {
                window.requestAnimationFrame(function(){
                    moveBackground(e);
                });
            };
        }
    }

    return {
        fire:fire
    }
};
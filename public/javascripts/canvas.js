define(['jquery', 'mediator'], function($, sandbox) {

    /*
     * constructor for object which will
     * provide interaction between canvas and another modules
     */
    var Canvas = function() {
        this.sandbox = sandbox;
        this.$canvas = $('#canvas');
        this.ctx = this.$canvas.get(0).getContext('2d');
        this.originImg = new Image;
        this.subscribeToEvents();
    };

    Canvas.prototype = {

        /*
         * subscribing to events
         */
        subscribeToEvents: function() {
            this.sandbox
                .subscribe('renderImg', this, this.renderImg)
                .subscribe('renderArrayImg', this, this.renderArrayImg)
                .subscribe('getImageData', this, this.publishImageData)
            ;
        },

        /*
         * render image which pass from event
         * @param {object} e
         */
        renderImg: function(e) {
            this.originImg = e.img;
            this.ctx.drawImage(
                this.originImg,
                0,
                0,
                this.$canvas.width(),
                this.$canvas.height()
            );
            if (e.type === 'justLoaded') {
                this.publishImageData();
            }
        },

        /*
         * render part of the image
         * @param {object} e
         */
        renderArrayImg: function(e) {
            var tempData = this.ctx.createImageData(e.img.width, e.to-e.from)
                , i, j;
            for (i=e.from*4*e.img.width; i<e.to*4* e.img.width; i++) {
                    tempData.data[i-e.from*4*e.img.width] = e.img.data[i];
            }
            this.ctx.putImageData(tempData, 0, e.from, 0, 0, tempData.width, tempData.height);
            this.publishImageData();
        },

        /*
         * generate event which will send current image, rendered in the canvas
         * to all subscribers
         */
        publishImageData: function() {
            this.sandbox.publish('saveOriginalImg', {
                img: this.ctx.getImageData(0, 0, this.$canvas.width(), this.$canvas.height()),
                width: this.$canvas.width(),
                height: this.$canvas.height(),
                ctx: this.ctx
            });
        }

    };

    return new Canvas;

});
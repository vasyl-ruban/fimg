define(['jquery', 'mediator'], function($, sandbox) {
    var Canvas = function() {
        this.sandbox = sandbox;
        this.$canvas = $('#canvas');
        this.ctx = this.$canvas.get(0).getContext('2d');
        this.originImg = new Image;
        this.subscribeToEvents();
    };
    Canvas.prototype = {
        subscribeToEvents: function() {
            this.sandbox
                .subscribe('renderImg', this, this.renderImg)
                .subscribe('renderArrayImg', this, this.renderArrayImg);
        },
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
                this.sandbox.publish('saveOriginalImg', {
                    img: this.ctx.getImageData(0, 0, this.$canvas.width(), this.$canvas.height()),
                    width: this.$canvas.width(),
                    height: this.$canvas.height(),
                    ctx: this.ctx
                });
            }
        },
        renderArrayImg: function(e) {
            this.ctx.putImageData(e.img, 0, 0);
            for (var i=0;i<10;i++) {
                console.log(e.img.data[i]);
            }
        }
    };

    return new Canvas;
});
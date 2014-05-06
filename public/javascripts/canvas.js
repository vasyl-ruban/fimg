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
                .subscribe('renderImg', this, this.renderImg);
        },
        renderImg: function(e) {
            this.originImg = e.img;
            this.$canvas.width(this.originImg.width);
            this.$canvas.height(this.originImg.height);
            console.log(this.$canvas.height(), this.$canvas.width());
            this.ctx.drawImage(
                this.originImg,
//                0,
//                0,
//                this.originImg.width,
//                this.originImg.height,
                0,
                0
//                this.$canvas.height(),
//                this.$canvas.width()
            );
        }
    };

    return new Canvas;
});
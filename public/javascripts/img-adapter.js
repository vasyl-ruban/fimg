define([], function() {
    var Adapter = function(img, width, height) {
        this.img = img;
        this.width = width;
        this.height = height;
    };
    Adapter.prototype = {
        get: function(i, j) {
            return {
                r: this.img[(i*this.width+j)*4],
                g: this.img[(i*this.width+j)*4 + 1],
                b: this.img[(i*this.width+j)*4 + 2],
                a: this.img[(i*this.width+j)*4 + 3]
            }
        },
        set: function(i, j, value) {
            this.img[(i*this.width+j)*4] = value.r;
            this.img[(i*this.width+j)*4 + 1] = value.g;
            this.img[(i*this.width+j)*4 + 2] = value.b;
            this.img[(i*this.width+j)*4 + 3] = value.a;
        }
    };
    return Adapter;
})
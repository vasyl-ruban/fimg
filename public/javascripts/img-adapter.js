define([], function() {

    var Adapter = function(img, width, height) {
        this.img = img;
        this.width = width;
        this.height = height;
    };

    Adapter.prototype = {

        get: function(i, j) {
            if (typeof this.img.data[(i*this.width+j)*4] === 'undefined') {
                return null;
            }
            return {
                r: this.img.data[(i*this.width+j)*4],
                g: this.img.data[(i*this.width+j)*4 + 1],
                b: this.img.data[(i*this.width+j)*4 + 2],
                a: this.img.data[(i*this.width+j)*4 + 3]
            }
        },

        set: function(i, j, value) {
            this.img.data[(i*this.width+j)*4] = value.r;
            this.img.data[(i*this.width+j)*4 + 1] = value.g;
            this.img.data[(i*this.width+j)*4 + 2] = value.b;
            this.img.data[(i*this.width+j)*4 + 3] = value.a;
        },

        length: function() {
           return this.width*this.height;
        }

    };

    return Adapter;

})
var AdapterShared = function() {

    this.get = function(i, j) {
        if (typeof this.img.data[(i*this.width+j)*4] === 'undefined') {
            return null;
        }
        return {
            r: this.img.data[(i*this.width+j)*4],
            g: this.img.data[(i*this.width+j)*4 + 1],
            b: this.img.data[(i*this.width+j)*4 + 2],
            a: this.img.data[(i*this.width+j)*4 + 3]
        }
    };

    this.set = function(i, j, value) {
        this.img.data[(i*this.width+j)*4] = value.r;
        this.img.data[(i*this.width+j)*4 + 1] = value.g;
        this.img.data[(i*this.width+j)*4 + 2] = value.b;
        this.img.data[(i*this.width+j)*4 + 3] = value.a;
    };

    this.length = function() {
        return this.width*this.height;
    };

};
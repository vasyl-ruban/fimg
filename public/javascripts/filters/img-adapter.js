/*
 * constructor for adapter which provides simple interface for imageData
 * instead of linear array in which each pixel present as 4 sell
 * you'll have 2d matrix in which each sell will be object like:
 * {r: <value>, g: <value>, b: <value>, a: <value>}
 * @param {object} img
 * @param {number} width
 * @param {number} height
 */
var Adapter = function(img, width, height) {
    this.img = img;
    this.width = width;
    this.height = height;
};

Adapter.prototype = {

    /*
     * getter for i,j element
     * @param {number} i
     * @param {number} j
     * @return {object}
     */
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

    /*
     * setter for i,j element
     * it will place {object} value in tho sell
     * @param {number} i
     * @param {number} j
     * @param {object} value
     */
    set: function(i, j, value) {
        this.img.data[(i*this.width+j)*4] = value.r;
        this.img.data[(i*this.width+j)*4 + 1] = value.g;
        this.img.data[(i*this.width+j)*4 + 2] = value.b;
        this.img.data[(i*this.width+j)*4 + 3] = value.a;
    },

    /*
     * return length of this array
     * @return {number}
     */
    length: function() {
        return this.width*this.height;
    }

}
/*
 * noise filter constructor
 * @param {object} img
 * @param {number} filterLength
 * @param {object} sandbox
 */
var Noise = function(img, filterLength, sandbox) {

    // extend current filter by aggregation base filter
    Filter.call(this, img, filterLength, sandbox);

};

// extend current filter with function's from base filter
Noise.prototype = new Filter;

/*
 * compute value for result pixel's RGBA in i,j coordinates
 * @param {number} i
 * @param {number} j
 * @return {object} resultPixel
 */
Noise.prototype.getPixelValue = function(i, j) {
    var currentPx;
    currentPx = this.adaptedImg.get(i, j);
    return {
        r: currentPx.r+this.getRandomDeviation(),
        g: currentPx.g+this.getRandomDeviation(),
        b: currentPx.b+this.getRandomDeviation(),
        a: 255
    }
};

/*
 * return random deviation for pixel. Depend on current filter length
 * @return {number}
 */
Noise.prototype.getRandomDeviation = function() {
    return (Math.random() - 0.5) * 5 * this.filterIteration;

};
/*
 * median filter constructor
 * @param {object} img
 * @param {number} filterLength
 * @param {object} sandbox
 */
var Median = function(img, filterLength, sandbox) {

    // extend current filter by aggregation base filter
    Filter.call(this, img, filterLength, sandbox);
    this.filterLength = filterLength;
};

// extend current filter with function's from base filter
Median.prototype = new Filter;

/*
 * compute value for result pixel's RGBA in i,j coordinates
 * @param {number} i
 * @param {number} j
 * @return {object} resultPixel
 */
Median.prototype.getPixelValue = function(i, j) {
    var k, l, tempR = [], tempG = [], tempB = [], r, g, b, currentPx;
    var sortFunction = function(a, b) {
        return a-b;
    };
    for (k=-this.filterLength;k<=this.filterLength;k++) {
        for (l=-this.filterLength;l<=this.filterLength;l++) {
            currentPx = this.adaptedImg.get(i+k,j+l);
            if (currentPx) {
                tempR.push(this.adaptedImg.get(i+k,j+l).r);
                tempG.push(this.adaptedImg.get(i+k,j+l).g);
                tempB.push(this.adaptedImg.get(i+k,j+l).b);
            }
        }
    }
    r = tempR.sort(sortFunction)[Math.floor(tempR.length/2)];
    g = tempG.sort(sortFunction)[Math.floor(tempG.length/2)];
    b = tempB.sort(sortFunction)[Math.floor(tempB.length/2)];
    return {
        r: r,
        g: g,
        b: b,
        a: 255
    };
};
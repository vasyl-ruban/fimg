var Noise = function(img, filterLength, sandbox) {

    Filter.call(this, img, filterLength, sandbox);

};

Noise.prototype =new Filter;

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

Noise.prototype.getRandomDeviation = function() {
    return (Math.random() - 0.5) * 5 * this.filterIteration;

};
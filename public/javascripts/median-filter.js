var Median = function(img, filterLength) {
    this.adaptedImg = new Adapter(img.img, img.width, img.height);
    this.filteredAdaptedImg = new Adapter({data:[], width: img.width, height: img.height}, img.width, img.height);
    this.filterLength = filterLength;
};

Median.prototype = {

    compute: function(from, to) {
        var i, j;
        for (i=from;i<to;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
        }
    },

    getPixelValue: function(i, j) {
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
    }

};
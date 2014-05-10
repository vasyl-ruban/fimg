/*
 * gaussian filter constructor
 * @param {object} img
 * @param {number} filterLength
 * @param {object} sandbox
 */
var Gaussian = function(img, filterLength, sandbox) {

    // extend current filter by aggregation base filter
    Filter.call(this, img, filterLength, sandbox);

    this.filterMatrix = [];

    this.fillFilterMatrix();
    this.normalizeFilterMatrix();

};

// extend current filter with function's from base filter
Gaussian.prototype = new Filter;

/*
 * override generalized computing function due to another filter computing logic
 * @param {number} from
 * @param {number} to
 */
Gaussian.prototype.compute = function(from, to) {
    var i, j, k;
    for (k=0; k<this.filterIteration; k++) {
        for (i=from-10;i<to+10;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
            this.sandbox
                .publish('progress', {value: (((i-from)/((to-from)*this.filterIteration))+(k/this.filterIteration))*100});
        }
        this.adaptedImg = new Adapter(this.filteredAdaptedImg.img, this.filteredAdaptedImg.width, this.filteredAdaptedImg.height);
    }
};

/*
 * return value of 2d gaussian function
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
Gaussian.prototype.getFilterValue =  function(x, y) {
    var sigma = 10;
    return (1/(2*Math.PI*sigma*sigma)) * Math.exp(-((x*x+y*y)/(2*sigma*sigma)));
};

/*
 * fill matrix with result of gaussian function
 */
Gaussian.prototype.fillFilterMatrix = function() {
    var i, j;
    for (i=-this.filterLength;i<=this.filterLength;i++) {
        if (!this.filterMatrix[i]) {
            this.filterMatrix[i] = [];
        }
        for (j=-this.filterLength;j<=this.filterLength;j++) {
            this.filterMatrix[i][j] = this.getFilterValue(i, j);
        }
    }
};

/*
 * normalize matrix
 */
Gaussian.prototype.normalizeFilterMatrix = function() {
    var i, j, totalVal = 0;
    for (i=-this.filterLength; i<=this.filterLength; i++) {
        for (j=-this.filterLength; j<=this.filterLength; j++) {
            totalVal += this.filterMatrix[i][j];
        }
    }
    for (i=-this.filterLength; i<=this.filterLength; i++) {
        for (j=-this.filterLength; j<=this.filterLength; j++) {
            this.filterMatrix[i][j] = this.filterMatrix[i][j]/totalVal;
        }
    }
};

/*
 * multiple i,j pixel on coefficient
 * @param {number} i
 * @param {number} j
 * @param {number} coefficient
 * @return {object}
 */
Gaussian.prototype.getValue = function(i, j, coefficient) {
    var pixVal = this.adaptedImg.get(i, j)
        , pixValRes = {};
    if (!pixVal) {
        return null;
    }
    pixValRes.r = pixVal.r*coefficient;
    pixValRes.g = pixVal.g*coefficient;
    pixValRes.b = pixVal.b*coefficient;
    pixValRes.a = pixVal.a*coefficient;
    return pixValRes;
};

/*
 * compute i,j pixel value
 * @param {number} i
 * @param {number} j
 * @return {object}
 */
Gaussian.prototype.getPixelValue = function(i,j) {
    var k
        , l
        , r = 0
        , g = 0
        , b = 0
        , a = 0
        , temp = [];
    for (k=-this.filterLength; k<=this.filterLength; k++) {
        for (l=-this.filterLength; l<=this.filterLength; l++) {
            temp.push(this.getValue(i+k,j+l,this.filterMatrix[k][l]));
        }
    }
    for (i=0;i<temp.length;i++) {
        if (!temp[i]) {
            continue;
        }
        r += temp[i].r;
        g += temp[i].g;
        b += temp[i].b;
        a += temp[i].a;
    }
    return {
        r: r,
        g: g,
        b: b,
        a: 255
    };
};
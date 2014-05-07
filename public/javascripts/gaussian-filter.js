define(['jquery', 'base-filter'], function($, BaseFilter) {
    var Gaussian = function() {
        this.filterName = 'gaussian';
        this.filterFullName = 'Gaussian blur';
        this.scaleRange = {
            min:0,
            max:10,
            step: 1
        };
        this.filteredImg = [];
        this.filterMatrix = [];
        this.filterLength = 0;
        this.init();
        this.subscribeToEvents();
    };
    Gaussian.prototype = new BaseFilter;
    Gaussian.prototype.constructor = Gaussian;
    Gaussian.prototype.sliderChangeHandler = function(e, ui) {
        var value = ui.value
            , currentVal
            , i, j, r, g, b, a;
        this.fillFilterMatrix();
        this.normalizeFilterMatrix();
        console.log(this.filterMatrix);
        for (i=0;i<this.adaptedImg.height;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
        }
        this.sandbox.publish('renderArrayImg', {img: this.filteredAdaptedImg.img});
    };
    Gaussian.prototype.getFilterValue = function(x, y) {
        var sigma = 10;
        return (1/(2*Math.PI*sigma*sigma)) * Math.exp(-((x*x+y*y)/(2*sigma*sigma)));
    };
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

    return new Gaussian;
});
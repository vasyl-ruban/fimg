var SharedGaussian = function() {

    this.compute = function(from, to) {
        var i,j;
        this.fillFilterMatrix();
        this.normalizeFilterMatrix();
        for (i=from;i<to;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
        }
    };

    this.getFilterValue = function(x, y) {
        var sigma = 10;
        return (1/(2*Math.PI*sigma*sigma)) * Math.exp(-((x*x+y*y)/(2*sigma*sigma)));
    };

    this.fillFilterMatrix = function() {
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

    this.normalizeFilterMatrix = function() {
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

    this.getValue = function(i, j, coefficient) {
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

    this.getPixelValue = function(i,j) {
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
};
define(['jquery', 'mediator', 'base-filter'], function($, sandbox, BaseFilter) {
    var Gaussian = function() {
        this.sandbox = sandbox;
        this.filterName = 'gaussian';
        this.filterFullName = 'Gaussian blur';
        this.scaleRange = {
            min:0,
            max:10,
            step: 1
        };
        this.filteredImg = [];
        this.filterMatrix = [];
        this.init();
        this.subscribeToEvents();
    };
    Gaussian.prototype = new BaseFilter;
    Gaussian.prototype.constructor = Gaussian;
    Gaussian.prototype.sliderChangeHandler = function(e, ui) {
        var value = ui.value
            , i, r, g, b, a;
        this.fillFilterMatrix(value);
        console.log(this.filterMatrix);
//        for (i=0; i<10;i+=4) {
//            r = this.imgData[i];
//            g = this.imgData[i + 1];
//            b = this.imgData[i + 2];
//            a = this.imgData[i + 3]
//        }
    };
    Gaussian.prototype.getValue = function(x, y) {
        var sigma = 1.5;
        return (1/(2*Math.PI*sigma*sigma)) * Math.exp(-((x*x+y*y)/(2*sigma*sigma)));
    };
    Gaussian.prototype.fillFilterMatrix = function(value) {
        var i, j;
        for (i=-value;i<=value;i++) {
            if (!this.filterMatrix[i]) {
                this.filterMatrix[i] = [];
            }
            for (j=-value;j<=value;j++) {
                this.filterMatrix[i][j] = this.getValue(i, j);
            }
        }
    };

    return new Gaussian;
});
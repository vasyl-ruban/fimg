define(['base-filter', 'shared-gaussian', 'img-adapter-shared'], function(BaseFilter, SharedGaussian, AdapterShared) {

    var Gaussian = function() {
        SharedGaussian.call(this);
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

    var gaussian = new Gaussian;

    return gaussian;

});
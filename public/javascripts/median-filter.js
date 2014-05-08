define(['base-filter', 'shared-median'], function(BaseFilter, SharedMedian) {

    var Median = function() {
        SharedMedian.call(this);
        this.filterName = 'median';
        this.filterFullName = 'Median filter';
        this.scaleRange = {
            min: 0,
            max: 10,
            step: 1
        };
        this.filteredImg = [];

        this.init();
        this.subscribeToEvents();
    };

    Median.prototype = new BaseFilter;
    Median.prototype.constructor = Median;

    return new Median;

});
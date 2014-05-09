define(['base-filter', 'shared-median'], function(BaseFilter, SharedMedian) {

    var Median = function() {
        SharedMedian.call(this);
        this.filterName = 'median';
        this.filterFullName = 'Median filter';

        this.init();
        this.subscribeToEvents();
    };

//    Median.prototype = new BaseFilter;
//    Median.prototype.constructor = Median;

//    return new Median;

});
define(['jquery', 'mediator', 'base-filter'], function($, sandbox, BaseFilter) {
    var Gaussian = function() {
        this.filterName = 'gaussian';
        this.filterFullName = 'Gaussian blur';
        this.init();
    };
    Gaussian.prototype = new BaseFilter;
    Gaussian.prototype.constructor = Gaussian;

    return new Gaussian;
});
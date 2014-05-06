define(['jquery', 'mediator'], function($, sandbox) {
    var BaseFilter = function() {
        this.$filtersControlHolder = $('.left-side');
        this.filterName = '';
    };
    BaseFilter.prototype = {
        init: function() {
            if (this.filterName === '') {
                return false;
            }
            this.$filtersControlHolder.append(
                '<div><div class="filter-name">' + this.filterFullName + '</div><div class="filter" id="' + this.filterName + '"></div></div>'
            );
            $('#' + this.filterName).slider();
        }
    };
    return BaseFilter;
});

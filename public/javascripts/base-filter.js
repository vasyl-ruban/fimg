define(['jquery', 'mediator', 'img-adapter'], function($, sandbox, Adapter) {

    var BaseFilter = function() {
        this.sandbox = sandbox;
        this.$filtersControlHolder = $('.left-side');
        this.filterName = '';
        this.imgData;
        this.adaptedImg;
        this.filteredAdaptedImg;
        this.filterLength;
        this.scaleRange = {
            min: 0,
            max: 100,
            step: 5
        };
    };

    BaseFilter.prototype = {

        init: function() {
            if (this.filterName === '') {
                return false;
            }
            this.$filtersControlHolder.append(
                '<div><div class="filter-name">' + this.filterFullName + ': <span id="filter-value-' + this.filterName + '">0</span></span></div><div class="filter" id="' + this.filterName + '"></div></div>'
            );
            $('#' + this.filterName).slider({
                min: this.scaleRange.min,
                max: this.scaleRange.max,
                step: this.scaleRange.step,
                change: this.beforeSliderChangeHandler.bind(this)
//                slide: this.beforeSliderChangeHandler.bind(this)
            });
        },

        subscribeToEvents: function() {
            this.sandbox
                .subscribe('saveOriginalImg', this, this.saveOriginImg);
        },

        beforeSliderChangeHandler: function(e, ui) {
            $('#filter-value-' + this.filterName).html(ui.value);
            this.filterLength = ui.value;
            this.sliderChangeHandler(e, ui);
        },

        saveOriginImg: function(e) {
            this.imgData = e.img;
            this.adaptedImg = new Adapter(e.img, e.width, e.height);
            this.filteredAdaptedImg = new Adapter(e.ctx.createImageData(e.width, e.height), e.width, e.height);
        }

    };

    return BaseFilter;

});

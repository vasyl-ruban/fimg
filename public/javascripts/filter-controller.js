define(['jquery', 'mediator', 'img-adapter'], function($, sandbox, Adapter) {

    var BaseFilter = function() {
        this.sandbox = sandbox;
        this.$filtersControlHolder = $('.left-side');

        this.filters = [
            {
                name: 'gaussian',
                fullName: 'Gaussian blur'
            },
            {
                name: 'median',
                fullName: 'Median filter'
            }
        ];

        this.adaptedImg;
        this.filteredAdaptedImg;
        this.filterLength;

        this.workersResults = [];
        this.workers = [];
        this.workerCount = 2;
        this.workerScriptName = '/javascripts/worker.js';

        this.scaleRange = {
            min: 0,
            max: 10,
            step: 1
        };

        this.init();
        this.subscribeToEvents();
    };

    BaseFilter.prototype = {

        init: function() {
            var i;
            for (i=0; i<this.filters.length; i++) {

                this.$filtersControlHolder.append(
                    '<div><div class="filter-name">' + this.filters[i].fullName + ': <span id="filter-value-' + this.filters[i].name + '">0</span></span></div><div class="filter" id="' + this.filters[i].name + '"></div></div>'
                );
                $('#' + this.filters[i].name).slider({
                    min: this.scaleRange.min,
                    max: this.scaleRange.max,
                    step: this.scaleRange.step,
                    change: this.sliderChangeHandler.bind(this, this.filters[i].name)
                });
            }
        },

        subscribeToEvents: function() {
            this.sandbox
                .subscribe('saveOriginalImg', this, this.saveOriginImg);
        },

        sliderChangeHandler: function(filterName, e, ui) {
            var value = ui.value
                , workerHeight = this.adaptedImg.height/this.workerCount
                , i;
            $('#filter-value-' + filterName).html(ui.value);
            this.filterLength = ui.value;

            for (i=0; i<this.workerCount; i++) {
                if (!this.workers[i]) {
                    this.workers[i] = new Worker(this.workerScriptName);
                    this.workers[i].addEventListener('message', this.workerFinishHandler.bind(this));
                }
                this.workers[i].postMessage(JSON.stringify({
                    img: this.adaptedImg,
                    from: workerHeight*i,
                    to: workerHeight*(i+1),
                    filterName: filterName,
                    filterLength: this.filterLength
                }));
            }

        },

        workerFinishHandler: function(e) {
            var i
                , currentResult
                , data = JSON.parse(e.data);
            this.workersResults.push(data);
            if (this.workersResults.length == this.workerCount) {
                this.workersResults.sort(function(a,b) {
                    return a.from - b.from;
                });
                for (i=0; i< this.workerCount; i++) {
                    currentResult = this.workersResults[i];
                    this.sandbox
                        .publish('renderArrayImg', {
                            img: currentResult.img.img,
                            from: currentResult.from,
                            to: currentResult.to
                        });
                }
                this.workersResults = [];
            }
        },

        saveOriginImg: function(e) {
            this.adaptedImg = new Adapter(e.img, e.width, e.height);
            this.filteredAdaptedImg = new Adapter(e.ctx.createImageData(e.width, e.height), e.width, e.height);
        }

    };

    return new BaseFilter;

});

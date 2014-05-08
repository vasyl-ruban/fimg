define(['jquery', 'mediator', 'img-adapter'], function($, sandbox, Adapter) {

    var BaseFilter = function() {
        this.sandbox = sandbox;
        this.$filtersControlHolder = $('.left-side');
        this.filterName = '';
        this.imgData;
        this.adaptedImg;
        this.filteredAdaptedImg;
        this.filterLength;

        this.workersResults = [];
        this.workers = [];
        this.workerCount = 2;
        this.workerScriptName = '/javascripts/worker.js';

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
                change: this.sliderChangeHandler.bind(this)
//                slide: this.beforeSliderChangeHandler.bind(this)
            });
        },

        subscribeToEvents: function() {
            this.sandbox
                .subscribe('saveOriginalImg', this, this.saveOriginImg);
        },

        sliderChangeHandler: function(e, ui) {
            var value = ui.value
                , currentWorker
                , workerHeight = this.adaptedImg.height/this.workerCount
                , i;

            $('#filter-value-' + this.filterName).html(ui.value);
            this.filterLength = ui.value;

            for (i=0; i<this.workerCount; i++) {
                if (!this.workers[i]) {
                    this.workers[i] = new Worker(this.workerScriptName);
                    this.workers[i].addEventListener('message', this.workerFinishHandler.bind(this));
                }
                this.workers[i].postMessage(JSON.stringify({
                    filter: this,
                    from: workerHeight*i,
                    to: workerHeight*(i+1)
                }));
            }

        },

        workerFinishHandler: function(e) {
            var i, j, k
                , currentResult
                , data = JSON.parse(e.data);
            this.workersResults.push(data);
            if (this.workersResults.length == this.workerCount) {
                this.workersResults.sort(function(a,b) {
                    return a.from - b.from;
                });
                for (k=0; k< this.workerCount; k++) {
                    currentResult = this.workersResults[k];
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
            this.imgData = e.img;
            this.adaptedImg = new Adapter(e.img, e.width, e.height);
            this.filteredAdaptedImg = new Adapter(e.ctx.createImageData(e.width, e.height), e.width, e.height);
        }

    };

    return BaseFilter;

});

define(['jquery', 'mediator', 'filters/img-adapter'], function($, sandbox, Adapter) {

    var FilterController = function() {
        this.sandbox = sandbox;
        this.$filtersControlHolder = $('.left-side');

        this.filters = {
            'gaussian': {
                name: 'gaussian',
                fullName: 'Gaussian blur'
            },
            'median': {
                name: 'median',
                fullName: 'Median filter'
            },
            'noise': {
                name: 'noise',
                fullName: 'Noise filter'
            }
        };

        this.adaptedImg = {};
        this.filteredAdaptedImg = {};
        this.filterLength = {};

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

    FilterController.prototype = {

        init: function() {
            var i;
            for (i in this.filters) {
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
                    this.workers[i].value = 0;
                    this.workers[i].addEventListener('message', this.workerMessageHandler.bind(this));
                }
                this.workers[i].postMessage(JSON.stringify({
                    img: this.adaptedImg,
                    from: workerHeight*i,
                    to: workerHeight*(i+1),
                    filterName: filterName,
                    filterLength: this.filterLength,
                    workerIndex: i
                }));
            }

        },

        workerMessageHandler: function(e) {
            var i, val = 0
                , data = JSON.parse(e.data);
            if (data.message == 'loaderChange') {
                this.workers[data.workerIndex].value = data.value/this.workerCount;

                for (i=0; i<this.workerCount; i++) {
                    val += this.workers[i].value;
                }
                this.sandbox
                    .publish('loaderChanged', {value: val});

            } else {
                this.workerFinishHandler(data);
            }
        },

        workerFinishHandler: function(data) {
            var i
                , currentResult;
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

    return new FilterController;

});

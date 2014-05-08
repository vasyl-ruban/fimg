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

        this.workersResults = [];
        this.workers = [];
        this.workerCount = 2;
        this.workerScriptName = '/javascripts/gaussian-worker.js';

        this.init();
        this.subscribeToEvents();
    };

    Gaussian.prototype = new BaseFilter;
    Gaussian.prototype.constructor = Gaussian;

    Gaussian.prototype.sliderChangeHandler = function(e, ui) {
        var value = ui.value
            , currentWorker
            , workerHeight = this.adaptedImg.height/this.workerCount
            , i;

        for (i=0; i<this.workerCount; i++) {
            if (!this.workers[i]) {
                this.workers[i] = new Worker(this.workerScriptName);
                this.workers[i].addEventListener('message', this.workerFinishHandler.bind(this));
            }
            this.workers[i].postMessage(JSON.stringify({
                gaussian: this,
                from: workerHeight*i,
                to: workerHeight*(i+1)
            }));
        }
    };

    Gaussian.prototype.workerFinishHandler = function(e) {
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
    };

    var gaussian = new Gaussian;

    return gaussian;

});
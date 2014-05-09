importScripts('/javascripts/mediator.js');
importScripts('/javascripts/filters/img-adapter.js');
importScripts('/javascripts/filters/base-filter.js');
importScripts('/javascripts/filters/gaussian-filter.js');
importScripts('/javascripts/filters/median-filter.js');
importScripts('/javascripts/filters/noise-filter.js');

addEventListener('message', function(e) {

    var data = JSON.parse(e.data)
        , sandbox = new Mediator
        , filter
        , img = data.img
        , from = data.from
        , to = data.to
        , filterName = data.filterName
        , filterLength = data.filterLength
        , workerIndex = data.workerIndex;

    sandbox.subscribe('progress', this, function(options) {
        self.postMessage(JSON.stringify({
            message: 'loaderChange',
            value: options.value,
            workerIndex: workerIndex
        }));
    });



    if (filterName == 'gaussian') {
        filter = new Gaussian(img, filterLength, sandbox);
    } else if (filterName == 'median') {
        filter = new Median(img, filterLength, sandbox);
    } else if (filterName == 'noise') {
        filter = new Noise(img, filterLength, sandbox);
    }

    filter.compute(from, to);

    self.postMessage(JSON.stringify({
        img: filter.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
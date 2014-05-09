importScripts('/javascripts/mediator.js');
importScripts('/javascripts/img-adapter.js');
importScripts('/javascripts/base-filter.js');
importScripts('/javascripts/gaussian-filter.js');
importScripts('/javascripts/median-filter.js');

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
    }

    filter.compute(from, to);

    self.postMessage(JSON.stringify({
        img: filter.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
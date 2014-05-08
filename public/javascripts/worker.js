importScripts('/javascripts/shared-gaussian.js');
importScripts('/javascripts/shared-median.js');
importScripts('/javascripts/img-adapter-shared.js');

addEventListener('message', function(e) {
    var data = JSON.parse(e.data)
        , filter = data.filter
        , from = data.from
        , to = data.to;

    if (filter.filterName == 'gaussian') {
        SharedGaussian.call(filter);
    }else if (filter.filterName == 'median') {
        SharedMedian.call(filter);
    }

    AdapterShared.call(filter.adaptedImg);
    AdapterShared.call(filter.filteredAdaptedImg);

    filter.compute(from, to);

    self.postMessage(JSON.stringify({
        img: filter.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
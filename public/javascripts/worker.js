importScripts('/javascripts/gaussian-filter.js');
importScripts('/javascripts/shared-median.js');
importScripts('/javascripts/img-adapter.js');

addEventListener('message', function(e) {
    var data = JSON.parse(e.data)
        , filter
        , img = data.img
        , from = data.from
        , to = data.to
        , filterName = data.filterName
        , filterLength = data.filterLength;

    if (filterName == 'gaussian') {
        filter = new Gaussian(img, filterLength);
//        SharedGaussian.call(filter);
    }else if (filterName == 'median') {
//        SharedMedian.call(filter);
    }

//    AdapterShared.call(filter.adaptedImg);
//    AdapterShared.call(filter.filteredAdaptedImg);

    filter.compute(from, to);

    self.postMessage(JSON.stringify({
        img: filter.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
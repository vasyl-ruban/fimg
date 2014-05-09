importScripts('/javascripts/gaussian-filter.js');
importScripts('/javascripts/median-filter.js');
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
    }else if (filterName == 'median') {
        filter = new Median(img, filterLength);
    }

    filter.compute(from, to);

    self.postMessage(JSON.stringify({
        img: filter.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
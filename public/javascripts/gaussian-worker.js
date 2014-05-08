importScripts('/javascripts/shared-gaussian.js');
importScripts('/javascripts/img-adapter-shared.js');

addEventListener('message', function(e) {
    var data = JSON.parse(e.data)
        , gaussian = data.gaussian
        , from = data.from
        , to = data.to;

    SharedGaussian.call(gaussian);
    AdapterShared.call(gaussian.adaptedImg);
    AdapterShared.call(gaussian.filteredAdaptedImg);

    gaussian.compute(from, to);

    self.postMessage(JSON.stringify({
        img: gaussian.filteredAdaptedImg,
        from: from,
        to: to
    }));

}, false);
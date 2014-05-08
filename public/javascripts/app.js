requirejs.config({
    baseUrl: '/javascripts/',
    paths: {
        jquery: '//code.jquery.com/jquery-1.10.2',
        jqueryUI: '//code.jquery.com/ui/1.10.4/jquery-ui'
    },
    shim: {

        'shared-gaussian': {
            exports: 'SharedGaussian',
            init: function() {
                return SharedGaussian;
            }
        },

        'shared-median': {
            exports: 'SharedMedian',
            init: function() {
                return SharedMedian;
            }
        },

        'img-adapter-shared': {
            exports: 'AdapterShared',
            init: function() {
                return AdapterShared;
            }
        }

    }
});

requirejs([
    'jquery', 'mediator',
    'dom-controller', 'canvas',
    'jqueryUI', 'gaussian-filter',
    'median-filter'
],
function($, sandbox) {

});
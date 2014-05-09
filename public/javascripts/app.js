requirejs.config({
    baseUrl: '/javascripts/',
    paths: {
        jquery: '//code.jquery.com/jquery-1.10.2',
        jqueryUI: '//code.jquery.com/ui/1.10.4/jquery-ui'
    },
    shim: {

        'gaussian-filter': {
            deps: ['img-adapter'],
            exports: 'Gaussian',
            init: function() {
                return Gaussian;
            }
        },

        'shared-median': {
            exports: 'SharedMedian',
            init: function() {
                return SharedMedian;
            }
        },

        'img-adapter': {
            exports: 'Adapter',
            init: function() {
                return Adapter;
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
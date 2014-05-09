requirejs.config({
    baseUrl: '/javascripts/',
    paths: {
        jquery: '//code.jquery.com/jquery-1.10.2',
        jqueryUI: '//code.jquery.com/ui/1.10.4/jquery-ui'
    },
    shim: {

        'mediator': {
            exports: 'mediator',
            init: function() {
                return new Mediator();
            }
        },

        'filters/gaussian-filter': {
            deps: ['img-adapter', 'base-filter'],
            exports: 'Gaussian',
            init: function() {
                return Gaussian;
            }
        },

        'filters/median-filter': {
            daps: ['img-adapter', 'base-filter'],
            exports: 'Median',
            init: function() {
                return Median;
            }
        },

        'filters/noise-filter': {
            daps: ['img-adapter', 'base-filter'],
            exports: 'Median',
            init: function() {
                return Noise;
            }
        },

        'filters/img-adapter': {
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
    'jqueryUI', 'filter-controller'
],
function($, sandbox) {

});
requirejs.config({
    baseUrl: '/javascripts/',
    paths: {
        jquery: '//code.jquery.com/jquery-1.10.2',
        jqueryUI: '//code.jquery.com/ui/1.10.4/jquery-ui'
    }
});

requirejs(['jquery', 'mediator', 'dom-controller', 'canvas', 'jqueryUI', 'gaussian-filter'],
function($, sandbox) {

});
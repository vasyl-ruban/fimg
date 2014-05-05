console.log('a');

requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs(['jquery', 'mediator'],
function($, sandbox) {
    console.log(sandbox);
    console.log('as');
    console.log($);
});
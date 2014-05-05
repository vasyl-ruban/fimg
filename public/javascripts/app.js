console.log('a');

requirejs.config({
    baseUrl: '/',
    paths: {
       jquery: '/javascripts/jquery'
    }
});

requirejs(['jquery', 'mediator'],
function($, sandbox) {
    console.log(sandbox);
    console.log('as');
    console.log($);
});
define(['jquery', 'mediator'], function($, sandbox) {

    var $canvas = $('html');

    var File = function() {
        this.sandbox = sandbox;
        this.file;
        this.fileContentURL;
        this.fileImg = new Image;
        this.fileImg.onload = this.downloadedFileImgReady.bind(this);
        this.fileReader = new FileReader();
        this.fileReader.onload = this.downloadedFileHandler.bind(this);
    };

    File.prototype = {

        subscribeToEvents: function() {

        },

        fileDragOverHandler: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        fileDropHandler: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.file = e.originalEvent.dataTransfer.files.item(0);
            this.downloadFile();
        },

        downloadFile: function() {
            if (this.file.type.match('image.*')){
                this.fileReader.readAsDataURL(this.file);
            }
        },

        downloadedFileHandler: function(e) {
            this.fileContentURL = e.target.result;
            this.fileImg.src = this.fileContentURL;
        },

        downloadedFileImgReady: function() {
            this.sandbox.publish('renderImg', {img: this.fileImg, type: 'justLoaded'});
        }

    };

    var file = new File;

    $canvas.on('dragover', file.fileDragOverHandler.bind(file));
    $canvas.on('drop', file.fileDropHandler.bind(file));

    return {};

});
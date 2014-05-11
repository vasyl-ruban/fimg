define(['jquery', 'mediator'], function($, sandbox) {

    /*
     * constructor for object which provides drag and drop system
     */
    var File = function() {
        this.sandbox = sandbox;
        this.$holder = $('html');
        this.$dropImageText = $('.canvas-text');
        this.file;
        this.fileContentURL;
        this.fileImg = new Image;
        this.fileReader = new FileReader();
        this.fileReader.onload = this.downloadedFileHandler.bind(this);
        this.init();
    };

    File.prototype = {

        /*
         * bind event handlers
         */
        init: function() {
            this.$holder.on('dragover', this.fileDragOverHandler.bind(this));
            this.$holder.on('drop', this.fileDropHandler.bind(this));
        },

        /*
         * handler for dragOver event
         * @param {object} e
         */
        fileDragOverHandler: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        /*
         * while file drop, start downloading file
         * @param {object} e
         */
        fileDropHandler: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.$dropImageText.css('display', 'none');
            this.file = e.originalEvent.dataTransfer.files.item(0);
            this.downloadFile();
        },

        /*
         * downloading file in it is image file
         */
        downloadFile: function() {
            if (this.file.type.match('image.*')){
                this.fileReader.readAsDataURL(this.file);
            }
        },

        /*
         * handler which run while file downloaded
         * generate event for rendering downloaded image
         * @param {object} e
         */
        downloadedFileHandler: function(e) {
            this.fileContentURL = e.target.result;
            this.fileImg.src = this.fileContentURL;
            this.sandbox.publish('renderImg', {img: this.fileImg, type: 'justLoaded'});
        }

    };

    /*
     * constructor for object which will controlling progress bar
     */
    var ProgressBar = function() {
        this.sandbox = sandbox;
        this.$holder = $('#progress-bar');
        this.bindToEvents();
    };

    ProgressBar.prototype = {

        /*
         * subscribe to events
         */
        bindToEvents: function() {
            this.sandbox
                .subscribe('loaderChanged', this, this.changeValue);
        },

        /*
         * change progress bar value
         * @params {object} options
         */
        changeValue: function(options) {
            var val = options.value;
            this.$holder.css('width', val + '%');
        }
    };

    var progressBar = new ProgressBar;
    var file = new File;



    return {};

});
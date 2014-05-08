define(['img-adapter-shared'], function(AdapterShared) {

    var Adapter = function(img, width, height) {
        AdapterShared.call(this);
        this.img = img;
        this.width = width;
        this.height = height;
    };

    return Adapter;

})
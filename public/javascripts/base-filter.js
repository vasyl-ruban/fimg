var Filter = function(img, filterLength) {

    this.adaptedImg = new Adapter(img.img, img.width, img.height);
    this.filteredAdaptedImg = new Adapter({data:[], width: img.width, height: img.height}, img.width, img.height);
    this.filterLength = filterLength;

};

Filter.prototype = {

    compute: function(from, to) {
        var i,j;
        for (i=from;i<to;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
        }
    }

};
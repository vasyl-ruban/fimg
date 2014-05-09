var Filter = function(img, filterLength) {
    var img = img || {data:[],width:0,height:0}
        , filterLength = filterLength || 0;
    this.adaptedImg = new Adapter(img.img, img.width, img.height);
    this.filteredAdaptedImg = new Adapter({data:[], width: img.width, height: img.height}, img.width, img.height);
    this.filterLength = 1;
    this.filterIteration = filterLength+1;
};

Filter.prototype = {

    compute: function(from, to) {
        var i, j, k;
        for (k=0; k<this.filterIteration; k++) {
            for (i=from;i<to;i++) {
                for (j=0;j<this.adaptedImg.width;j++) {
                    this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
                }
            }
            this.adaptedImg = this.filteredAdaptedImg;
        }
    }

};
var Filter = function(img, filterLength, sandbox) {
    var img = img || {data:[],width:0,height:0}
        , filterLength = filterLength || 0;

    this.sandbox = sandbox;
    this.adaptedImg = new Adapter(img.img, img.width, img.height);
    this.filteredAdaptedImg = new Adapter({data:[], width: img.width, height: img.height}, img.width, img.height);
    this.filterLength = 1;
    this.filterIteration = filterLength;
};

Filter.prototype = {

    originCompute: function(from, to) {

    }

};
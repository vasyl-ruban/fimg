/*
 * provides base constructor for all filters
 * @param {object} img
 * @param {number} filterLength
 * @param {object} sandbox
 */
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

    /*
     * Generalized function for processing filter
     * can be override
     * @param {number} from
     * @param {number} to
     */
    compute: function(from, to) {
        var i, j;
        for (i=from;i<to;i++) {
            for (j=0;j<this.adaptedImg.width;j++) {
                this.filteredAdaptedImg.set(i, j, this.getPixelValue(i, j));
            }
            this.sandbox
                .publish('progress', {value: ((i-from)/(to-from))*100});
        }
    },

    /*
     * compute value for result pixel's RGBA in i,j coordinates
     * should be override
     * @param {number} i
     * @param {number} j
     * @return {object} resultPixel
     */
    getPixelValue: function(i, j) {
        console.log('you should override getPixelValue function');
    }

};
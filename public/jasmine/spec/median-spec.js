/*
 * Tests for median filter
 */
describe('Median filter', function() {

    var img = {
            width: 10,
            height: 10,
            img: {
                data: [],
                width: 10,
                height: 10
            }
        }
        , filterLength = 1
        , i
        , median;

    for (i=0; i<img.width*img.height*4; i++) {
        img.img.data[i] = 10;
    }

    beforeEach(function() {
        median = new Median(img, filterLength, new Mediator);
    });

    it('Filter running', function(){
        var i, j, currentVal;
        median.compute(0, 10);

        for (i=0; i<median.adaptedImg.width; i++) {
            for (j=0; j<median.adaptedImg.height; j++) {
                currentVal = median.getPixelValue(i, j);
                expect(median.filteredAdaptedImg.get(i, j)).toEqual(currentVal);
            }
        }
    });

});
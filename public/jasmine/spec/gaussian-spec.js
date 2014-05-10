/*
 * Tests for gaussian filter
 */
describe('Gaussian blur', function() {

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
        , gaussian
        , gaussian2;

    for (i=0; i<img.width*img.height*4; i++) {
        img.img.data[i] = 10;
    }

    beforeEach(function() {
        gaussian = new Gaussian(img, filterLength, new Mediator);
        gaussian2 = new Gaussian(img, filterLength, new Mediator);
    });

    it('Filter init', function() {
        expect(gaussian.adaptedImg.img.data).toEqual(img.img.data);
        expect(gaussian.adaptedImg.width).toEqual(img.width);
        expect(gaussian.adaptedImg.height).toEqual(img.height);
    });

    it('Filter running', function(){
        var i, j, currentVal;
        gaussian.compute(0, 10);

        for (i=0; i<gaussian.adaptedImg.width; i++) {
            for (j=0; j<gaussian.adaptedImg.height; j++) {
                currentVal = gaussian2.getPixelValue(i, j);
                expect(gaussian.filteredAdaptedImg.get(i, j)).toEqual(currentVal);
            }
        }
    });

});
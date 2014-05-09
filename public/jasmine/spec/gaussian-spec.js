/*
 * Tests for gaussian filter
 */
describe('Gaussian blur', function() {

    var img = {
            width: 5,
            height: 5,
            img: {
                data: [],
                width: 5,
                height: 5
            }
        }
        , filterLength = 1
        , i
        , gaussian;
    /*
     * if compute filter for matrix with all elements equal 10 and length 100
     * we should receive such result
     */
    var resultArray = [
        5.55926852363893,
        5.55926852363893,
        5.55926852363893,
        255,
        6.672226844119735,
        6.672226844119735,
        6.672226844119735,
        255,
        6.672226844119735,
        6.672226844119735,
         6.672226844119735,
         255,
         6.672226844119735,
         6.672226844119735,
         6.672226844119735,
         255,
         7.779634261819465,
         7.779634261819465,
         7.779634261819465,
         255,
         8.89259258230027,
         8.89259258230027,
         8.89259258230027,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         10,
         10,
         10,
         255,
         8.89259258230027,
         8.89259258230027,
         8.89259258230027,
         255,
         7.779634261819466,
         7.779634261819466,
         7.779634261819466,
         255,
         6.672226844119736,
         6.672226844119736,
         6.672226844119736,
         255,
         6.672226844119736,
         6.672226844119736,
         6.672226844119736,
         255,
         6.672226844119736,
         6.672226844119736,
         6.672226844119736,
         255,
         5.559268523638931,
         5.559268523638931,
        5.559268523638931,
        255
    ];

    for (i=0; i<img.width*img.height*4; i++) {
        img.img.data[i] = 10;
    }

    beforeEach(function() {
        gaussian = new Gaussian(img, filterLength);
    });

    it('Filter init', function() {
        expect(gaussian.adaptedImg.img.data).toEqual(img.img.data);
        expect(gaussian.adaptedImg.width).toEqual(img.width);
        expect(gaussian.adaptedImg.height).toEqual(img.height);
    });

    it('Filter running', function(){
        gaussian.compute(0, 5);
        expect(gaussian.filteredAdaptedImg.img.data).toEqual(resultArray);
    });

});
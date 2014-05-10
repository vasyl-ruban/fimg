/*
 * Tests for noise filter
 */
describe('Noise filter', function() {

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
        , noise;

    for (i=0; i<img.width*img.height*4; i++) {
        img.img.data[i] = 10;
    }

    beforeEach(function() {
        noise = new Noise(img, filterLength, new Mediator);
    });

    it('Filter running', function(){
        var i, j
            , avg  = 0
            , avg2 = 0;
        noise.compute(0, 10);

        for (i=0; i<noise.adaptedImg.width; i++) {
            for (j=0; j<noise.adaptedImg.height; j++) {
                avg += noise.filteredAdaptedImg.get(i, j).r;
                avg2 += noise.adaptedImg.get(i, j).r;
            }
        }
        avg  = avg /(noise.adaptedImg.width*noise.adaptedImg.height);
        avg2 = avg2/(noise.adaptedImg.width*noise.adaptedImg.height);
        expect(5 * noise.filterIteration/2).toBeGreaterThan(Math.abs(avg-avg2));
        expect(0).not.toEqual(Math.abs(avg-avg2));
    });

});
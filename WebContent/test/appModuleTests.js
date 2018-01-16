describe('CarComponent', function() {
    var carService;
    beforeEach(function() {

        module('appModule');

        inject(function(_carService_, _$rootScope_, _$httpBackend_) {
            scope = _$rootScope_;
            carService = _carService_;
            $httpBackend = _$httpBackend_;
        });
    });

    describe('smokeTest', function() {
        it('should pass as a smokeTest', function() {
            expect(8).toEqual(4 + 4);
            expect(true).toBe(true);
            expect(false).not.toBe(true);
        });
    });

    describe('car show(id)', function() {
        it('should produce a car', function(done) {
            $httpBackend.when('GET', 'services/cars/1').respond({
                "id": "1",
                "make": "Toyota",
                "model": "Tacoma"
            });
            carService.show(1).then(function(res) {
                expect(res.data.id).toBe("1");
                expect(res.data.make).toBe("Toyota");
                expect(res.data.model).toBe("Tacoma");
                done();
            });
            $httpBackend.flush();
            scope.$digest();
        });
    });
});
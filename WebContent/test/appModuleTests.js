describe('CarComponent', function() {
    beforeEach(module('appModule'));

    describe('smokeTest', function() {
        it('should pass as a smokeTest', function() {
            expect(8).toEqual(4 + 4);
            expect(true).toBe(true);
            expect(false).not.toBe(true);
        });
    });

});
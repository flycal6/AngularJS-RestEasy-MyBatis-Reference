angular.module('appModule')
    .factory('raceDriverService', function($http) {
        var service = {};

        service.addDrivers = function(rid, drivers) {
            return $http({
                method: 'POST',
                url: 'services/race-drivers/' + rid,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: drivers
            });
        };

        service.removeDriver = function(rid, did) {
            console.log('inside raceDriverService.removeDriver');
            return $http({
                method: 'DELETE',
                url: 'services/race-drivers/race/' + rid + '/driver/' + did
            });
        };

        return service;
    });
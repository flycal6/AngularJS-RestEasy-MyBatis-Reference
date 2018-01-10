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

        return service;
    });
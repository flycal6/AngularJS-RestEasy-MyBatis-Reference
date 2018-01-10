angular.module('appModule')
    .factory('raceService', function($http) {
        var service = {};

        service.index = function() {
            return $http({
                method: 'GET',
                url: 'services/races'
            });
        };

        service.show = function(id) {
            return $http({
                method: 'GET',
                url: 'services/races/' + id
            });
        };

        service.create = function(race) {
            return $http({
                method: 'POST',
                url: 'services/races',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: race
            });
        };

        service.update = function(race) {
            return $http({
                method: 'PUT',
                url: 'services/races/' + race.id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: race
            });
        };

        service.destroy = function(id) {
            return $http({
                method: 'DELETE',
                url: 'services/races/delete/' + id
            });
        };
        return service;
    });
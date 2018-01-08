angular.module('appModule')
    .factory('driverService', function($http) {
        var service = {};

        service.index = function() {
            return $http({
                method: 'GET',
                url: 'services/drivers'
            });
        };

        service.show = function(id) {
            return $http({
                method: 'GET',
                url: 'services/drivers/' + id
            });
        };

        service.create = function(driver) {
            return $http({
                method: 'POST',
                url: 'services/drivers',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: driver
            });
        };

        service.update = function(driver) {
            return $http({
                method: 'PUT',
                url: 'services/drivers/' + driver.id,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: driver
            });
        };

        service.destroy = function(id) {
            return $http({
                method: 'DELETE',
                url: 'services/drivers/delete/' + id
            });
        };

        return service;
    });

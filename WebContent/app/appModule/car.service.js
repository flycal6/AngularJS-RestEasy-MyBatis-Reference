angular.module('appModule')
    .factory('carService', function($http) {
        var service = {};

        service.index = function() {
            return $http({
                method: 'GET',
                url: 'services/cars'
            });
        };

        service.show = function(id) {
            return $http({
                method: 'GET',
                url: 'services/cars/' + id
            });
        };

        service.create = function(car) {
            return $http({
                method: 'POST',
                url: 'services/cars',
                headers: {
                    'Content-Type': 'application/json'
                },
				data: car
            });
        };

		service.update = function(car) {
			return $http({
				method: 'PUT',
				url: 'services/cars/' + car.id,
				headers: {
					'Content-Type' : 'application/json'
				},
				data : car
			});
		};

		service.destroy = function(id) {
			return $http({
				method: 'DELETE',
				url: 'services/cars/delete/' + id
			});
		};

        return service;
    });

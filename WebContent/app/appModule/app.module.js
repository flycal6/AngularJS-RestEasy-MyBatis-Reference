angular.module('appModule', ['ngRoute']).config(
    function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<home></home>'
            })
            .when('/cars', {
                template: '<car></car>'
            })
            .when('/drivers', {
                template: '<driver></driver>'
            })
            .when('/races', {
                template: '<race></race>'
            })
            .otherwise({
                template: '<not-found></not-found>'
            });
    }
);
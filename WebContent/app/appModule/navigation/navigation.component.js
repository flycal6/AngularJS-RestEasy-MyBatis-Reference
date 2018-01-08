angular.module('appModule').component('navigation', {
	templateUrl: 'app/appModule/navigation/navigation.component.html',
	controller: function($location, $rootScope){
		var vm = this;

		/********* View All Cars *********************/
		vm.viewAllCars = function(){
			$location.path('/cars');
			$rootScope.$broadcast('showAll');
		};

		/********* View All Drivers *********************/
		vm.viewAllDrivers = function(){
			$location.path('/drivers');
			$rootScope.$broadcast('showAllDrivers');
		};

		vm.goHome = function(){
			$location.path('/');
		};
	},
	controllerAs: 'vm'
});

angular.module('appModule').component('home', {
	templateUrl: 'app/appModule/home/home.component.html',
	controller: function($location){
		var vm = this;
		
		vm.viewCarOne = function(){
			$location.path('/cars/1');
		};
	},
	controllerAs: 'vm'
});
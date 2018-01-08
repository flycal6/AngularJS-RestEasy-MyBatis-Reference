angular.module('appModule').component('car', {
    templateUrl: 'app/appModule/car/car.component.html',
    controller: function(carService, $location, $scope) {
        var vm = this;
        vm.cars = [];
        vm.selected = null;
		vm.updating = null;

        /************ View Cars / Refresh ****************/
        var reload = function() {
            vm.selected = null;
            carService.index().then(function(res) {
                    vm.cars = res.data;
                    console.log(vm.cars);
                })
                .catch(function(err) {
                    console.log('carService.index() failed');
                    console.log(err);
                });
        };

        reload();

		/**************** insert a new car ******************/
		vm.createCar = function(newCar) {
			carService.create(newCar).then(function(res){
				newCar.id = res.data;
				vm.cars.push(newCar);
			})
			.catch(function(err){
				console.log('car creation failed');
				console.log(err);
			});
		};

		/*************** view selected car *****************/
        vm.show = function(id) {
            carService.show(id).then(function(res) {
                    // $location.path('/cars/' + id);
                    vm.selected = res.data;
                })
                .catch(function(err) {
                    console.log('carService.show(id) failed');
                    console.log(err);
                });
        };

		/*************** update selected car ******************/
		vm.update = function(){
			vm.updating = true;
		}

		vm.updateCar = function(updateCar) {
			carService.update(updateCar).then(function(res){
				console.log('car updated');
                /*************************************************************************
				The next ~10 lines are to populate the existing array and eliminate the
                need to hit the database again.  If concurrent user access will exist,
                this should probably be replaced with a reload()
				*************************************************************************/
				var spliceIndex;
				vm.cars.forEach(function(car, idx) {
					if (car.id == updateCar.id) {
						spliceIndex = idx;
					}
				});
				vm.cars.splice(spliceIndex, 1);
				vm.cars.splice(spliceIndex, 0, updateCar);
			})
			.catch(function(err) {
				console.log(err);
			})
			.finally(function(){
				vm.updating = false;
				vm.selected = null;
			});
		};

		/*************** Delete selected car **************************/
		vm.deleteCar = function(id) {
			carService.destroy(id).then(function(res){
				for (var i = 0; i < vm.cars.length; i++) {
					if (vm.cars[i].id == id) {
						vm.cars.splice(i, 1);
					}
				}
			})
			.catch(function(err){
				console.log(err);
			})
			.finally(function(){
				vm.selected = null;
			});
		};
		/********************** return to index view ******************
		This is used instead of $location.path to prevent page reload.
		The tradeoff is an unchanging templateUrl
		***************************************************************/

		$scope.$on('showAll', function(){
			vm.selected = null;
		});
    },
    controllerAs: 'vm'
});

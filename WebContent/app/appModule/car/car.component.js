angular.module('appModule').component('car', {
    templateUrl: 'app/appModule/car/car.component.html',
    controller: function(carService, $location, $scope, driverService) {
        var vm = this;
        vm.cars = [];
        // vm.drivers = [];
        vm.selected = null;
        vm.updating = null;

        /************ View Cars / Refresh ****************/
        var reload = function() {
            vm.selected = null;
            vm.loading = true;
            carService.index().then(function(res) {
                    vm.cars = res.data;
                    // loadDrivers();
                })
                .catch(function(err) {
                    console.log('carService.index() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        reload();

        /**************** insert a new car ******************/
        vm.createCar = function(newCar) {
            vm.loading = true;
            carService.create(newCar).then(function(res) {
            	console.log(res.data);
            	console.log(newCar);
                    newCar.id = res.data;
                    vm.cars.push(newCar);
                })
                .catch(function(err) {
                    console.log('car creation failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /*************** view selected car *****************/
        vm.show = function(id) {
            vm.loading = true;
            carService.show(id).then(function(res) {
                    // $location.path('/cars/' + id);
                    vm.selected = res.data;
                })
                .catch(function(err) {
                    console.log('carService.show(id) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /*************** update selected car ******************/
        vm.update = function() {
            vm.updating = true;
        };

        vm.updateCar = function(updateCar) {
            vm.loading = true;
            carService.update(updateCar).then(function(res) {
                    console.log('car updated');
                    /*************************************************************************
				The next ~10 lines are to populate the existing array and eliminate the
                need to hit the database again.  If concurrent user access will exist,
                this should probably be replaced with a reload()
				*************************************************************************/
                    // var spliceIndex;
                    // vm.cars.forEach(function(car, idx) {
                    //     if (car.id == updateCar.id) {
                    //         spliceIndex = idx;
                    //     }
                    // });
                    // vm.cars.splice(spliceIndex, 1);
                    // vm.cars.splice(spliceIndex, 0, updateCar);
                    for (var i = 0; i < vm.cars.length; i++) {
                        if (vm.cars[i].id == updateCar.id) {
                            vm.cars[i].make = updateCar.make;
                            vm.cars[i].model = updateCar.model;
                            break;
                        }
                    }
                })
                .catch(function(err) {
                    console.log('carService.update(car) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.updating = false;
                    vm.selected = null;
                    vm.loading = false;
                });
        };

        /*************** Delete selected car **************************/
        vm.deleteCar = function(id) {
            vm.loading = true;
            carService.destroy(id).then(function(res) {
                    for (var i = 0; i < vm.cars.length; i++) {
                        if (vm.cars[i].id == id) {
                            vm.cars.splice(i, 1);
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    vm.selected = null;
                    vm.loading = false;
                });
        };

        /**
         * Load Drivers to make them available during creating and updating Cars
         */
        // var loadDrivers = function() {
        //     driverService.index().then(function(res) {
        //             vm.drivers = res.data;
        //             console.log('drivers loaded');
        //             console.log(vm.drivers);
        //         })
        //         .catch(function(err) {
        //             console.log('loadDrivers failed');
        //             console.log(err);
        //         });
        // };

        /********************** return to index view ******************
        This is used instead of $location.path to prevent page reload.
        The tradeoff is an unchanging templateUrl
        ***************************************************************/

        $scope.$on('showAll', function() {
            vm.selected = null;
            vm.updating = null;
        });
    },
    controllerAs: 'vm'
});

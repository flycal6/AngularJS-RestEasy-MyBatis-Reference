angular.module('appModule').component('driver', {
    templateUrl: 'app/appModule/driver/driver.component.html',
    controller: function(driverService, $scope, carService) {
        var vm = this;
        vm.drivers = [];
        vm.cars = [];

        /**
         * View drivers / Refresh
         */
        var reload = function() {
            vm.loading = true;
            vm.selected = null;
            driverService.index().then(function(res) {
                    vm.drivers = res.data;
                    loadCars();
                })
                .catch(function(err) {
                    console.log('driverService.index() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        reload();

        /**
         * view a single selected driver
         */
        vm.show = function(id) {
            vm.loading = true;
            driverService.show(id).then(function(res) {
                    vm.selected = res.data;
                })
                .catch(function(err) {
                    console.log('driverService.show(id) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * Insert a new driver
         */
        vm.createDriver = function(newDriver) {
            vm.loading = true;
            driverService.create(newDriver).then(function(res) {
                    console.log('newDriver');
                    console.log(newDriver);
                    newDriver.id = res.data;

                    // The driver.car info is incomplete from the form,
                    // so driver.car is swapped with a complete car from vm.cars
                    for (var i = 0; i < vm.cars.length; i++) {
                        if (vm.cars[i].id == newDriver.car.id) {
                            newDriver.car = vm.cars[i];
                            break;
                        }
                    }
                    vm.drivers.push(newDriver);
                })
                .catch(function(err) {
                    console.log('driver creation failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * update selected driver
         */
        vm.update = function() {
            vm.updating = true;
        };
        vm.updateDriver = function(updateDriver) {
            vm.loading = true;
            for (var i = 0; i < vm.cars.length; i++) {
                if (vm.cars[i].id == updateDriver.car.id) {
                    updateDriver.car = vm.cars[i];
                    break;
                }
            }
            driverService.update(updateDriver).then(function(res) {
                    var spliceIndex;
                    vm.drivers.forEach(function(driver, idx) {
                        if (driver.id == updateDriver.id) {
                            spliceIndex = idx;
                        }
                    });
                    vm.drivers.splice(spliceIndex, 1);
                    vm.drivers.splice(spliceIndex, 0, updateDriver);
                })
                .catch(function(err) {
                    console.log('driver update failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.updating = false;
                    vm.selected = null;
                    vm.loading = false;
                });
        };

        /**
         * Delete a driver
         */
        vm.deleteDriver = function(id) {
            vm.loading = true;
            driverService.destroy(id).then(function(res) {
                    for (var i = 0; i < vm.drivers.length; i++) {
                        if (vm.drivers[i].id == id) {
                            vm.drivers.splice(i, 1);
                        }
                    }
                })
                .catch(function(err) {
                    console.log('driver destroy() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.selected = null;
                    vm.loading = false;
                });
        };

        /**
         * Load all cars from carService, to make available when creating a new driver
         */
        var loadCars = function() {
            vm.loading = true;
            carService.index().then(function(res) {
                    vm.cars = res.data;
                    console.log('cars loaded:');
                    console.log(vm.cars);
                })
                .catch(function(err) {
                    console.log('loadCars() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /********************** return to index view ******************
        This is used instead of $location.path to prevent page reload.
        The tradeoff is an unchanging templateUrl
        ***************************************************************/

        $scope.$on('showAllDrivers', function() {
            vm.selected = null;
            vm.updating = null;
        });

    },
    controllerAs: 'vm'
});
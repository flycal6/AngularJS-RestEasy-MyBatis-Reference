angular.module('appModule').component('race', {
    templateUrl: 'app/appModule/race/race.component.html',
    controller: function(raceService, $scope, driverService, raceDriverService) {
        var vm = this;
        vm.races = [];
        vm.drivers = [];
        vm.updating = null;

        /**
         * View Races / Refresh
         */
        var reload = function() {
            vm.selected = null;
            raceService.index().then(function(res) {
                    vm.races = res.data;
                    console.log(vm.races);
                })
                .catch(function(err) {
                    console.log('raceService.index() failed');
                    console.log(err);
                });
        };

        reload();

        /**
         * View Selected Race
         */
        vm.show = function(id) {
            raceService.show(id).then(function(res) {
                    vm.selected = res.data;
                    console.log(vm.selected);
                    loadDrivers();
                })
                .catch(function(err) {
                    console.log('raceService.show(id) failed');
                    console.log(err);
                });
        };

        /**
         * Insert a New Race
         */
        vm.createRace = function(newRace) {
            raceService.create(newRace).then(function(res) {
                    newRace.id = res.data;
                    vm.races.unshift(newRace);
                })
                .catch(function(err) {
                    console.log('raceService.create(newRace) failed');
                    console.log(err);
                });
        };

        /**
         * Update a Race
         */
        vm.update = function() {
            vm.updating = true;
        };

        vm.updateRace = function(raceUpdate) {
            raceService.update(raceUpdate).then(function(res) {
                    var spliceIndex;
                    vm.races.forEach(function(race, idx) {
                        if (race.id == raceUpdate.id) {
                            spliceIndex = idx;
                        }
                    });
                    vm.races.splice(spliceIndex, 1);
                    vm.races.splice(spliceIndex, 0, raceUpdate);
                })
                .catch(function(err) {
                    console.log('raceService.update(race) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.updating = false;
                    vm.selected = null;
                });
        };

        /**
         * Add a Driver to a Race
         */
        var generateDriverChoices = function() {
            console.log('generateDriverChoices()');
            // console.log('vm.availableDrivers top');
            // console.log(vm.availableDrivers);

            for (var i = 0; i < vm.selected.drivers.length; i++) {
                for (var j = 0; j < vm.availableDrivers.length; j++) {
                    if (vm.availableDrivers[j].id == vm.selected.drivers[i].id) {
                        vm.availableDrivers.splice(j, 1);
                        break;
                    }
                }
            }
            console.log('vm.availableDrivers bottom');
            console.log(vm.availableDrivers);
        };

        vm.addDriversToRace = function(rid, drivers) {
            console.log('adding drivers to race');
            console.log(vm.driversToAdd);
            raceDriverService.addDrivers(rid, drivers).then(function(res) {
                    console.log('drivers added to race');
                    drivers.forEach(function(d, idx) {
                        vm.selected.drivers.push(d);
                    });
                    generateDriverChoices();
                })
                .catch(function(err) {
                    console.log('raceDriverService.addDrivers() failed');
                    console.log(err);
                });
        };

        /**
         * Remove a Driver from Race
         */
        vm.removeDriver = function(raceId, driverId) {
            raceDriverService.removeDriver(raceId, driverId).then(function(res) {
                for (var i = 0; i < vm.selected.drivers.length; i++) {
                    if (vm.selected.drivers[i].id == driverId) {
                        vm.availableDrivers.push(vm.selected.drivers[i]);
                        vm.selected.drivers.splice(i, 1);
                        break;
                    }
                }
            });
        };

        /**
         * Delete a Race
         */
        vm.deleteRace = function(id) {
            raceService.destroy(id).then(function(res) {
                    for (var i = 0; i < vm.races.length; i++) {
                        if (vm.races[i].id == id) {
                            vm.races.splice(i, 1);
                            break;
                        }
                    }
                })
                .catch(function(err) {
                    console.log('raceService.destroy(id) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.selected = null;
                });
        };

        /**
         * Load Drivers to make them available during creating and updating Cars,
         * and adding drivers to Races
         */
        var loadDrivers = function() {
            driverService.index().then(function(res) {
                    vm.drivers = res.data;
                    vm.availableDrivers = vm.drivers;
                    console.log('drivers loaded');
                    console.log(vm.drivers);
                    generateDriverChoices();
                })
                .catch(function(err) {
                    console.log('loadDrivers failed');
                    console.log(err);
                });
        };

        /********************** return to index view ******************
        This is used instead of $location.path to prevent page reload.
        The tradeoff is an unchanging templateUrl
        ***************************************************************/

        $scope.$on('showAllRaces', function() {
            vm.selected = null;
            vm.updating = null;
        });
    },
    controllerAs: 'vm'
});
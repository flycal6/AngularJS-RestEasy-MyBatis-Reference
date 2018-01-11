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
            vm.loading = true;
            raceService.index().then(function(res) {
                    vm.races = res.data;
                })
                .catch(function(err) {
                    console.log('raceService.index() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        reload();

        /**
         * View Selected Race
         */
        vm.show = function(id) {
            vm.loading = true;
            raceService.show(id).then(function(res) {
                    vm.selected = res.data;
                    loadDrivers();
                })
                .catch(function(err) {
                    console.log('raceService.show(id) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * Insert a New Race
         */
        vm.createRace = function(newRace) {
            vm.loading = true;
            raceService.create(newRace).then(function(res) {
                    newRace.id = res.data;
                    vm.races.unshift(newRace);
                })
                .catch(function(err) {
                    console.log('raceService.create(newRace) failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * Update a Race
         */
        vm.update = function() {
            vm.updating = true;
        };

        vm.updateRace = function(raceUpdate) {
            vm.loading = true;
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
                    vm.loading = false;
                });
        };

        /**
         * Add a Driver to a Race
         */
        var generateDriverChoices = function() {
            for (var i = 0; i < vm.selected.drivers.length; i++) {
                for (var j = 0; j < vm.availableDrivers.length; j++) {
                    if (vm.availableDrivers[j].id == vm.selected.drivers[i].id) {
                        vm.availableDrivers.splice(j, 1);
                        break;
                    }
                }
            }
        };

        vm.addDriversToRace = function(rid, drivers) {
            vm.loading = true;
            raceDriverService.addDrivers(rid, drivers).then(function(res) {
                    drivers.forEach(function(d, idx) {
                        vm.selected.drivers.push(d);
                    });
                    generateDriverChoices();
                })
                .catch(function(err) {
                    console.log('raceDriverService.addDrivers() failed');
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * Remove a Driver from Race
         */
        vm.removeDriver = function(raceId, driverId) {
            vm.loading = true;
            raceDriverService.removeDriver(raceId, driverId).then(function(res) {
                    for (var i = 0; i < vm.selected.drivers.length; i++) {
                        if (vm.selected.drivers[i].id == driverId) {
                            vm.availableDrivers.push(vm.selected.drivers[i]);
                            vm.selected.drivers.splice(i, 1);
                            break;
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        /**
         * Delete a Race
         */
        vm.deleteRace = function(id) {
            vm.loading = true;
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
                    vm.loading = false;
                });
        };

        /**
         * Load Drivers to make them available during creating and updating Cars,
         * and adding drivers to Races
         */
        var loadDrivers = function() {
            vm.loading = true;
            driverService.index().then(function(res) {
                    vm.drivers = res.data;
                    vm.availableDrivers = vm.drivers;
                    generateDriverChoices();
                })
                .catch(function(err) {
                    console.log('loadDrivers failed');
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

        $scope.$on('showAllRaces', function() {
            vm.selected = null;
            vm.updating = null;
        });
    },
    controllerAs: 'vm'
});
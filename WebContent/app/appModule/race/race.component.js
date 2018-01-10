angular.module('appModule').component('race', {
    templateUrl: 'app/appModule/race/race.component.html',
    controller: function(raceService, $scope) {
        var vm = this;
        vm.races = [];
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
                })
                .catch(function(err) {
                    console.log('raceService.show(id) failed');
                    console.log(err);
                });
        };

        $scope.$on('showAllRaces', function() {
            vm.selected = null;
        });

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
                        if (race.id == raceUpdate.idea) {
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
(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .controller('RestaurantCtrl', ['RestaurantService', '$scope', 'uiGmapGoogleMapApi', '$rootScope',
    function(restaurantService, $scope, uiGmapGoogleMapApi, $rootScope) {

      $scope.getCurrentPosition = function() {
        var currentPositionPromise = restaurantService.getCurrentPosition();
        currentPositionPromise.then(function(data) {
          $scope.currentPosition = data.coords;
          console.log(data);
        }).catch(function(err) {
          $scope.error = err;
          console.log(err);
        });
      };

      $scope.findRestaurants = function() {
        /*
        Set default values
        */
        $scope.distance = typeof $scope.distance !== 'undefined' ? $scope.distance : '20';
        $scope.currentPosition = typeof $scope.currentPosition !== 'undefined' ? $scope.currentPosition : {
          latitude: 51.053468,
          longitude: 3.73038
        };

        $rootScope.loading = true;
        var restaurantPromise = restaurantService.getRestaurants($scope.currentPosition.longitude,
          $scope.currentPosition.latitude, $scope.distance);

        restaurantPromise.then(function(data) {
          console.log(data);
          $rootScope.loading = false;
        }).catch(function(error) {
          $scope.error = error;
          $rootScope.loading = false;
        });


      };


    }]);

})();

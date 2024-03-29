(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .controller('RestaurantCtrl', ['RestaurantService', '$scope', '$state', 'ChallengeService',
      function(restaurantService, $scope, $state, challengeService) {

        $scope.distance = 20;
        $scope.markers = [];

        /*
         * Initialize current position on center of Ghent
         */
        var currentPosition = {
          latitude: 51.053468,
          longitude: 3.73038
        };

        /*
         * Initialize the map
         */
        $scope.init = function() {
          $scope.map = {
            center: {
              latitude: parseFloat(currentPosition.latitude),
              longitude: parseFloat(currentPosition.longitude)
            },
            zoom: 15
          };
        };

        $scope.getCurrentPosition = function() {
          var currentPositionPromise = restaurantService.getCurrentPosition();
          currentPositionPromise.then(function(data) {
            $scope.accepted = true;
            console.log(data);
            currentPosition = data.coords;
            $scope.map = {
              center: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
              },
              zoom: 15
            };
          }).catch(function(err) {
            $scope.map = {
              center: {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
              },
              zoom: 15
            };
            $scope.error = err;
            console.log(err);
          });
        };


        /*
         * find Restaurants inside the radius
         */
        $scope.findRestaurants = function() {
          var restaurantsPromise = restaurantService.getRestaurants(currentPosition.longitude,
            currentPosition.latitude, $scope.distance);

          restaurantsPromise.then(function(data) {
            console.log(data);
            updateMap(data);
          }).catch(function(error) {
            console.log(error);
            $scope.error = error;
          });
        };


        $scope.clickedMarker = function(marker, event, data) {
          console.log(data);

          var restaurantPromise = restaurantService.getRestaurant(data.id);

          restaurantPromise.then(function(data) {
            $scope.currentRestaurant = data;
          }).catch(function(error) {
            console.log(error);
          });
        };

        /*
         * Update the map with the data retrieved from the API
         */
        var updateMap = function(data) {
          var arr = [];

          data.forEach(function(loc) {
            var item = {
              id: loc.Id,
              latitude: loc.Latitude,
              longitude: loc.Longitude,
              name: loc.Name
            };

            arr.push(item);
          });

          $scope.markers = arr;
        };

        $scope.agreed = function(){
          console.log($scope.currentRestaurant);
          challengeService.createRestaurantChallenge($scope.currentRestaurant.RestaurantId).then(function(){
            $state.go('challenges-overview');
          }).catch(function(response){
            console.log(response);
            $state.go('challenges-overview');
          });
        };
        $scope.disagreed = function(){
          $state.go('create-challenge');
        };
      }
    ]);

})();

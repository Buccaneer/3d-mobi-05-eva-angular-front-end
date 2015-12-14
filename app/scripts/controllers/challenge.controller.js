(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').controller('ChallengeCtrl', ['$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'RestaurantService',
      function($state, $scope, $localstorage, TOKEN, ChallengeService, challenge, restaurantService) {
        $scope.challenge = challenge;

        console.log(challenge);
        if (challenge.Type === 'Recipe') {
          $scope.recipe = challenge.Recipe;
          $scope.view = "views/recipe.html";
        }

        if (challenge.Type === 'Restaurant') {
          $scope.view = "views/restaurant.html";
          $scope.restaurant = challenge.Restaurant;
        }

        $scope.initMap = function() {
          var rest = (challenge.Restaurant);
          console.log(typeof(rest.Longitude));
          console.log(isNaN(parseFloat($scope.restaurant.Longitude)));
          var long = $scope.restaurant.Longitute;
          var lat = $scope.restaurant.Latitude;

          $scope.map = {
            center: {
              longitude: long,
              latitude: lat
            },
            zoom: 10
          };

          $scope.markers = [];
          var item = {
            id: $scope.restaurant.RestaurantId,
            latitude: lat,
            longitude: long
          };

          $scope.markers.push(item);
          // console.log('###');
          // console.log($scope.restaurant.Latitude);
          // $scope.map = {
          //   center: {
          //     latitude: 50.962,
          //     longitute: 33.599
          //   },
          //   zoom: 15
          // };
          // console.log('###');
          // console.log($scope.restaurant.Latitude);
        };


        $scope.markAsDone = function() {
          console.log(challenge);
          ChallengeService.markChallengeAsDone(challenge.ChallengeId);
          $state.go('challenges-overview');
        };
      }
    ]);


})();

(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').controller('ChallengeCtrl', ['$rootScope', '$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'RestaurantService', 'moment', '$translate',
      function($rootScope, $state, $scope, $localstorage, TOKEN, ChallengeService, challenge, restaurantService, moment, $translate) {
        moment.locale($translate.use());

        $scope.challenge = challenge;
        $scope.challenge.Date = new moment($scope.challenge.Date);

        console.log(challenge);
        if (challenge.Type === 'Recipe' || challenge.Type === 'CreativeCooking' || challenge.Type === 'RegionRecipe') {
          $scope.recipe = challenge.Recipe;
          $scope.view = "views/recipe.html";
        }

        if (challenge.Type === 'Suikervrij') {
          $scope.view = "views/sugarfree.html";
        }

        if (challenge.Type === 'Restaurant') {
          $scope.view = "views/restaurant.html";
          $scope.currentRestaurant = challenge.Restaurant;
        }

        $scope.initMap = function() {
          var long = $scope.currentRestaurant.Longitute;
          var lat = $scope.currentRestaurant.Latitude;

          $scope.map = {
            center: {
              longitude: long,
              latitude: lat
            },
            zoom: 10
          };

          $scope.markers = [];
          var item = {
            id: $scope.currentRestaurant.RestaurantId,
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
          $rootScope.loading = true;
          ChallengeService.markChallengeAsDone(challenge.ChallengeId).then(function() {
            $rootScope.loading = false;
            $state.go('challenges-overview');
          }).catch(function(response) {
            console.log(response);
            $rootScope.loading = false;
          });
        };
      }
    ]);


})();

(function () {

  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:CreateChallengeCtrl
   * @description
   * # CreateChallengeCtrl
   * Controller of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp').controller('CreateChallengeCtrl', ['$scope', '$state',
    function ($scope, $state) {

      $scope.createRecipeChallenge = function(){
        $state.go('create-recipe-challenge');
      };

      $scope.createRestaurantChallenge = function(){
        $state.go('create-restaurant-challenge');
      };

      $scope.createRegionRecipeChallenge = function(){
        $state.go('home');
      };

      $scope.createRegionRestaurantChallenge = function(){
        $state.go('home');
      };

      $scope.createCreativeCookingChallenge = function(){
        $state.go('home');
      };
      
      $scope.createSugarfreeChallenge = function(){
        $state.go('create-sugarfree-challenge');
      };
    }
  ]);

})();

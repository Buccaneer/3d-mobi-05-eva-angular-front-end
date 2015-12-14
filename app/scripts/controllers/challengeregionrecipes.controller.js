(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:ChallengeRegionRecipesCtrl
   * @description
   * # Controller for the region recipe challenges.
   * Controller of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp').controller('ChallengeRegionRecipesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'RecipeService', 'AuthService', '$state', '$location', '$anchorScroll',
      function($scope, $localstorage, TOKEN, ChallengeService, RecipeService, AuthService, $state, $location, $anchorScroll) {
        $scope.selectedRegion = '';
        $scope.regions = ['Afrikaans', 'Oosters', 'Zuid-Amerikaans', 'Westers'];
        $scope.recipes = [];

        $scope.onChange = function(value) {
          RecipeService.getRecipesWithProperties([value]).then(function(data) {
            $scope.recipes = data.data;
          });
        };

        $scope.setSelectedRecipe = function(recipe) {
          $scope.recipe = recipe;
          goToRecipe();
        };

        var goToRecipe = function() {
          // set the location.hash to the id of
          // the element you wish to scroll to.
          $location.hash('recipe-body');

          // call $anchorScroll()
          $anchorScroll();
        };


        $scope.disagreed = function() {
          $state.go('create-challenge');
        };

        $scope.agreed = function() {
          ChallengeService.createRegionRecipeChallenge($scope.recipe.RecipeId);
          $state.go('challenges-overview');
        };
      }
    ]);


})();

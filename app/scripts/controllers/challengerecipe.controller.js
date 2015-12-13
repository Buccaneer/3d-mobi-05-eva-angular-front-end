(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp').controller('ChallengeRecipesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'RecipeService', 'AuthService', '$state',
      function($scope, $localstorage, TOKEN, ChallengeService, RecipeService, AuthService, $state) {
        $scope.recipes = RecipeService.recipes;

        $scope.setSelectedRecipe = function(recipe) {
          RecipeService.selectedChallenge = recipe;
          $state.go('select-view-recipe');
        };
      }
    ]);


  angular
    .module('eva21DayChallengeApp').controller('AgreeRecipeCtrl', ['$rootScope', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'RecipeService', 'AuthService', '$state',
      function($rootScope, $scope, $localstorage, TOKEN, ChallengeService, RecipeService, AuthService, $state) {
        if (!RecipeService.selectedChallenge) {
          $state.go('create-recipe-challenge');
        }
        $scope.recipe = RecipeService.selectedChallenge;

        $scope.disagreed = function() {
          $state.go('create-recipe-challenge');
        };

        $scope.agreed = function() {
          ChallengeService.createRecipeChallenge(RecipeService.selectedChallenge.RecipeId).then(function() {
            $rootScope.loading = true;
            $state.go('challenges-overview');
          }).catch(function(response) {
            $rootScope.loading = false;
            console.log(response);
          });
        };
      }
    ]);
})();

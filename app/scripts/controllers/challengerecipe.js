'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('ChallengeRecipesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'RecipeService', 'AuthService', '$state',
  function ($scope, $localstorage, TOKEN, ChallengeService, RecipeService, AuthService, $state) {
    $scope.recipes = RecipeService.recipes;

    $scope.setSelectedRecipe = function (recipe) {
      RecipeService.selectedChallenge = recipe;
      $state.go('select-view-recipe');
    }
  }
]);


app.controller('AgreeRecipeCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'RecipeService', 'AuthService', '$state',
  function ($scope, $localstorage, TOKEN, ChallengeService, RecipeService, AuthService, $state) {
    if (!RecipeService.selectedChallenge)
      $state.go('create-recipe-challenge');
    $scope.recipe = RecipeService.selectedChallenge;
    
    $scope.disagreed = function() {
      $state.go('create-recipe-challenge');
    };
    
    $scope.agreed = function() {
      ChallengeService.createRecipeChallenge(RecipeService.selectedChallenge.RecipeId);
      $state.go('challenges-overview');
    };
  }
]);
 
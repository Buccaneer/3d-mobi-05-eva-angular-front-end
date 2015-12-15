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
    .module('eva21DayChallengeApp')
    .controller('CreativeCookingCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', '$state', 'RecipeService',
      function($scope, $localstorage, TOKEN, ChallengeService, $state, RecipeService) {

        $scope.selected = [];
        $scope.recipes = [];
        $scope.recipe = null;

        $scope.$watch('selected', function(newValue) {
          if (newValue.length > 0) {
            var names = newValue.map(function(el) {
              return el.Name;
            });
            $scope.recipes = RecipeService.getRecipesWithIngredients(names).then(function(data) {
              console.log(data); //doe iets met data
            });

          }
        }, true);

        $scope.onChange = function(recipe) {
          $scope.recipe = recipe;
          console.log(recipe);
        };

        $scope.agreed = function() {
          var ids = [];
          $scope.selected.forEach(function(el) {
            ids.push(el.IngredientId);
          });

          console.log(ids);
          ChallengeService.createCreativeCookingChallenge(ids, $scope.recipe.RecipeId);
          $state.go('challenges-overview');
        };

        $scope.disagreed = function() {
          $state.go('create-challenge');
        };

      }
    ]);

})();

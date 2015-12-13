(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .directive('ingredientSelector', ['IngredientService', function(IngredientService) {
      return {

        restrict: 'E',

        scope: {
          ingredients: '=',
          placeholder: '@'

        },
        templateUrl: '/views/ingredients.html',

        link: function(scope) {
          if (scope.ingredients === undefined || scope.ingredients === null) {
            scope.ingredients = [];
          }


          scope.search = function(searchString) {
            return IngredientService.getIngredients(searchString)
              .then(function(newData) {
                scope.showingIngredients = newData.data;

                return newData.data.filter(function(x) {
                  return scope.ingredients.indexOf(x) < 0;
                });

                // return newData.data;
              });

          };
        }
      };
    }]);


})();

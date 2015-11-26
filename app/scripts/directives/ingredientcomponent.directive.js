(function () {
  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .directive('ingredientSelector', ['IngredientService', function (IngredientService) {
      return {

        restrict: 'E',

        scope: {
          selectedIngredients: '=',

        },
        templateUrl: '/views/ingredients.html',
        link: function (scope, elem, attrs) {
          if (scope.selectedIngredients === undefined || scope.selectedIngredients === null){
            scope.selectedIngredients = [];
          }

          scope.search = function (searchString) {
            return IngredientService.getIngredients(searchString)
              .then(function (newData) {
                scope.showingIngredients = newData.data;
                return newData.data.filter(function (x) { return scope.selectedIngredients.indexOf(x) < 0; });
                // return newData.data;
              });

          };
        }

      };
    }]);


})();

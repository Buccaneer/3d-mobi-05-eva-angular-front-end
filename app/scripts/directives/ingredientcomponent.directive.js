(function () {

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
          scope.test = function () {
            console.log(arguments);
          }
          scope.selectedIngredients = [];
          scope.search = function (searchString) {
            return IngredientService.getIngredients(searchString)
              .then(function (newData) {
                scope.showingIngredients = newData.data;
                return newData.data.filter(function (x) { return scope.selectedIngredients.indexOf(x) < 0 })
                // return newData.data;
              });

          };
          function init() {





          }



          init();
        }

      };
    }]);


})();

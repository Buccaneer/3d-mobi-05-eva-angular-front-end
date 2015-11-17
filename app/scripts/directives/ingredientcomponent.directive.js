(function() {

  angular
    .module('eva21DayChallengeApp')
    .directive('ingredientSelector', ['IngredientService', function(IngredientService) {
      return {

        restrict: 'E',
        scope: {
          selectedIngredients: '=',
          typedText: '@'
        },
        templateUrl: '/views/ingredients.html',
        link: function(scope, elem, attrs) {

          function init() {
            if (!scope.typedText) {
              scope.typedText = "";
            }
            console.log(scope.typedText);
            scope.$watch('typedText', function(newValue, oldValue) {
              if (newValue !== oldValue && newValue !== '') {
                console.log(newValue);
                IngredientService.getIngredients(newValue)
                  .then(function(newData) {
                  		scope.showingIngredients = newData.data;
                  });
              }
            });



          }



          init();
        }

      };
    }]);


})();

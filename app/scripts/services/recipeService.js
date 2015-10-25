'use strict';
/**
 * @ngdoc function
 * @name eva21DayChallengeApp.service:RecipeService
 * @description
 * This service allows the user to work with recipes.
 */
app.service('RecipeService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
  function($localstorage, $http, URLS, TOKEN, $location, $rootScope) {
    var service = {
      init: function() {
        //if there is a token object in the localstorage,
        //load it in memory
        var _token = $localstorage.getObject(TOKEN);
        if (_token !== null) {
          var parsedToken = _token;
          console.log(parsedToken);
          $rootScope.authentication = {
            isAuthed: true,
            token: parsedToken
          };
        }
      },

      getRecipes: function() {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'GET',
          url: URLS.PUBLIC_API + URLS.RECIPE + '/',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          }
        });
      },

      getRecipesWithIngredients: function(ingredientNames) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'POST',
          url: URLS.PUBLIC_API + URLS.RECIPE + '/ByIngredient',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          },
          data: {
            values: ingredientNames
          }
        });
      },

      getRecipesWithProperties: function(challengeId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'POST',
          url: URLS.PUBLIC_API + URLS.RECIPE + '/ByProperty',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          },
          data: {
            values: ingredientNames
          }
        });
      }



    };

    service.init();
    return service;
  }
]);

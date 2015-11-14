(function () {

  'use strict';
  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.service:RecipeService
   * @description
   * This service allows the user to work with recipes.
   */
  angular
    .module('eva21DayChallengeApp').service('RecipeService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
    function ($localstorage, $http, URLS, TOKEN, $location, $rootScope) {
      var service = {
        init: function () {
          //if there is a token object in the localstorage,
          //load it in memory
          var _token = $localstorage.getObject(TOKEN);
          if (_token !== null) {
            var parsedToken = _token;
            $rootScope.authentication = {
              isAuthed: true,
              token: parsedToken
            };
          }
        },

        recipes: [],



        getRecipesWithIngredients: function (ingredientNames) {
          var token = $localstorage.getObject(TOKEN).token;

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

        getRecipesWithProperties: function (properties) {
          var token = $localstorage.getObject(TOKEN).token;

          return $http({
            method: 'POST',
            url: URLS.PUBLIC_API + URLS.RECIPE + '/ByProperty',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-type': 'application/json; charset=utf-8'
            },
            data: {
              values: properties
            }
          });
        }



      };
      service.getRecipes = function () {
        if (service.recipes.length > 0) {
          return;
        }
        var token = $localstorage.getObject(TOKEN).token;

        $rootScope.loading = true;
        $http({
          method: 'GET',
          url: URLS.PUBLIC_API + URLS.RECIPE + '/',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          }
        }).success(function (data) {
          $rootScope.loading = false;
          angular.copy(data, service.recipes);
        }).catch(function () {
          $rootScope.loading = false;
        });
      };
      service.init();
      return service;
    }
  ]);


})();

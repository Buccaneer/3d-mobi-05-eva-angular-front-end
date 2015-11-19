(function () {

  'use strict';
  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.service:ingredientService
   * @description
   * This service allows the user to work with recipes.
   */
  angular
    .module('eva21DayChallengeApp').service('IngredientService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
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

          cache: {},


        };

        service.getIngredients = function (ingredientName) {
          if (this.cache[ingredientName] !== undefined)
            return this.cache[ingredientName];

          var token = $localstorage.getObject(TOKEN).token;
          var item = $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.INGREDIENT + ingredientName,
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-type': 'application/json; charset=utf-8'
            }
          });

          this.cache[ingredientName] = item;
          return item;
        };

        service.init();
        return service;
      }
    ]);


})();

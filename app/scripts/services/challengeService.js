'use strict';
/**
 * @ngdoc function
 * @name eva21DayChallengeApp.service:ChallengeService
 * @description
 * This service allows the user to work with challenges.
 */
app.service('ChallengeService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
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

      getChallenges: function() {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'GET',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      getChallenge: function(challengeId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'GET',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      markChallengeAsDone: function(challengeId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'POST',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      deleteChallenge: function(challengeId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'DELETE',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      createRecipeChallenge: function(recipeId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'PUT',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          },
          data: {
            "Type": "Recipe",
            "RecipeId": recipeId
          }
        });
      },

      createCreativeCookingChallenge: function(ingredientsId) {
        var token = $localstorage.get(TOKEN);

        return $http({
          method: 'PUT',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json; charset=utf-8'
          },
          data: {
            "Type": "CreativeCooking",
            "IngredientsId": ingredientsId
          }
        });
      }


    };

    service.init();
    return service;
  }
]);

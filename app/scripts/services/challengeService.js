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
      challenges: [],

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

      markChallengeAsDone: function(challengeId) {
        var token = $localstorage.getObject(TOKEN).token;

        return $http({
          method: 'POST',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      deleteChallenge: function(challengeId) {
        var token = $localstorage.getObject(TOKEN).token;
        return $http({
          method: 'DELETE',
          url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      createRecipeChallenge: function(recipeId) {
        var token = $localstorage.getObject(TOKEN).token;
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
        var token = $localstorage.getObject(TOKEN).token;

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
    service.getChallenges = function() {
      var token = $localstorage.getObject(TOKEN).token;

      $rootScope.loading = true;

      $http({
        method: 'GET',
        url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).success(function(data) {
        $rootScope.loading = false;
        angular.copy(data, service.challenges);
      });
    };

    service.getChallenge = function(challengeId) {
      var token = $localstorage.getObject(TOKEN).token;

      return $http({
        method: 'GET',
        url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(function(res) {
        return res.data;
      });
    };


    service.init();
    return service;
  }
]);

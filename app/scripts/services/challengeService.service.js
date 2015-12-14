(function () {

  'use strict';
  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.service:ChallengeService
   * @description
   * This service allows the user to work with challenges.
   */
  angular
    .module('eva21DayChallengeApp').service('ChallengeService', ['$q', '$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope', 'UserInfoService',
      function ($q, $localstorage, $http, URLS, TOKEN, $location, $rootScope, UserInfoService) {


        var service = {
          self: this,
          challenges: [],

          init: function () {
            var self = this;
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

            UserInfoService.getUserInfo().then(function(resp){
              console.log(resp);
              console.log(resp.data.HasRequestedChallengeToday);
              self.hasReqChallenge = resp.data.HasRequestedChallengeToday;
              console.log(self);
            });
          },

          markChallengeAsDone: function (challengeId) {
            var token = $localstorage.getObject(TOKEN).token;

            var deferred = $q.defer();

            $http({
              method: 'POST',
              url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
              headers: {
                'Authorization': 'Bearer ' + token
              }
            }).then(function(data){
              deferred.resolve(data);
            }).catch(function(response){
              deferred.reject(response);
            });

            return deferred.promise;
          },

          deleteChallenge: function (challengeId) {
            var token = $localstorage.getObject(TOKEN).token;
            return $http({
              method: 'DELETE',
              url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
          },

          createRecipeChallenge: function (recipeId) {
            var token = $localstorage.getObject(TOKEN).token;
            var deferred = $q.defer();

            if(this.hasReqChallenge){
              deferred.reject('hasReqChallenge');
            }

            $http({
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
            }).then(function(data){
              deferred.resolve(data);
            }).catch(function(response){
              deferred.reject(response);
            });

            return deferred.promise;
          },

          createCreativeCookingChallenge: function (ingredientsId, recipeId) {
            var token = $localstorage.getObject(TOKEN).token;
            var deferred = $q.defer();

            if(this.hasReqChallenge){
              deferred.reject('hasReqChallenge');
            }
            $http({
              method: 'PUT',
              url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json; charset=utf-8'
              },
              data: {
                "Type": "CreativeCooking",
                "IngredientsId": ingredientsId,
                "RecipeId": recipeId
              }
            }).then(function(data){
              deferred.resolve(data);
            }).catch(function(response){
              deferred.reject(response);
            });
            return deferred.promise;
          },

          createRestaurantChallenge: function (restaurantId) {
            var token = $localstorage.getObject(TOKEN).token;
            var deferred = $q.defer();

            $http({
              method: 'PUT',
              url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json; charset=utf-8'
              },
              data: {
                "Type": "Restaurant"
              }
            }).then(function(data){
              deferred.resolve(data);
            }).catch(function(response){
              deferred.reject(response);
            });

            return deferred;
          },

          createSugarfreeChallenge: function () {
            var token = $localstorage.getObject(TOKEN).token;
            var deferred = $q.defer();

            if(this.hasReqChallenge){
              deferred.reject('hasReqChallenge');
            }
            $http({
              method: 'PUT',
              url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json; charset=utf-8'
              },
              data: {
                "Type": "Suikervrij"
              }
            }).then(function(data){
              deferred.resolve(data);
            }).catch(function(response){
              deferred.reject(response);
            });
          }


        };

        service.createRegionRecipeChallenge = function (recipeId) {
          var token = $localstorage.getObject(TOKEN).token;

          return $http({
            method: 'PUT',
            url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-type': 'application/json; charset=utf-8'
            },
            data: {
              "Type": "RegionRecipe",
              "RecipeId": recipeId
            }
          }).then(function (data) {
            service.challenges.push(data.data);
          });
        };

        service.getChallenges = function () {
          var token = $localstorage.getObject(TOKEN).token;

          $rootScope.loading = "loading.challenges";

          //probably best for this to be temporary.
          return $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.CHALLENGE + '/',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).success(function (data) {
            $rootScope.loading = false;
            angular.copy(data, service.challenges);
          });
        };



        service.getChallenge = function (challengeId) {
          var token = $localstorage.getObject(TOKEN).token;
          $rootScope.loading = "loading.challenge";

          return $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.CHALLENGE + '/' + challengeId,
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then(function (res) {
            $rootScope.loading = false;
            return res.data;
          });
        };


        service.init();
        return service;
      }
    ]);

})();

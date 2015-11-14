(function() {

  'use strict';
  angular.module('eva21DayChallengeApp')
    .service('RestaurantService', ['$http', '$q', '$localstorage', 'URLS', 'TOKEN', '$window',
      function($http, $q, $localstorage, URLS, TOKEN, $window) {
        var service = {
          // /*
          // initialize token in memory
          // */
          // init: function() {
          //   //if there is a token object in the localstorage,
          //   //load it in memory
          //   var _token = $localstorage.getObject(TOKEN);
          //   if (_token !== null) {
          //     var parsedToken = _token;
          //     $rootScope.authentication = {
          //       isAuthed: true,
          //       token: parsedToken
          //     };
          //   }
          // },

          /*
          Grab the closest restaurants (Long, Lat, Distance)
          */
          getRestaurants: function(long, lat, dist) {
            var deferred = $q.defer();
            var token = $localstorage.getObject(TOKEN).token;

            $http({
              method: 'POST',
              url: URLS.PUBLIC_API + URLS.RESTAURANT + '/find',
              data: {
                'Longitude': long,
                'Latitude': lat,
                'Distance': dist
              },
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json; charset=utf-8'
              }
            }).then(function(response){
              deferred.resolve(response.data);
            }).catch(function(err){
              deferred.reject(err);
            });

            return deferred.promise;
          },

          getCurrentPosition: function() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
              deferred.reject('no geolocation supported');
              return;
            }
            $window.navigator.geolocation.getCurrentPosition(
              //success callback
              function(pos) {
                deferred.resolve(pos);
              },
              //fail callback
              function(error) {
                deferred.reject(error);
              });

            return deferred.promise;
          }

        };

        // service.init();
        return service;
      }
    ]);


})();

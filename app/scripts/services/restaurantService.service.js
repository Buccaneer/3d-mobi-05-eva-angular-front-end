(function() {

  'use strict';
  angular.module('eva21DayChallengeApp')
    .service('RestaurantService', ['$http', '$q', '$localstorage', 'URLS', 'TOKEN', '$window', '$rootScope',
      function($http, $q, $localstorage, URLS, TOKEN, $window, $rootScope) {
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
            return $http({
              method: 'POST',
              url: URLS.PUBLIC_API + URLS.RESTAURANTS + '/find',
              data: {
                'Longitude': long,
                'Latitude': lat,
                'Distance': dist
              },
              headers: {
                'Authorization': 'Bearer ' + $rootScope.parsedToken,
                'Content-Type': 'application/json; charset=utf-8'
              }
            });
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

(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .controller('RestaurantCtrl', ['RestaurantService', '$scope', 'uiGmapGoogleMapApi', '$rootScope',
    function(restaurantService, $scope, uiGmapGoogleMapApi, $rootScope) {

      $scope.distance = 20;

      $scope.getCurrentPosition = function() {
        var currentPositionPromise = restaurantService.getCurrentPosition();
        currentPositionPromise.then(function(data) {
          console.log(data);
          $scope.currentPosition = data.coords;
          $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 15};
        }).catch(function(err) {
          $scope.error = err;
          console.log(err);
        });
      };


      /*
      * find Restaurants inside the radius
      */
      $scope.findRestaurants = function() {
        var restaurantPromise = restaurantService.getRestaurants($scope.currentPosition.longitude,
          $scope.currentPosition.latitude, $scope.distance);

        restaurantPromise.then(function(data) {
          console.log(data);
          updateMap(data);
        }).catch(function(error) {
          console.log(error);
          $scope.error = error;
        });
      };


      $scope.clickedMarker = function(marker, event, data){
        console.log(marker);
        console.log(event);
        console.log(data);
      }

      /*
      * Update the map with the data retrieved from the API
      */
      var updateMap = function(data){
        var arr = [];

        data.forEach(function(loc){
          var item = {
            id: loc.Id,
            latitude: loc.Latitude,
            longitude: loc.Longitude
          }
          console.log(arr);
          arr.push(item);
        });

        $scope.markers = arr;
        $scope.map = {center: {longitude: arr[0].longitude, latitude: arr[0].latitude} };
      };


    }]);

})();

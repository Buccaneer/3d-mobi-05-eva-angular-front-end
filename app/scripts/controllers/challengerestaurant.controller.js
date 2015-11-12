(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp')
    .controller('RestaurantCtrl', ['RestaurantService', '$scope', 'uiGmapGoogleMapApi', function(restaurantService, $scope, uiGmapGoogleMapApi) {
			$scope.getCurrentPosition = function(){
				var currentPositionPromise = restaurantService.getCurrentPosition();
				currentPositionPromise.then(function(data){
					console.log(data);
				}).catch(function(err){
					console.log(err);
				});
			};

			$scope.findRestaurants = function(){

			};


    }]);

})();

'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('MainCtrl', ['$scope', 'AuthService', function($scope, auth){

  //Temporary
  $scope.sendRequest = function(){

    //call AuthService register
    auth.register();
  };
  //Temporary

}]);

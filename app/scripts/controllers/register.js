'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eva21DayChallengeApp
 */
angular.module('eva21DayChallengeApp')
  .controller('RegisterCtrl', ['$scope', 'AuthService', function ($scope, auth) {

    $scope.init = function(){

    };

    //user-object used to register
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.callRegister = function(){
      //call AuthService register
      var promise = auth.register($scope.user);
      promise.then(function(response){
        console.log(response);
      }).catch(function(response){
        console.log(response);
      });
    };
  }]);

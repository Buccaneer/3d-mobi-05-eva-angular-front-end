'use strict';

//TODO
// redirect to /login after successfull register,
// show error-handling/message-handling

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eva21DayChallengeApp
 */
angular.module('eva21DayChallengeApp')
  .controller('RegisterCtrl', ['$scope', 'AuthService', function($scope, auth) {

    $scope.init = function() {

    };

    //user-object used to register
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.callRegister = function() {
      //call AuthService register
      var promise = auth.register($scope.user);
      promise.then(function(response) {
        console.log(response);
      }).catch(function(response) {
        switch (response.status) {
          case -1:
            $scope.error = 'Sorry! Er kan geen verbinding gemaakt worden met de server.';
            break;
        }
      });
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name featureLoginApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eva21DayChallengeApp
 */
angular.module('eva21DayChallengeApp')
  .controller('RegisterCtrl', function ($scope) {
    $scope.confirmPassword = '';

    //user-object used to register
    $scope.user = {
      email: '',
      password: ''
    };
  });

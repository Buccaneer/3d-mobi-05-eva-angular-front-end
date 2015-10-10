'use strict';

/**
 * @ngdoc function
 * @name featureLoginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the featureLoginApp
 */
app.controller('LoginCtrl', function ($scope) {

    //user-object used to login
    $scope.user = {
      email: '',
      password: '',
      rememberMe: true
    };
  });

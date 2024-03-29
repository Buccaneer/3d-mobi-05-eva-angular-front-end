(function() {

'use strict';

//TODO
// show error-handling/message-handling

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the eva21DayChallengeApp
 */
angular.module('eva21DayChallengeApp')
  .controller('RegisterCtrl',
  ['$rootScope', '$scope', 'AuthService', '$location',
   function($rootScope, $scope, auth, $location) {

    //user-object used to register
    $scope.user = {
      email: '',
      password: ''
    };

    //Show validation after Submit
    $scope.submitted = false;

    // $scope.fillin = function(){
    //   $scope.user = {
    //     email: "fien@eva.be",
    //     password: "password",
    //   };
    //   $scope.confirmPassword = "password";
    // };

    $scope.callRegister = function() {
      $scope.error = '';

      if ($scope.signUp_form.$valid) {

        $rootScope.loading = "loading.register";
        //call AuthService register
        var promise = auth.register($scope.user);
        promise.then(function(response) {
          console.log(response);
          $location.path('/login');
        }).catch(function(response) {
          switch (response.status) {
            case -1:
              console.log(response);
              $scope.error = 'Connection with the server cannot be established.';
              break;
            case 400:
              var modelState = response.data.ModelState;
              var errors = modelState[""];
              for (var i = 0; i < errors.length; i++) {
                $scope.error += ' ' + errors[i];
              }
              break;
            default:
              console.log(response);
          }
        });
      } else {
        $scope.signUp_form.submitted = true;
      }

      $rootScope.loading = false;
    };
  }]);
})();


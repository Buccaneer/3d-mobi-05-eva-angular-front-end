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
  .controller('RegisterCtrl', ['$rootScope', '$scope', 'AuthService', '$location',
    function($rootScope, $scope, auth, $location) {

      //user-object used to register
      $scope.user = {
        email: '',
        password: ''
      };

      //Show validation after Submit
      $scope.submitted = false;

      $scope.callRegister = function() {
        $scope.error = '';

        if ($scope.signUp_form.$valid) {

          $rootScope.loading = true;

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
                for (var key in modelState) {
                  for (var i = 0; i < modelState[key].length; i++) {
                    $scope.error += modelState[key][i] + '<br>';
                  }
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
    }
  ]);

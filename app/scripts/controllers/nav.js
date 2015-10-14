'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('NavCtrl', ['AuthService', '$location', '$scope',
  function(auth, $location, $scope) {

    $scope.logout = function(){
      auth.logout();
      $location.path('/');
    };

  }
]);

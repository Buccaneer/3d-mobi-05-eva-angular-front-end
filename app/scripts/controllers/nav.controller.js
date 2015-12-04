(function() {

'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
angular
    .module('eva21DayChallengeApp')
    .controller('NavCtrl', ['AuthService', '$location', '$scope', '$mdSidenav',
  function(auth, $location, $scope, $mdSidenav) {

    $scope.logout = function() {
      auth.logout();
      $location.path('/');
    };

    $scope.isSidenavOpen = false;

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.closeNav = function() {
      $mdSidenav('left').toggle();
    };
  }
]);
})();
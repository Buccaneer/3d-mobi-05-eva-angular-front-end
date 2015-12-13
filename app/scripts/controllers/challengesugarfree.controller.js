(function () {

  'use strict';

  angular
    .module('eva21DayChallengeApp').controller('AgreeSugarfreeCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'AuthService', '$state',
    function ($scope, $localstorage, TOKEN, ChallengeService, AuthService, $state) {
      
      $scope.disagreed = function () {
        $state.go('create-challenge');
      };

      $scope.agreed = function () {
        ChallengeService.createSugarfreeChallenge();
        $state.go('challenges-overview');
      };
    }
  ]);
})();
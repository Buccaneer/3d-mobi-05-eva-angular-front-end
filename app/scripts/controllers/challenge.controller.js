(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').controller('ChallengeCtrl', ['$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'AuthService',
      function($state, $scope, $localstorage, TOKEN, ChallengeService, challenge) {
        $scope.challenge = challenge;

        console.log(challenge);
        if (challenge.Recipe) {
          $scope.recipe = challenge.Recipe;
          $scope.view = "views/recipe.html";
        }

        $scope.markAsDone = function() {
          ChallengeService.markChallengeAsDone(challenge.ChallengeId);
          $state.go('challenges-overview');
        };
      }
    ]);


})();

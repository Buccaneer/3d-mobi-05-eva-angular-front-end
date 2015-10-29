'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('ChallengesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'AuthService',
  function($scope, $localstorage, TOKEN, ChallengeService) {
    $scope.challenges = ChallengeService.challenges;
    console.log($scope);
  }
]);

app.controller('ChallengeCtrl', ['$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'AuthService',
  function($state, $scope, $localstorage, TOKEN, ChallengeService, challenge) {
    $scope.challenge = challenge;

    if (challenge.Recipe) {
      $scope.recipe = challenge.Recipe;
    }

    $scope.markAsDone = function() {
      console.log(challenge);
      ChallengeService.markChallengeAsDone(challenge.ChallengeId);
      $state.go('challenges-overview');
    };
  }
]);

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
    $scope.images = [];

    //this should be called for each challenge is $scope.challenges to grab additional information
    //so that a more detailed view can be created with a Card
    ChallengeService.getChallenge($scope.challenges[0].ChallengeId).then(function(data){
      if(typeof data.Recipe !== 'undefined'){
        $scope.images.push(data.Recipe.Image);
      }
      console.log($scope.images);
    });
  }
]);

app.controller('ChallengeCtrl', ['$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'AuthService',
  function($state, $scope, $localstorage, TOKEN, ChallengeService, challenge) {
    $scope.challenge = challenge;

    console.log(challenge);
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

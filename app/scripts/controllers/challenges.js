'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('ChallengesCtrl', ['$scope','$localstorage', 'TOKEN', 'ChallengeService', 'AuthService',
  function($scope,$localstorage, TOKEN,ChallengeService, AuthService) {
    $scope.challenges = ChallengeService.challenges;
  }
]);

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
    .module('eva21DayChallengeApp').controller('ChallengesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'AuthService','UserInfoService',
      function($scope, $localstorage, TOKEN, ChallengeService, UserInfoService) {
        $scope.challenges = ChallengeService.challenges;
        $scope.detailedChallenges = [];
        $scope.hasNotCreated = false;
        
        UserInfoService.getUserInfo().then(function(result) {
          $scope.hasNotCreated = !result.data.HasRequestedChallengeToday;
        });

        // $scope.loading = true;

        //this should be called for each challenge is $scope.challenges to grab additional information
        //so that a more detailed view can be created with a Card
        /* $scope.init = function () {
           if ($scope.challenges.length > 0) {
             console.log($scope.challenges);
             $scope.challenges.forEach(function (challenge) {
               console.log("challenge " + challenge);
               ChallengeService.getChallenge(challenge.ChallengeId).then(function (data) {
                 if (typeof data.Recipe !== 'undefined') {
                   $scope.detailedChallenges.push(data);
                   console.log(data);
                 }
               });
             });
           }
         };*/
      }


    ]);
})();

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
          console.log(challenge);
          ChallengeService.markChallengeAsDone(challenge.ChallengeId);
          $state.go('challenges-overview');
        };
      }
    ]);


})();

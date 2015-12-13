(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').controller('ChallengeCtrl', ['$rootScope', '$state', '$scope', '$localstorage', 'TOKEN', 'ChallengeService', 'challenge', 'AuthService',
      function($rootScope, $state, $scope, $localstorage, TOKEN, ChallengeService, challenge) {
        $scope.challenge = challenge;

        console.log(challenge);
        if (challenge.Recipe) {
          $scope.recipe = challenge.Recipe;
          $scope.view = "views/recipe.html";
        }

        $scope.markAsDone = function() {
          $rootScope.loading = true;
          ChallengeService.markChallengeAsDone(challenge.ChallengeId).then(function(){
            $rootScope.loading = false;
            $state.go('challenges-overview');
          }).catch(function(response){
            console.log(response);
            $rootScope.loading = false;
          });
        };
      }
    ]);


})();

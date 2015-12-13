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
    .module('eva21DayChallengeApp').controller('ChallengesCtrl', ['$scope', '$localstorage', 'TOKEN', 'ChallengeService', '$state', '$translate', 'moment',
      function($scope, $localstorage, TOKEN, ChallengeService, $state, $translate, moment) {
        ChallengeService.getChallenges().then(function(){
          $scope.challenges = ChallengeService.challenges;
        });

        moment.locale($translate.use());

        console.log($scope.challenges);

        $scope.seeDetails = function(id) {
          $state.go("challenge-overview", {
            "id": id
          });
        };

        $scope.createChallenge = function() {
          $state.go("create-challenge");
        };

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

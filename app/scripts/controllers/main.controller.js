(function() {
  //TODO
  //get correct recipe
  //add momentjs timer
  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp').controller('MainCtrl', [
      '$scope', '$state', 'UserInfoService', 'ChallengeService', '$translate', 'moment',
      function($scope, $state, UserInfoService, ChallengeService, $translate, moment) {
        moment.locale($translate.use());

        $scope.userinfo = UserInfoService.userInfo;
        $scope.currentChallenge = ChallengeService.challenges.sort(compare)[0];

        function compare(a, b) {
          if (a.TimeToAccept > b.TimeToAccept) {
            return -1;
          }
          if (a.TimeToAccept < b.TimeToAccept) {
            return 1;
          }
          return 0;
        }

        console.log($scope.currentChallenge);

        $scope.init = function() {
          $scope.reg_badges = $scope.userinfo.Badges.filter(function(elem) {
            return elem.indexOf('level') < 0;
          });

          $scope.title = $scope.userinfo.Badges.filter(function(elem) {
            return elem.indexOf('level') >= 0;
          })[0];

          var nextXp = 1.0;
          var nextLevel = '';
          switch ($scope.title) {
            case 'level1':
              nextXp = $scope.userinfo.Points / 5;
              nextLevel = 'level2';
              break;
            case 'level2':
              nextXp = ($scope.userinfo.Points - 5) / 5;
              nextLevel = 'level3';
              break;
            case 'level3':
              nextXp = ($scope.userinfo.Points - 10) / 10;
              nextLevel = 'level4';
              break;
            case 'level4':
              nextXp = ($scope.userinfo.Points - 20) / 12;
              nextLevel = 'level5';
              break;
            case 'level5':
              nextXp = ($scope.userinfo.Points - 32) / 18;
              nextLevel = 'level6';
              break;
            case 'level6':
              nextXp = 1;
              break;
          }

          nextXp *= 100;

          $scope.next = Math.round(nextXp);
          $scope.nextLevel = nextLevel;

          $scope.seeDetails = function(id){
            $state.go("challenge-overview", {"id": $scope.currentChallenge.ChallengeId});
          };

          $scope.getChallenge = function(){
            $state.go("create-challenge");
          };

        };


      }
    ]);

})();

'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('MainCtrl', ['$localstorage', 'TOKEN',
  '$scope', 'ChallengeService', '$interval',
  function($localstorage, TOKEN, $scope, challengeService, $interval) {
    var tokenObj = $localstorage.getObject(TOKEN);
    var addDaysInterval;

    var runInterval = function(diffDays) {
      var interval = $interval(function() {
        // Increment the Determinate loader
        $scope.progress.amountOfDays += 1;
        if ($scope.progress.amountOfDays > 21) {
          $scope.progress.amountOfDays = 0;
        }

        console.log($scope.progress.amountOfDays + ' ' + diffDays);
        if($scope.progress.amountOfDays === diffDays){
          $interval.cancel(interval);
        }

      }, 300, 0, true);

    };

    var init = function() {
      //should get more detailed info from the server
      challengeService.getChallenges().then(function() {

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(challengeService.challenges[challengeService.challenges.length - 1].Date);
        var secondDate = new Date();
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

        runInterval(diffDays);
      });
    };

    var interval = function(diffDays) {
      setInterval(animDays(diffDays), 1000);
    };

    var animDays = function(diffDays) {
      if ($scope.progress.amountOfDays <= diffDays) {
        console.log('addDays' + diffDays);
        $scope.progress.amountOfDays++;
      } else {
        console.log('cleared');
        clearInterval(interval);
      }
    };


    init();

    if (tokenObj !== null) {
      var current = new Date();

      console.log(Date.parse(tokenObj.expires));
      console.log(current - Date.parse(tokenObj.expires));
    }


    $scope.progress = {
      amountOfDays: 0,
      percentagePerDay: 4.7,
    };

  }
]);

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

    $scope.progress = {
      amountOfDays: 0,
      percentagePerDay: 4.7,
    };

    var runInterval = function(diffDays) {
      var interval = $interval(function() {

        if ($scope.progress.amountOfDays > 21) {
          $scope.progress.amountOfDays = 0;
        }

        if ($scope.progress.amountOfDays === diffDays) {
          $interval.cancel(interval);
        } else {
          $scope.progress.amountOfDays += 1;
        }

      }, 300, 0, true);

    };

    // var runCountdown = function() {
    //   var countdownInterval = $interval(function() {
    //
    //   })
    // }

    $scope.init = function() {
      //should get more detailed info from the server
      challengeService.getChallenges().then(function() {

        challengeService.challenges.forEach(function(challenge){
          if(!challenge.Done){
            console.log(challenge);
            challengeService.getChallenge(challenge.ChallengeId).then(function(data){
              console.log(data);
              $scope.currentChallenge = data;
              var beginDate = new Date(data.Date);
              var endDate = new Date(data.Date);
              console.log(beginDate);
              endDate.setDate(beginDate.getDate() + 1);
              console.log(endDate);
              var diffDate = Date.parse(endDate) - Date.parse(beginDate);
              console.log(diffDate);
            });
          }
        });


        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        if (challengeService.challenges.length > 0) {
          var firstDate = new Date(challengeService.challenges[challengeService.challenges.length - 1].Date);
          var secondDate = new Date();

          var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
          if(diffDays === 0){
            runInterval(9);
          }
        } else {
          runInterval(9);
        }

      });
    };

    // var interval = function(diffDays) {
    //   setInterval(animDays(diffDays), 1000);
    // };
    //
    // var animDays = function(diffDays) {
    //   if ($scope.progress.amountOfDays <= diffDays) {
    //     console.log('addDays' + diffDays);
    //     $scope.progress.amountOfDays++;
    //   } else {
    //     console.log('cleared');
    //     clearInterval(interval);
    //   }
    // };


    if (tokenObj !== null) {
      var current = new Date();

      console.log(Date.parse(tokenObj.expires));
      console.log(current - Date.parse(tokenObj.expires));
    }

  }
]);

'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('MainCtrl', ['$localstorage', 'TOKEN', '$scope', 'ChallengeService',
  function($localstorage, TOKEN, $scope, challengeService) {
    var tokenObj = $localstorage.getObject(TOKEN);

    var init = function(){
      //should get more detailed info from the server
      challengeService.getChallenges().then(function(){
        console.log(challengeService.challenges);
      });
    };

    init();

    if (tokenObj !== null) {
      var current = new Date();

      console.log(Date.parse(tokenObj.expires));
      console.log(current - Date.parse(tokenObj.expires));
    }


    $scope.progress = {
      amountOfDays: 9,
      percentagePerDay: 4.7,
    };

  }
]);

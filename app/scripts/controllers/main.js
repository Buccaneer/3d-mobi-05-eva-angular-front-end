'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('MainCtrl', ['$localstorage', 'TOKEN', '$scope',
  function($localstorage, TOKEN, $scope) {
    var tokenObj = $localstorage.getObject(TOKEN);

    if (tokenObj !== null) {
      var current = new Date();

      console.log(Date.parse(tokenObj.expires));
      console.log(current - Date.parse(tokenObj.expires));
    }


    $scope.progress = {
      amountOfDays: 9,
      percentagePerDay: 4.7,
    };

    $scope.getChallenge = function() {
      $scope.currentChallenge = {
        type: 'Zelf koken!',
        typeDescription: 'Het doel van deze challenge is het klaarmaken van een gerecht tot een goed einde te brengen.',
        img: '/images/boerenkoolcannelloni.jpg',
        description: "Was de boerenkool en verwijder de dikke nerven. \n Blancheer de boerenkool in flink gezouten water gedurende 3 minuten.\n Spoel onmiddellijk af in ijswater of onder de koude kraan. Versnipper de sjalotjes. Zet een bakpan op het vuur. Giet er een scheut olijfolie in en bak het tofugehakt mooi krokant. Bak kort de sjalot mee en breng op smaak met zout en peper. Blus met een scheutje witte wijn en laat dit helemaal verdampen. Neem van het vuur."
      };
    };
  }
]);

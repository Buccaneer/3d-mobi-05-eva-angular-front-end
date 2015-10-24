'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('MainCtrl', ['$localstorage', 'TOKEN',
  function($localstorage, TOKEN) {
    var tokenObj = $localstorage.getObject(TOKEN);
    if (tokenObj !== null){
      var current = new Date();

      console.log(Date.parse(tokenObj.expires));
      console.log(current - Date.parse(tokenObj.expires));
    }
  }
]);

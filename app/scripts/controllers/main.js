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

    //temporarily clean the Token-object in memory
    //for testing purposes
    $localstorage.setObject(TOKEN, undefined);
    console.log($localstorage.getObject(TOKEN));
  }
]);

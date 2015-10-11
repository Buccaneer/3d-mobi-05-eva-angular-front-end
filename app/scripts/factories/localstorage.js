'use strict';

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.factory:$localstorage
 * @description
 * # $localstorage
 * LocalStorage factory used to easily persist objects and Key/Value-pairs
 */
app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value){
      $window.localStorage[key] = value;
    },
    get: function(key, defaultvalue){
      return ($window.localStorage[key] || defaultvalue);
    },
    setObject: function(key, obj){
      $window.localStorage[key] = JSON.stringify(obj);
    },
    getObject: function(key){
      return ($window.localStorage[key] || '{}');
    }
  };
}]);

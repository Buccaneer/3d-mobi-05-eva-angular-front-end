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
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultvalue) {
      return ($window.localStorage[key] || defaultvalue);
    },
    setObject: function(key, obj) {
      $window.localStorage[key] = JSON.stringify(obj);
    },
    getObject: function(key) {
      //check if item exists, if it does, parse it.$
      if (typeof $window.localStorage[key] !== 'undefined'){
        return JSON.parse($window.localStorage[key]);
      }
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  };
}]);

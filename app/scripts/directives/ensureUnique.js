'use strict';

//TODO: Logan

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.directive:EnsureUnique
 * @description
 * # When the form input is valid, this will make a POST request check to the
 *   server at /api/check/{attr} to check if the attribute is available
 */
app.directive('ensureUnique', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(n) {
        if (!n) {
          return;
        }
        $http({
          method: 'POST',
          url: '/api/check/' + attrs.ensureUnique,
          data: {
            'field': attrs.ensureUnique
          }
        }).success(function(data) {
          c.$setValidity('unique', data.isUnique);
        }).error(function() {
          c.$setValidity('unique', false);
        });
      });
    }
  };
});

(function() {
  'use strict';

  /*
  * Will intercept http-requests and check if user is authorized, if not, the user will be logged out.
  */
  angular
    .module('eva21DayChallengeApp').factory('authHttpResponseInterceptor', ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
      return {
        response: function(response) {
          if (response.status === 401) {
            //cant use AuthService here since circular dependency
            $rootScope.authentication = undefined;
          }
          return response || $q.when(response);
        },
        responseError: function(rejection) {
          if (rejection.status === 401) {
            //cant use AuthService here since circular dependency
            $rootScope.authentication = undefined;
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    }]);
})();

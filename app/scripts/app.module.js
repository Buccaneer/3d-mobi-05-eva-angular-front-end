(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name eva21DayChallengeApp
   * @description
   * # eva21DayChallengeApp
   *
   * Main module of the application.
   */
  var app = angular
    .module('eva21DayChallengeApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'pascalprecht.translate',
      'ngMessages',
      'validation.match',
      'ui.router',
      'ngMaterial'
    ]);

  /**
   * set up the config for the app
   * (routing and such)
   */

  app.run(['$rootScope', '$state', function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      //state requires login?
      var requireLogin = toState.requireAuth;
      //check stateName,
      //if stateName is login, user should not be redirected
      var toStateName = toState.name;
      if (toStateName === 'login') {
        return;
      }

      //if requiresLogin and the authentication-object is still undefined,
      //let user login
      if (requireLogin && typeof $rootScope.authentication === 'undefined') {
        event.preventDefault();
        $state.go('login');
      }
    });

  }]);
  /*
   * Define constants in the project here
   */
  app.constant('URLS', {
    'PUBLIC_API': 'http://evavzwrest.azurewebsites.net',
    'API': 'http://localhost:52072',
    'ACCOUNT': '/api/Account',
    'CHALLENGE': '/api/Challenge',
    'RECIPE': '/api/Recipes',
    'INGREDIENT': '/api/Ingredient?name='

  });
  app.constant('TOKEN', 'eva.access_token');


})();

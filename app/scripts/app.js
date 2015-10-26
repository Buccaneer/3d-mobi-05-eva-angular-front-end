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
    'ui.router'
  ]);

/**
 * set up the config for the app
 * (routing and such)
 */
app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $urlRouterProvider.otherwise('/home');

  //setting up the states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      //controller: 'MainCtrl',
      requireAuth: true
    });


    //let translateProvider load translations from external json
    $translateProvider.useStaticFilesLoader({
      prefix: './i18n/locale-',
      suffix: '.json'
    });

    //register all available languages
    $translateProvider.registerAvailableLanguageKeys(['en', 'nl'], {
      'en_US': 'en',
      'en_UK': 'en',
      'en_CA': 'en',
      'nl_BE': 'nl',
      'nl_NL': 'nl',
      'fr_FR': 'fr',
      'fr_BE': 'fr',
      'fr_LU': 'fr',
      'fr_CH': 'fr',
      'fr_CA': 'fr'
    });

    //determine the language of the user and use it for translations
    $translateProvider.determinePreferredLanguage();
    //$translateProvider.preferredLanguage('fr');
    //if determined language isn't supported, fall back on english
    $translateProvider.fallbackLanguage('en');
    //safety measurements against XSS
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
});

app.run(['$rootScope', '$state', function($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState) {
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
  'CHALLENGE':'api/Challenge',
  'RECIPE':'api/Recipes'

});
app.constant('TOKEN', 'eva.access_token');

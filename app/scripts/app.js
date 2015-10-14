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
    'validation.match',
    'ui.router'
  ]);

/**
 * set up the config for the app
 * (routing and such)
 */
app.config(function($stateProvider, $urlRouterProvider) {
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
});

app.run(['$rootScope', '$state', function($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
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
  'ACCOUNT': '/api/Account'
});
app.constant('TOKEN', 'eva.access_token');

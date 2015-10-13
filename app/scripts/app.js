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
    'validation.match'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
/*
 * Define constants in the project here
 */
app.constant('URLS', {
  'PUBLIC_API': 'http://evavzwrest.azurewebsites.net',
  'API': 'http://localhost:52072',
  'ACCOUNT': '/api/Account'
});
app.constant('TOKEN', 'eva.access_token');

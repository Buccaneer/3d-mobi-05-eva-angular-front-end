'use strict';

/**
* @ngdoc overview
* @name featureLoginApp
* @description
* # featureLoginApp
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
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
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
  .otherwise({
    redirectTo: '/login'
  });
});

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

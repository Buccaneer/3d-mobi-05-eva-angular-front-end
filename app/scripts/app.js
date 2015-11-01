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
app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/home');

  //setting up the states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
        //controller: 'MainCtrl'
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
      controller: 'MainCtrl',
      requireAuth: true
    })
    .state('challenges-overview', {
      url: '/challenges',
      templateUrl: 'views/challenges/overview.html',
      controller: 'ChallengesCtrl',
      requireAuth: true,
      resolve: {
        fetchChallengesPromise: ['ChallengeService', function (ChallengeService) {
          return ChallengeService.getChallenges();
        }]
      }
    })
     .state('create-challenge', {
      url: '/challenge/create',
      templateUrl: 'views/challenges/create-challenge.html',
      requireAuth: true
    })
    .state('challenge-overview', {
      url: '/challenge/:id',
      templateUrl: 'views/challenges/challenge.html',
      controller: 'ChallengeCtrl',
      requireAuth: true,
      resolve: {
        challenge: ['$stateParams','ChallengeService', function ($stateParams,ChallengeService) {
          return ChallengeService.getChallenge($stateParams.id);
        }]
      }
    })

    .state('select-view-recipe', {
      url: '/challenge/create/recipe/agree',
      controller: 'AgreeRecipeCtrl',
      templateUrl: 'views/challenges/create-recipe-challenge-agree.html',
      requireAuth: true
    })
    .state('create-recipe-challenge', {
      url: '/challenge/create/recipe',
      templateUrl: 'views/challenges/create-recipe-challenge.html',
      controller: 'ChallengeRecipesCtrl',
      requireAuth: true,
      resolve: {
        fetchChallengesPromise: ['RecipeService', function (RecipeService) {
          return RecipeService.getRecipes();
        }]
      }
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

  //$mdThemingProvider.theme('app-dark', 'default');
  //    .primaryPalette('green');

  var theme = $mdThemingProvider.extendPalette('green', {
    '200': 'b3a59f',
    '500': 'afbd1f',
    'contrastDefaultColor': 'light'
  });
  var accent = $mdThemingProvider.extendPalette('green', {
    //'500' : '032d18',
    //'200' : '032d18'
  });
  var background = $mdThemingProvider.extendPalette('grey', {
    //'A100': 'b3a59f'
    //'hue-1':'400'
  });

  $mdThemingProvider.definePalette('primary', theme);
  $mdThemingProvider.definePalette('accent', accent);
  $mdThemingProvider.definePalette('background', background);
  $mdThemingProvider.theme('default').primaryPalette('primary').backgroundPalette('background');
});

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
  'RECIPE': '/api/Recipes'

});
app.constant('TOKEN', 'eva.access_token');

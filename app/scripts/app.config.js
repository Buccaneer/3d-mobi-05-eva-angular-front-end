(function() {

  'use strict';

  angular
    .module('eva21DayChallengeApp').config(function($stateProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider) {
      $urlRouterProvider.otherwise('/home');


      //setting up the states
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          // controller: 'HomeCtrl'
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
          requireAuth: true,
          resolve: {
            fetchUserInfoPromise: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }],
            fetchChallengesPromise: ['ChallengeService', function(ChallengeService) {
              console.log("fetched");
              return ChallengeService.getChallenges();
            }]
          }
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl',
          requireAuth: true,
          resolve: {
            fetchUserInfo: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }]
          }
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html',
          requireAuth: true
        })
        .state('challenges-overview', {
          url: '/challenges',
          templateUrl: 'views/challenges/overview.html',
          controller: 'ChallengesCtrl',
          requireAuth: true,
          resolve: {
            fetchChallengesPromise: ['ChallengeService', function(ChallengeService) {
              console.log("fetched2");
              return ChallengeService.getChallenges();
            }]
          }
        })
        .state('create-challenge', {
          url: '/challenge/create',
          templateUrl: 'views/challenges/create-challenge.html',
          controller: 'CreateChallengeCtrl',
          requireAuth: true
        })
        .state('challenge-overview', {
          url: '/challenge/:id',
          templateUrl: 'views/challenges/challenge.html',
          controller: 'ChallengeCtrl',
          requireAuth: true,
          resolve: {
            challenge: ['$stateParams', 'ChallengeService', function($stateParams, ChallengeService) {
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
            fetchChallengesPromise: ['RecipeService', function(RecipeService) {
              return RecipeService.getRecipes();
            }]
          }
        })
        .state('select-view-creative-cooking', {
          url: '/challenge/create/creative-cooking',
          //controller: 'AgreeRecipeCtrl',
          templateUrl: 'views/challenges/create-creative-cooking.html',

          controller: 'CreativeCookingCtrl',
          requireAuth: true
        })
        .state('show-badges', {
          url: '/badges',
          templateUrl: 'views/badges.html',
          controller: 'BadgeCtrl',
          requireAuth: true,
          resolve: {
            fetchUserInfoPromise: ['UserInfoService', function(UserInfoService) {
              return UserInfoService.getUserInfo();
            }]
          }

        }).state('create-restaurant-challenge', {
          url: '/challenge/create/restaurant',
          templateUrl: '/views/challenges/create-restaurant-challenge.html',
          controller: 'RestaurantCtrl',
          requireAuth: true

        }).state('create-sugarfree-challenge', {
          url: '/challenge/create/sugarfree',
          templateUrl: '/views/challenges/create-sugarfree-challenge.html',
          controller:'AgreeSugarfreeCtrl',
          requireAuth: true
        });


      //let translateProvider load translations from external json
      $translateProvider.useStaticFilesLoader({
        files: [{
          prefix: '../i18n/locale-',
          suffix: '.json'
        }]
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
        '500': '032d18',
        '200': '032d18'
      });
      var background = $mdThemingProvider.extendPalette('grey', {
        //'A100': 'b3a59f'
        //'hue-1':'400'
      });

      $mdThemingProvider.definePalette('primary', theme);
      $mdThemingProvider.definePalette('accent', accent);
      $mdThemingProvider.definePalette('background', background);
      $mdThemingProvider.theme('default').primaryPalette('primary').backgroundPalette('background');


      uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather,geometry,visualization'
      });
    });


})();

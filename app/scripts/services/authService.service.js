(function () {

  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.service:AuthService
   * @description
   * # AuthorizationService
   * # AuthorizationService of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp').service('AuthService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
    function ($localstorage, $http, URLS, TOKEN, $location, $rootScope) {
      var service = {
        /**
         * register-function used to register a user
         */
        register: function (user) {
          return $http({
            method: 'POST',
            url: URLS.PUBLIC_API + URLS.ACCOUNT + '/Register',
            data: {
              'Email': user.email,
              'Password': user.password,
              //already checked in form, should the client-side check be deleted?
              'ConfirmPassword': user.password
            },
            headers: {
              'Content-type': 'application/json; charset=utf-8'
            }
          });
        },

        /**
         * login-function used to get the token of a user
         */
        login: function (user) {
          return $http({
            method: 'POST',
            url: URLS.PUBLIC_API + '/Token',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "grant_type=password&username=" + user.email + "&password=" + user.password
          }).then(function (response) {

            var data = response.data;
            console.log(data);
            var _token = {
              token: data.access_token,
              expires: data['.expires']
            };
            //add token to localstorage
            $localstorage.setObject(TOKEN, _token);

            $rootScope.authentication = {
              isAuthed: true,
              token: _token
            };

            $location.path('/main');
          });
        },

        /*
         * Logout the current user,
         * set the token in $localstorage to undefined
         */
        logout: function () {
          $localstorage.remove(TOKEN);
          $rootScope.authentication = undefined;
        },

        /**
         * Get user info, only called when logging in with externalLogins
         */
        getUserInfo: function () {
          var token = $localstorage.getObject(TOKEN).token;


          return $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.ACCOUNT + '/UserInfo',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
        },

        getSocialLinks: function () {
          return $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.ACCOUNT + '/ExternalLogins?returnUrl=%2F&generateState=true'
          });
        },

        /**
        * Check if the user already has a token object in the
        * localStorage
        */

        init: function () {
          //if there is a token object in the localstorage,
          //load it in memory
          var _token = $localstorage.getObject(TOKEN);
          if (_token !== null) {
            var parsedToken = _token;
            console.log(parsedToken);
            $rootScope.authentication = {
              isAuthed: true,
              token: parsedToken
            };
          }
        },

        /**
        * Login with external Providers
        * (Facebook, Twitter and Google)
        */
        externalLogin: function (url) {
          var w = window.open(url);

          //gives an error in reference to the security.
          //(permissiondenied)
          //ports,domain need to be the same
          setTimeout(function () {
            console.log(w.location.href);
          }, 3000);
        }
      };

      //when page is refreshed, call this
      service.init();

      return service;
    }
  ]);


})();
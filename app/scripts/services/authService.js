'use strict';

// TODO
// isAuthed
// change call in login-method from local API to public API
// when CORS is enabled on Token

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.service:AuthService
 * @description
 * # AuthorizationService
 * # AuthorizationService of the eva21DayChallengeApp
 */
app.service('AuthService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
  function($localstorage, $http, URLS, TOKEN, $location, $rootScope) {
    var factory = {
      /**
       * register-function used to register a user
       */
      register: function(user) {
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
       * JWT
       */
      login: function(user) {
        return $http({
          method: 'POST',
          url: URLS.API + '/Token',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: "grant_type=password&username=" + user.email + "&password=" + user.password
        }).then(function(response) {

          var data = response.data;
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

      getUserInfo: function() {
        var token = $localstorage.get(TOKEN);
        console.log('USERINFO: ' + token);
        if (token) {
          var d = new Date(token.expires);
          console.log(d);
        }
        return this.userInfo;
      },

      getSocialLinks: function() {
        return $http({
          method: 'GET',
          url: URLS.PUBLIC_API + URLS.ACCOUNT + '/ExternalLogins?returnUrl=%2F&generateState=true'
        });
      },

      init: function() {
        //if there is a token object in the localstorage,
        //load it in memory
        var _token = $localstorage.getObject(TOKEN);
        if (typeof _token !== 'undefined') {
          $rootScope.authentication = {
            isAuthed: true,
            token: _token
          };
        }
      }
    };

    //when page is refreshed, call this
    factory.init();

    return factory;
  }
]);

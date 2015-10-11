'use strict';

// TODO
// refactoring
// isAuthed

/**
* @ngdoc function
* @name eva21DayChallengeApp.service:AuthService
* @description
* # AuthorizationService
* # AuthorizationService of the eva21DayChallengeApp
*/
app.service('AuthService', ['$localstorage', '$http', 'URLS', 'TOKEN', function ($localstorage, $http, URLS) {
  var factory = {

    /**
    * register-function used to register a user
    */
    register: function(user){
      return $http({
        method:'POST',
        url: URLS.API + URLS.ACCOUNT + '/Register',
        data: {
          'Email':user.email,
          'Password':user.password,
          //already checked in form, should the client-side check be deleted?
          'ConfirmPassword':user.password
        },
        headers: {
          'Content-type':'application/json; charset=utf-8'
        }
      });
    },

    /**
    * login-function used to get the token of a user
    * JWT
    */
    login: function(user){
      return $http({
        method: 'POST',
        url: URLS.API + '/Token',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "grant_type=password&username="+user.email+"&password="+user.password
      });
    },

    isAuthed: function(){
      //check if user is authed
    },

    getSocialLinks: function(){
      return $http({
        method: 'GET',
        url: URLS.API + URLS.ACCOUNT + '/ExternalLogins?returnUrl=%2F&generateState=true',
      }).then(function(response){
        return response.data;
      }).catch(function(response){
        return response;
      });
    }
  };
  return factory;
}]);

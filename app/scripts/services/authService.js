'use strict';

//TODO: Arno
//enable CORS

/**
* @ngdoc function
* @name eva21DayChallengeApp.service:AuthService
* @description
* # AuthorizationService
* # AuthorizationService of the eva21DayChallengeApp
*/
app.service('AuthService', function ($http) {
  var factory = {
    register: function(){

      //doesn't work locally, something is broken in the local rest api
      //CORS needs to be enabled, otherwise HTTP405 (not allowed)
      $http({
        method:'POST',
        url:'http://evavzwrest.azurewebsites.net/api/Account/Register',
        data: {
          "Email":"a@a.be",
          "Password":"password",
          "ConfirmPassword":"password"
        },
        headers: {
          "Content-type":"application/json; charset=utf-8"
        }
      }).success(function (data) {
        console.log("success: " + data);
      }).error(function (data, status, headers, config){
        console.log(data + status + headers + config);
      });
    }
  };
  return factory;
});

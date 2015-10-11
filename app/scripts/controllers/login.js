'use strict';

//TODO
// delete console.logs
// create isAuthed and make it function with layout

/**
* @ngdoc function
* @name eva21DayChallengeApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the eva21DayChallengeApp
*/
app.controller('LoginCtrl', ['$scope', 'AuthService', '$localstorage', '$window', function ($scope, auth, $localstorage, $window) {

  $scope.socialUrls = [];

  $scope.getLogin = function(){
    var promise = auth.login($scope.user);
    promise.then(function(response){
      console.log(response);
      $window.location.href = '/';

    }).catch(function(response){
      console.log(response);
    });
  };

  $scope.getSocialLinks = function(){
    var promise = auth.getSocialLinks();
    promise.then(function(data){
      for(var i in data){
        var socialUrl = {
          name: data[i].Name,
          url: data[i].Url
        };

        $scope.socialUrls.push(socialUrl);
      }
    }).catch(function(response){
      console.log(response);
    });
  };

  //user-object used to login
  $scope.user = {
    email: '',
    password: '',
  };
}]);

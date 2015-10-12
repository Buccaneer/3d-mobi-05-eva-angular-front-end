'use strict';

//TODO
// add error-handling + message-handling to page layout
// create isAuthed and make it function with layout

/**
* @ngdoc function
* @name eva21DayChallengeApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the eva21DayChallengeApp
*/
app.controller('LoginCtrl',
['$scope', 'AuthService', '$localstorage', '$window', 'URLS', '$location',
function ($scope, auth, $localstorage, $window, URLS, $location) {

  $scope.socialUrls = [];

  $scope.baseUrl = URLS.API;

  $scope.getSocialUrls = function(){
    var promise = auth.getSocialLinks();
    promise.then(function(data){
      if(data !== undefined){
        for(var i in data){
          var socialUrl = {
            name: data[i].Name,
            url: $scope.baseUrl + data[i].Url
          };
          console.log(socialUrl);
          $scope.socialUrls.push(socialUrl);
        }
      }
    }).catch(function(response){
      switch(response.status){
        case -1:
        $scope.error = "Sorry! We kunnen geen verbinding maken met de server.";
        break;
      }
    });
  };

  $scope.getSocialUrls();

  $scope.getLogin = function(){
    var promise = auth.login($scope.user);
    promise.then(function(response){
      console.log(response);
      $window.location.href = '/';

    }).catch(function(response){
      console.log(response);
    });
  };

  $scope.externalLogin = function(index){
    //$location
  };

  //user-object used to login
  $scope.user = {
    email: '',
    password: '',
  };
}]);

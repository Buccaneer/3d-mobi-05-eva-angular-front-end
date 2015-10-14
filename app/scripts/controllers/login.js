'use strict';

//TODO
// add error-handling + message-handling to page layout
// create isAuthed and make it function with layout
// !delete console.logs!

/**
 * @ngdoc function
 * @name eva21DayChallengeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eva21DayChallengeApp
 */
app.controller('LoginCtrl', ['$scope', 'AuthService', '$localstorage', '$location', 'URLS',
  function($scope, auth, $localstorage, $location, URLS) {

    $scope.socialUrls = [];

    $scope.baseUrl = URLS.API;

    //Show validation after Submit
    $scope.submitted = false;

    $scope.getSocialLinks = function() {
      var promise = auth.getSocialLinks();
      promise.then(function(response) {
        var data = response.data;
        //if the links are loaded show them,
        //if not, catch the error and dont show them
        if (data !== undefined) {
          for (var i in data) {
            var socialUrl = {
              name: data[i].Name,
              url: URLS.PUBLIC_API + data[i].Url
            };
            $scope.socialUrls.push(socialUrl);
          }
        }
      }).catch(function(response) {
        switch (response.status) {
          case -1:
            $scope.error = 'Logging in with social media is disabled.';
            break;
        }
      });
    };

    $scope.getSocialLinks();

    $scope.callLogin = function() {
      $scope.error = '';

      if($scope.loginForm.$valid){
        var promise = auth.login($scope.user);
        promise.then(function(){
          $location.path('/main');
        }).catch(function(response) {
          switch(response.status){
            case 400:
            $scope.error = response.data.error_description;
          }
        });
      } else {
        $scope.loginForm.submitted = true;
      }
    };


    $scope.externalLogin = function(index) {
      //call this when socialLogin has redirected to the page.

      var w = window.open($scope.socialUrls[index].url);
      //gives an error in reference to the security.
      //(permissiondenied)
      //ports,domain need to be the same
      setTimeout(function() {
        console.log(w.location.href);
      }, 3000);
    };

    //user-object used to login
    $scope.user = {
      email: '',
      password: '',
    };
  }
]);

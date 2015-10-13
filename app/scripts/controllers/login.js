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
app.controller('LoginCtrl', ['$scope', 'AuthService', '$localstorage', '$window', 'URLS', '$location',
  function($scope, auth, $localstorage, $window, URLS, $location) {

    $scope.socialUrls = [];

    $scope.baseUrl = URLS.API;

    $scope.getSocialLinks = function() {
      var promise = auth.getSocialLinks();
      promise.then(function(response) {
        var data = response.data;

        console.log(data);

        //if the links are in the data
        //show them, if not, catch the error and dont show them
        if (data !== undefined) {
          for (var i in data) {
            var socialUrl = {
              name: data[i].Name,
              url: data[i].Url
            };

            $scope.socialUrls.push(socialUrl);
          }
        }
      }).catch(function(response) {
        switch (response.status) {
          case -1:
            $scope.error = "Sorry! Er kan nu niet ingelogd worden met sociale media.";
            break;
        }
      });
    };

    $scope.getSocialLinks();

    $scope.callLogin = function() {
      $scope.error = '';

      var promise = auth.login($scope.user);
      promise.then(function(response) {
        console.log(response);
        $window.location.href = '/';
      }).catch(function(response) {
        $scope.error = "Sorry! We kunnen geen verbinding maken met de server.";
        console.log(response);
      });
    };

    $scope.externalLogin = function(index) {
      //$location
    };

    //user-object used to login
    $scope.user = {
      email: '',
      password: '',
    };
  }
]);

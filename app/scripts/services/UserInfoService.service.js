(function () {

  'use strict';
  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.service:UserInfoService
   * @description
   * This service allows the user to work with userinfo.
   */
  angular
    .module('eva21DayChallengeApp').service('UserInfoService', ['$localstorage', '$http', 'URLS', 'TOKEN', '$location', '$rootScope',
      function ($localstorage, $http, URLS, TOKEN, $location, $rootScope) {
        var service = {
          userInfo: {} ,

          init: function () {
            //if there is a token object in the localstorage,
            //load it in memory
            var _token = $localstorage.getObject(TOKEN);
            if (_token !== null) {
              var parsedToken = _token;
              $rootScope.authentication = {
                isAuthed: true,
                token: parsedToken
              };
            }
          },

          markSetupAsDone: function (user) {
            var token = $localstorage.getObject(TOKEN).token;
            return $http({
              method: 'POST',
              url: URLS.PUBLIC_API + URLS.ACCOUNT + '/UserInfo',
              data: {
                'FirstName': user.firstname,
                'LastName': user.lastname,
                'BirthDay': user.birthdate,
                'Budget': user.budget,
                'TypeOfVegan': user.typeOfVegan,
                'Allergies': user.allergies,
                'PeopleInFamily': user.peopleInFamily,
                'DoneSetup': true
              },
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json; charset=utf-8'
              }
            });
          }
        };

        service.getUserInfo = function () {
          var token = $localstorage.getObject(TOKEN).token;

          $rootScope.loading = "settings.loading";

          //probably best for this to be temporary.
          return $http({
            method: 'GET',
            url: URLS.PUBLIC_API + URLS.ACCOUNT + '/UserInfo',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-type': 'application/json; charset=utf-8'
            }
          }).success(function (data) {
            $rootScope.loading = false;
            angular.copy(data, service.userInfo);
          });
        };

        return service;
      }]);
})();

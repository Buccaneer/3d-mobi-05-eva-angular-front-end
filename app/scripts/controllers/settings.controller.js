(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name eva21DayChallengeApp.controller:SettingsCtrl
     * @description
     * # SettingsCtrl
     * Controller of the eva21DayChallengeApp
     */
    angular
        .module('eva21DayChallengeApp').controller('SettingsCtrl', ['$scope', 'UserInfoService', '$location', function ($scope, UserInfoService, $location) {
            $scope.user = {
                firstname: '',
                lastname: '',
                birthdate: '',
                allergies: '',
                budget: '',
                typeOfVegan: '',
            };

            $scope.typeOfVeganList = ['Omnivoor', 'Pescotariër', 'Parttime-vegetariër', 'Vegetariër', 'Veganist'];
            $scope.budgetList = ['hoog', 'gemiddeld', 'laag', 'niet gedeeld'];
            $scope.peopleInFamilyList = ['1', '2', '3', '4'];
            $scope.allergiesList = ['1', '2', '3'];

            $scope.callSettings = function (){
                UserInfoService.markSetupAsDone($scope.user)
                .then(function(){
                    $location.path('/main');
                });
            };
            
        }]
            );

})();

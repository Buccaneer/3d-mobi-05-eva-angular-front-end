//TODO VALIDATIE

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
            var _userInfo = UserInfoService.userInfo;
            var _doneSetup = _userInfo.DoneSetup;
            $scope.selected = [];
            console.log($scope);
            console.log(_userInfo)

       $scope.$watch('selected', function(val) {
           console.log(val);
            if (val.length > 0) {
                _userInfo.Allergies = val.map(function (allergy) {
                    return allergy.IngredientId;
                });
           
            }
       });
            // $scope.validate = {

            // };
            
            // var calcMinDate = function(){
            //     return new Date();
            // };
            
            // var calcMaxDate = function(){
            //     var cur = new Date();
            //     var y = cur.getFullYear();
            //     var maxY = y-14;
            //     cur.setFullYear(maxY);
                
            //     return cur;
            // };
            
            $scope.user = {
                firstname: '',
                lastname: '',
                birthdate: '',
                allergies: '',
                budget: '',
                typeOfVegan: '',
                peopleInFamily: ''
            };

            $scope.fillin = function () {
                $scope.user = {
                    firstname: 'Logan',
                    lastname: 'Dupont',
                    birthdate: new Date(),
                    allergies: '',
                    budget: 'hoog',
                    typeOfVegan: 'Veganist',
                    peopleInFamily: '3'
                };

            };

            if (_doneSetup === true) {
                $scope.user = {
                    firstname: _userInfo.FirstName,
                    lastname: _userInfo.LastName,
                    birthdate: new Date(_userInfo.BirthDay),
                    allergies: _userInfo.Allergies,
                    budget: _userInfo.Budget,
                    typeOfVegan: _userInfo.TypeOfVegan,
                    peopleInFamily: _userInfo.PeopleInFamily
                };
            }


            $scope.typeOfVeganList = ['Omnivoor', 'Pescotariër', 'Parttime-vegetariër', 'Vegetariër', 'Veganist'];
            $scope.budgetList = ['hoog', 'gemiddeld', 'laag', 'niet gedeeld'];
            $scope.peopleInFamilyList = ['1', '2', '3', '4'];

            $scope.callSettings = function () {
                UserInfoService.markSetupAsDone($scope.user)
                    .then(function () {
                        $location.path('/main');
                    });
            };

        }]
            );

})();

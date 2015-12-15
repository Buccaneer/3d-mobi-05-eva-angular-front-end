//TODO VALIDATIE

(function() {
  'use strict';
  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:SettingsCtrl
   * @description
   * # SettingsCtrl
   * Controller of the eva21DayChallengeApp
   */

  angular
    .module('eva21DayChallengeApp').controller('SettingsCtrl', ['$scope', 'UserInfoService', '$location', 'moment', '$translate', function($scope, UserInfoService, $location, moment, $translate) {
      var _userInfo = UserInfoService.userInfo;
      var _doneSetup = _userInfo.DoneSetup;
      moment.locale($translate.use());

      $scope.selected = [];
      /*        $scope.validate = {

              };



              var calcMinDate = function(){
                  return new Date();
              };

              var calcMaxDate = function(){
                  var cur = new Date();
                  var y = cur.getFullYear();
                  var maxY = y-14;
                  cur.setFullYear(maxY);

                  return cur;
              };*/


      $scope.user = {
        firstname: '',
        lastname: '',
        birthdate: '',
        allergies: '',
        budget: '',
        typeOfVegan: '',
        peopleInFamily: ''
      };

      $scope.fillin = function() {
        $scope.user = {
          firstname: 'Logan',
          lastname: 'Dupont',
          birthdate: new moment(),
          allergies: '',
          budget: 'High',
          typeOfVegan: 'Vegan',
          peopleInFamily: '3'
        };



      };

      var toId = function(ingredient) {
        return ingredient.IngredientId;
      };
      console.log(_userInfo);

      if (_doneSetup === true) {
        $scope.user = {
          firstname: _userInfo.FirstName,
          lastname: _userInfo.LastName,
          birthdate: new moment(_userInfo.BirthDay),
          allergies: _userInfo.Allergies,
          budget: _userInfo.Budget,
          typeOfVegan: _userInfo.TypeOfVegan,
          peopleInFamily: _userInfo.PeopleInFamily
        };
        $scope.selected = _userInfo.Allergies;
      }


      $scope.typeOfVeganList = ['Omnivore', 'Pescetarian', 'Parttime vegetarian', 'Vegetarian', 'Vegan', 'Other'];
      $scope.budgetList = ['High', 'Medium', 'Low', 'Not Shared'];
      $scope.peopleInFamilyList = ['1', '2', '3', '4'];

      $scope.callSettings = function() {

        $scope.user.allergies = $scope.selected.map(toId);
        console.log($scope.user.allergies);

        UserInfoService.markSetupAsDone($scope.user)
          .then(function() {
            $location.path('/main');
          });
      };

    }]);

})();

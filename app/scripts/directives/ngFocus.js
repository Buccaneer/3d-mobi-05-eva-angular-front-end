'use strict';

//TODO: Logan

/**
* @ngdoc function
* @name eva21DayChallengeApp.directive:ngFocus
* @description
* # Show our users the errors after they have blurred off the input field
*/

app.directive('ngFocus', [function(){
  var FOCUS_CLASS = 'ng-focused';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl){
      ctrl.$focused = false;
      element.bind('focus', function(evt){
        element.addClass(FOCUS_CLASS);
        scope.$apply(function(){
          ctrl.$focused = true;
        });
      }).bind('blur', function(evt){
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function(){
          ctrl.$focused = false;
        });
      });
    }
  }
}]);

//TODO
//REFACTOR
(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name eva21DayChallengeApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the eva21DayChallengeApp
   */
  angular
    .module('eva21DayChallengeApp')
    .controller('AnimCtrl', ['$scope', 'AnimService',
      function($scope, anim) {
        $scope.fadeInLeft = function($el){
          $el.removeClass('hidden');
          anim.fadeInLeft($el);
        };

        $scope.slideInUp = function($el){
          $el.removeClass('hidden');
          anim.slideInUp($el);
        };

        $scope.removeInvis = function($el){
          $el.removeClass('hidden');
        };

        $scope.addInvis = function($el){
          $el.addClass('hidden');
        };

        $scope.fadeInRight = function($el){
          anim.fadeInRight($el);
        };

        $scope.bounceInUp = function($el){
          anim.bounceInUp($el);
        };

        $scope.removeFadeInLeft = function($el){
          $scope.addInvis($el);
          anim.removeFadeInLeft($el);
        };

        $scope.removeBounceInUp = function($el){
          anim.removeBounceInUp($el);
        };

        $scope.invisible = function($el){
          anim.invisible($el);
        };
      }
    ]);
})();

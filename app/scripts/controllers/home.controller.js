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
    .controller('HomeCtrl', ['$scope', 'AnimService',
      function($scope, anim) {
        $scope.fadeInLeft = function($el){
          anim.fadeInLeft($el);
        };

        $scope.removeInvis = function($el){
          $el.removeClass('invis');
        };

        $scope.addInvis = function($el){
          $el.addClass('invis');
        };

        $scope.fadeInRight = function($el){
          anim.fadeInRight($el);
        };

        $scope.bounceInUp = function($el){
          anim.bounceInUp($el);
        };

        $scope.removeFadeInLeft = function($el){
          anim.removeFadeInLeft($el);
        };

        $scope.invisible = function($el){
          anim.invisible($el);
        };
      }
    ]);
})();

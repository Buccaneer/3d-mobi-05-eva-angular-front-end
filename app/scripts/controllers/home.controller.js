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

        $scope.bounceInUp = function($el){
          anim.bounceInUp($el);
        };

        $scope.invisible = function($el){
          anim.invisible($el);
        };
      }
    ]);
})();

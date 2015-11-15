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
    .module('eva21DayChallengeApp').service('AnimService', [
      function() {
        var service = {
          anims : [
            'fadeInLeft',
            'fadeInRight',
            'bounceInUp'
          ],

          fadeInLeft: function($el) {
            $el.removeClass('hidden');
            $el.addClass('fadeInLeft');
          },

          bounceInUp: function($el) {
            $el.removeClass('hidden');
            $el.addClass('bounceInUp');
          },

          invisible: function($el) {
            this.anims.forEach(function(anim) {
              $el.removeClass(anim);
            });
          }
        };

        return service;
      }
    ]);
})();

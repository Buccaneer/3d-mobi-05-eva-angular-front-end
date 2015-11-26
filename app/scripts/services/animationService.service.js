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
            $el.removeClass("hidden");
            $el.addClass('fadeInLeft');
          },

          fadeInRight: function($el) {
            $el.removeClass('hidden');
            $el.addClass('fadeInRight');
          },

          bounceInUp: function($el) {
            $el.removeClass('hidden');
            $el.addClass('bounceInUp');
          },

          removeFadeInLeft: function($el) {
            $el.addClass('hidden');
            $el.removeClass('fadeInLeft');
          },

          slideInUp: function($el) {
            $el.removeClass("hidden");
            $el.addClass('slideInUp');
          },

          removeBounceInUp: function($el) {
            $el.addClass('hidden');
            $el.removeClass('bounceInUp');
          }
        };

        return service;
      }
    ]);
})();

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
            $el.removeClass('invis');
            $el.addClass('fadeInLeft');
          },

          fadeInRight: function($el) {
            $el.removeClass('invis');
            $el.addClass('fadeInRight');
          },

          bounceInUp: function($el) {
            $el.removeClass('invis');
            $el.addClass('bounceInUp');
          },

          removeFadeInLeft: function($el) {
            $el.addClass('invis');
            $el.removeClass('fadeInLeft');
          }
        };

        return service;
      }
    ]);
})();

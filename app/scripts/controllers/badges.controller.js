(function() {
	'use strict';
	
	
	angular
	.module('eva21DayChallengeApp')
	.controller('BadgeCtrl',['$scope','AuthService','UserInfoService', function($scope, auth, UserInfoService) {
		$scope.userinfo = UserInfoService.userInfo;
	}]);
})();
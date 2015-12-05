(function() {
	'use strict';
	
	
	angular
	.module('eva21DayChallengeApp')
	.controller('BadgeCtrl',['$scope','AuthService','UserInfoService', function($scope, auth, UserInfoService) {
		$scope.userinfo = UserInfoService.userInfo;
		
		$scope.title  = '';
		
		$scope.userinfo.Badges.forEach(function(elem) {
			if (elem.contains('level'))
			{
				$scope.title = elem;
			}
		});
		
		$scope.userinfo.Badges = $scope.userinfo.Badges.filter(function(elem) {
			return !elem.contains('level');
		});
	}]);
})();
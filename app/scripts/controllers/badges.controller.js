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
		var nextXp = 1.0;
		var nextLevel = '';
		switch ($scope.title) {
			case 'level1':
				nextXp=$scope.userinfo.Points / 5;
				nextLevel = 'level2';
				break;
			case 'level2':
				nextXp = ($scope.userinfo.Points - 5) / 5;
				nextLevel = 'level3';
				break;
			case 'level3':
				nextXp = ($scope.userinfo.Points - 10) / 10;
				nextLevel = 'level4';
				break;
			case 'level4':
				nextXp = ($scope.userinfo.Points - 20) / 12;
				nextLevel = 'level5';
				break;
			case 'level5':
				nextXp = ($scope.userinfo.Points - 32) / 18;
				nextLevel = 'level6';
				break;
			case 'level6':
				nextXp = 1;
				break;
		}
		nextXp *= 100;
		
		$scope.next = Math.round( nextXp);
		$scope.nextLevel = nextLevel;
		
		$scope.userinfo.Badges = $scope.userinfo.Badges.filter(function(elem) {
			return !elem.contains('level');
		});
	}]);
})();
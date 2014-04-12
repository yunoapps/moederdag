angular.module('yuno').controller("StartController", function($log, $scope, $location) {

	$scope.start = function(){
		$location.path("/price");
	}
	
});
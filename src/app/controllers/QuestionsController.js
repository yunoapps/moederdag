angular.module('yuno').controller("QuestionsController", function($log, $scope, $location, $http, yunoService) {

	$scope.step = 0;
	$scope.filter = {};
	$scope.questions = [];

	$http.get("data/questions.json").success(function(data){
		$scope.questions = data;
	});

	$scope.next = function(answer){
		$log.debug("Answer", answer);
		var options = $scope.questions[$scope.step]['filter'][answer];
		$log.debug("Options", options);

		angular.forEach(options, function(value, key){
			$scope.filter[key] = value;
		});

		if(($scope.step + 1) < $scope.questions.length){
			$scope.step++;
		}else{
			yunoService.filter = $scope.filter;
			$location.path("/gifts");
		}
	};

	$scope.back = function(answer){
		if($scope.step > 0){
			$scope.step--;
		}else{
			$location.path("/price");
		}
	};

});
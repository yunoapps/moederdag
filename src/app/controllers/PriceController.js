angular.module('yuno').controller("PriceController", function($log, $scope, $location, yunoService) {

	$scope.price = 40;
	$('.slider').slider().on('slide', function(ev){
    	//$log.debug("Slide", ev);
    	$scope.price = ev.value * -1;
    	$scope.$apply();
	});

	$scope.next = function(){
		yunoService.price = $scope.price;
		$location.path("/questions");
	}
	
});
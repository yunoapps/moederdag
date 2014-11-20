angular.module('yuno').controller("PriceController", function($log, $scope, $location, yunoService) {

	$scope.price = 40;

	var label = $("<div class='label' />");
	label.append($("<span />").text('<€ '+$scope.price));

	var slider = $( "#slider" ).slider({
      orientation: "horizontal",
      range: "min",
      min: 5,
      max: 100,
      step: 5,
      value: $scope.price,
      slide: function( event, ui ) {
        $scope.price = ui.value;
        $(".price-label span").text('<€ ' + $scope.price);
        $scope.$apply();
        
      }
    });
    $('.price-label').append(label);

	$scope.next = function(){
		yunoService.price = $scope.price;
		$location.path("/gifts");
	}
	
});
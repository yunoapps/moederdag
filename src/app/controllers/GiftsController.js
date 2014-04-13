angular.module('yuno').controller("GiftsController", function($log, $scope, $location, $http, yunoService) {

	$scope.price = yunoService.price;
	$scope.filter = yunoService.filter;
	$scope.gifts = [];

	$http.get("app/data/gifts.json").success(function(data){
		$scope.gifts = data;
	})

	if(!$scope.filter){
		$location.path("/price");
	}


	$scope.giftFilter = function(gift){
		$log.debug("Filter", gift);

		gift.image = "images/" + gift.refid + ".jpg";

		if($scope.filter){
			return (
				gift.beleven == $scope.filter.beleven &&
				(
					gift.luxe == $scope.filter.luxe ||
					gift.praktisch == $scope.filter.praktisch ||
					gift.uniek == $scope.filter.uniek
				) && (
					gift.sporten == $scope.filter.sporten ||
					gift.eten == $scope.filter.eten 
				) && (
					gift.binnen == $scope.filter.binnen ||
					gift.buiten == $scope.filter.buiten 
				) &&
				gift.price < $scope.price
			);
		}
	}

});
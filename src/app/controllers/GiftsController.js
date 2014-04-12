angular.module('yuno').controller("GiftsController", function($log, $scope, $location, $http, yunoService) {

	$scope.price = yunoService.price;
	$scope.filter = yunoService.filter;
	$scope.gifts = [];

	$http.get("app/data/gifts.json").success(function(data){
		$scope.gifts = data;
	})


	$scope.giftFilter = function(gift){
		$log.debug("Filter", gift);

		gift.image = "http://s.s-bol.com/imgbase0/imagebase/large/FC/4/4/0/6/" + gift.refid + ".jpg";

		if($scope.filter){
			return (
				gift.beleven == $scope.filter.beleven &&
				gift.price < $scope.price
			);
		}else{
			return true;
		}
	}

});
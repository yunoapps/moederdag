angular.module('yuno').controller("GiftsController", function($log, $scope, $location, $http, $filter, yunoService) {

	var step = 0;
	var gifts = [];

	$scope.price = yunoService.price;
	$scope.filter = yunoService.filter;
	
	$http.get("data/gifts.json").success(function(data){
		gifts = data;
		gifts = $filter('filter')(gifts, $scope.giftFilter);
		gifts = $filter('orderBy')(gifts, "-waardering");
	})

	if(!$scope.filter){
		//$location.path("/price");
	}

	$scope.gift = function(){
		$log.debug(gifts);
		return gifts[step];
	}

	$scope.giftFilter = function(gift){
		$log.debug("Filter", gift);

		gift.image = "products/" + gift.refname + ".jpg";

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
				(
					gift.price < $scope.price ||
					$scope.price == 100
				)
			);
		}
	}

	$scope.next = function(){
		if(step < gifts.length-1){
			step++;
		}
	}

	$scope.back = function(){
		if(step > 0){
			step--
		}
	}	

	$scope.order = function(){
		var gift = gifts[step];
		var url = "http://partnerprogramma.bol.com/click/click?p=1&s=27614&t=p&sec=all:&f=PDL&";
		url += "pid=" + gift.refid;
		url += "&name=YUNO&subid=Moederdag";
		var ref = window.open(url, '_system', 'location=yes');

	}	

});
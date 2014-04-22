angular.module('yuno', [
	'ngRoute'
])

.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/start', {
          templateUrl: 'views/start.html',
          controller: 'StartController'
        })
        .when('/price', {
          templateUrl: 'views/price.html',
          controller: 'PriceController'
        })
        .when('/questions', {
          templateUrl: 'views/questions.html',
          controller: 'QuestionsController'
        })
        .when('/gifts', {
          templateUrl: 'views/gifts.html',
          controller: 'GiftsController'
        })

        .otherwise({
          redirectTo: '/start'
        });
     
      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  });angular.module('yuno').controller("GiftsController", function($log, $scope, $location, $http, yunoService) {

	$scope.price = yunoService.price;
	$scope.filter = yunoService.filter;
	$scope.gifts = [];

	$http.get("data/gifts.json").success(function(data){
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

});angular.module('yuno').controller("PriceController", function($log, $scope, $location, yunoService) {

	$scope.price = 40;

	var label = $("<div class='label' />");
	label.append($("<span />").text($scope.price));

	var slider = $( "#slider" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      step: 5,
      value: $scope.price,
      slide: function( event, ui ) {
        $scope.price = ui.value;
        slider.find(".label span").text($scope.price);
        $scope.$apply();
        
      }
    });
    slider.find("a").append(label);

	$scope.next = function(){
		yunoService.price = $scope.price;
		$location.path("/questions");
	}
	
});angular.module('yuno').controller("QuestionsController", function($log, $scope, $location, $http, yunoService) {

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

});angular.module('yuno').controller("StartController", function($log, $scope, $location) {

	$scope.start = function(){
		$location.path("/price");
	}
	
});angular.module('yuno').service("yunoService", function(){
	
	this.price = 40;
	this.filter = null;

});
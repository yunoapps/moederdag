angular.module('yuno', [
	'ngRoute',
  'ngTouch'
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
  });angular.module('yuno').controller("GiftsController", function ($log, $scope, $location, $http, $filter, yunoService) {

    var step = 0;
    var gifts = [];

    $scope.price = yunoService.price;
    $scope.filter = yunoService.filter;

    $http.get("data/gifts.json").success(function (data) {
        gifts = data;
//		gifts = $filter('filter')(gifts, $scope.giftFilter);
        gifts = $filter('orderBy')(gifts, $scope.calculateMatchFactor, true);

    })

    if (!$scope.filter) {
        //$location.path("/price");
    }

    $scope.gift = function () {
        $log.debug(gifts);
        return gifts[step];
    }


    $scope.calculateMatchFactor = function (gift) {
        gift.image = "products/" + gift.refname + ".jpg";
        var filter = $scope.filter;
        var punten = gift.man * filter.Man +
            gift.vrouw * (-1 * filter.Man) +
            gift.beleven * filter.beleven +
            gift.luxe * filter.luxe +
            gift.praktisch * filter.praktisch +
            gift.uniek * filter.uniek +
            gift.sportief * filter.sportief +
            gift.culinair * filter.culinair +
            gift.gezellig * filter.relaxt +
            gift.binnen * filter.binnen +
            gift.buiten * filter.buiten +
            gift.beiden * filter.beiden;

        var prijsafwijking = (1 - (gift.price - $scope.price) / gift.price);
        var prijspunten;
        if (prijsafwijking < 1)
            prijspunten = prijsafwijking * 45;
        else
            prijspunten = 45 / prijsafwijking;

        var matchfacto = prijspunten + punten;
        gift.matchfactoRound = Math.round(matchfacto);

        return matchfacto;
    }


    $scope.next = function () {
        if (step < gifts.length - 1) {
            step++;
        }
    }

    $scope.back = function () {
        if (step > 0) {
            step--
        }
    }

    $scope.first = function () {
        step = 0;
    }

    $scope.order = function () {
        var gift = gifts[step];
        var url = "http://partnerprogramma.bol.com/click/click?p=1&s=27614&t=p&sec=all:&f=PDL&";
        url += "pid=" + gift.refid;
        url += "&name=YUNO&subid=Moederdag";
        var ref = window.open(url, '_system', 'location=yes');

    }

});angular.module('yuno').controller("PriceController", function($log, $scope, $location, yunoService) {

	$scope.price = 40;

	var label = $("<div class='label' />");
	label.append($("<span />").text($scope.price));

	var slider = $( "#slider" ).slider({
      orientation: "vertical",
      range: "min",
      min: 5,
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
	
});angular.module('yuno').controller("QuestionsController", function ($log, $scope, $location, $http, yunoService) {

    $scope.step = 0;
    $scope.multipleChoiceDisplay = true;
    $scope.filter = {};
    $scope.questions = [];

    $http.get("data/questions.json").success(function (data) {
        $scope.questions = data;
    });

    $scope.setName = function () {
        next();
        yunoService.name = $scope.name;

        angular.forEach($scope.questions, function(value, key){
            $scope.questions[key].question = value.question.replace("[NAAM]", $scope.name);

        });

    };


    $scope.next = function (answer) {
        $log.debug("Answer", answer);
        var options = $scope.questions[$scope.step]['filter'][answer];
        $log.debug("Options", options);

        angular.forEach(options, function (value, key) {
            $scope.filter[key] = value;
        });

        next();

    };

    function next() {
        if ($scope.step == 0){
            $scope.multipleChoiceDisplay = false;
        } else {
            $scope.multipleChoiceDisplay = true;
        }

        if (($scope.step + 1) < $scope.questions.length) {
            $scope.step++;
        } else {
            yunoService.filter = $scope.filter;
            $location.path("/gifts");
        }
    }

    $scope.back = function (answer) {
        if ($scope.step > 0) {
            $scope.step--;
        } else {
            $location.path("/price");
        }
    };

});angular.module('yuno').controller("StartController", function($log, $scope, $location) {

	$scope.start = function(){
		$location.path("/price");
	}
	
});angular.module('yuno').service("yunoService", function () {

    this.price = 40;
    this.name = ""
    this.filter = {
        "Man" : 0,
        "beleven": 0,
        "luxe": 0,
        "praktisch": 0,
        "uniek": 0,
        "sportief": 0,
        "culinair": 0,
        "relaxt": 0,
        "binnen": 0,
        "buiten": 0,
        "beiden":0 //toegevoegd ipv beiden als buiten en binnen
        };


});
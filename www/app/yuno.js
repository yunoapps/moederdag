angular.module('yuno', [
    'ngRoute',
    'ngTouch'
])

    .config(function ($routeProvider, $locationProvider) {
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
            .when('/gift/:id', {
                templateUrl: 'views/gift.html',
                controller: 'GiftController'
            })

            .otherwise({
                redirectTo: '/start'
            });

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });/**
 * Created by vincentvanderzijden on 18-11-14.
 */
angular.module('yuno').controller("GiftController", function ($log, $scope, $location, $http, $filter, yunoService, $routeParams) {
    giftId = $routeParams.id;
    $scope.gift = yunoService.gifts[giftId];
    if ($scope.gift == undefined)
        $scope.gift = yunoService.lastgift
    yunoService.lastgift = $scope.gift;

    $('.webshoplink').attr('onclick', "ChromeLauncher.open(google.com)");
    //window.plugins.socialsharing.share('Message only')

});angular.module('yuno').controller("GiftsController", function ($log, $scope, $location, $http, $filter, yunoService,$timeout) {

        var step = 0;
        var gifts = [];

        $('body').css('background', 'white');


        $scope.price = yunoService.price;
        $scope.filter = yunoService.filter;
        $scope.gifts = []

        $http.get("data/gifts.json").success(function (data) {
            gifts = data;
//		gifts = $filter('filter')(gifts, $scope.giftFilter);
            gifts = $filter('orderBy')(gifts, $scope.calculateMatchFactor, true);
            loadImages();
            yunoService.gifts = gifts;
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

        function loadImages() {
            for (i = 0; i < gifts.length; i++) {

                var giftcol1 = '<tr><td  class="product" giftid="' + i + '"><img  src="' + gifts[i].link_productimage + '"class="image" alt="Foto niet beschikbaar"><span>' + gifts[i].gifts + '<br>€' + gifts[i].price + '</span></td>'
                var giftcol2;
                i++
                if (i != gifts.length)
                    giftcol2 = '<td class="product"  giftid="' + i + '"><img src="' + gifts[i].link_productimage + '"class="image" alt="Foto niet beschikbaar"><span>' + gifts[i].gifts + '<br>€' + gifts[i].price + '</span></td></tr>'
                $('.giftsview').append(giftcol1 + giftcol2);



            }
            $('.product').click(function () {
                var obj = this;
                $timeout(function(){
                    $location.url("/gift/"+ $(obj).attr('giftid'));
                },1);
            });

        }


        $scope.loadgift =

        $scope.share = function () {
            window.plugins.socialsharing.share(
                //message
                'Ik heb in de YUNO app dit cadeau geselecteerd voor ' + yunoService.name + ' met een budget van €' + $scope.price + '. Hier de link naar de webshop: ',
                //subject
                Yuno,
                //file
                'http://spoed.drukkert.nl/images/drukwerk-giftbox-kado.jpg',
                //url
                gifts[step].link
            );

        }

        $scope.price = 40;

        var label = $("<div class='label' />");
        label.append($("<span />").text('<€ ' + $scope.price));

        var slider = $("#slider").slider({
            orientation: "horizontal",
            range: "min",
            min: 5,
            max: 100,
            step: 5,
            value: $scope.price,
            slide: function (event, ui) {
                $scope.price = ui.value;
                $(".price-label span").text('<€ ' + $scope.price);
                $scope.$apply();

            }
        });
        $('.price-label').append(label);

        $scope.next = function () {
            yunoService.price = $scope.price;
            $location.path("/gifts");
        }

    }
)
;angular.module('yuno').controller("PriceController", function($log, $scope, $location, yunoService) {

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
	
});angular.module('yuno').controller("QuestionsController", function ($log, $scope, $location, $http, yunoService) {

    $('body').css('background', 'url(images/background-pattern.png) repeat center center fixed');


    $scope.step = 0;
    $scope.multipleChoiceDisplay = false;
    $scope.nameQuestion = false;
    $scope.genderQuestion = true;
    $scope.filter = {};
    $scope.questions = [];
    var questionIcons = [];
    $scope.icons = []

    $http.get("data/questions.json").success(function (data) {
        $scope.questions = data;
    });
    $http.get("data/questionIcons.json").success(function (data) {
        questionIcons = data;

        setIcons();

    });

    //$('.name').change(function () {
    //    var value = $(this).val();
    //    if (value != '')
    //        $('.btn-yuno-next').css('visibility', 'visible');
    //    else
    //        $('.btn-yuno-next').css('visibility', 'hidden');
    //
    //});

    $('.name').each(function() {
        var elem = $(this);

        // Save current value of element
        elem.data('oldVal', elem.val());

        // Look for changes in the value
        elem.bind("propertychange change click keyup input paste", function(event){
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());

                // Do action
                var value = $(this).val();
                    if (value != '')
                        $('.btn-yuno-next').css('visibility', 'visible');
                    else
                        $('.btn-yuno-next').css('visibility', 'hidden');            }
        });
    });

    function setIcons() {
        $log.debug('step', $scope.step);
        $scope.icons[0] = questionIcons[$scope.step].icons[0]
        $scope.icons[1] = questionIcons[$scope.step].icons[1]
        $scope.icons[2] = questionIcons[$scope.step].icons[2]
    }


    $scope.setName = function () {
        next();
        yunoService.name = $scope.name;

        angular.forEach($scope.questions, function (value, key) {
            $scope.questions[key].question = value.question.replace("[name]", $scope.name);
        });


    };


    $scope.next = function (answer, no) {
        $log.debug("Answer", answer);

        var options = $scope.questions[$scope.step]['filter'][answer];
        $log.debug("Options", options);

        angular.forEach(options, function (value, key) {
            $scope.filter[key] = value;
        });
        setIcon($scope.step, no);


        next();

    };

    function next() {
        switch ($scope.step) {
            case 0:
                $scope.genderQuestion = false;
                $scope.nameQuestion = true;
                if ($scope.filter['Man'] == 1)
                    $scope.questions[1].question = "Wat is zijn naam?"
                else
                    $scope.questions[1].question = "Wat is haar naam?"
                break;
            //case 1:
            //    $scope.genderQuestion = false;
            //    $scope.nameQuestion = true;
            //
            //    break;
            default:
                $scope.multipleChoiceDisplay = true;
                $scope.genderQuestion = false;
                $scope.nameQuestion = false;

        }


        if (($scope.step + 1) < $scope.questions.length) {

            $scope.step++;
            setIcons();


        } else {
            yunoService.filter = $scope.filter;
            $location.path("/price");
        }
    }

    function setIcon(step, no) {
        var icons = $('.navicon');
        if ($scope.step > 1)
            icon = icons[step - 1];
        else
            icon = icons[step];
        $(icon).css('visibility', 'visible');
        $(icon).attr('src', $(icon).attr('src').replace('ic_letter', $scope.icons[no]));
    }

    $scope.back = function (answer) {
        if ($scope.step > 0) {
            $scope.step--;
        } else {
            $location.path("/price");
        }
    };

    $scope.skip = function () {

        if ($scope.filter['Man'] == 1)
            $scope.name = "hij"
        else
            $scope.name = "zij"
        $scope.setName();
    }

});angular.module('yuno').controller("StartController", function($log, $scope, $location) {

	$scope.start = function(){
		$location.path("/questions");


		$('.navbar').show();

	}

	$(document).ready(function () {
		$('body').css('background', 'url(images/gr_landingback.jpg) no-repeat left center fixed');
		$('body').css('background-size', 'cover');
		$('.navbar').hide();
		$(".logo img").load(function() {
			var logoheight = this.height;
			$(".logo").css({'margin-top': logoheight /-2});
		});
		//$('body').css({'background-color': 'yellow'});


	});

});angular.module('yuno').service("yunoService", function () {

    this.price = 40;
    var lastgift;
    this.name = ""
    this.gifts = [];
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


angular.module('yuno').controller("GiftsController", function ($log, $scope, $location, $http, $filter, yunoService) {

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

    $scope.order = function () {
        var gift = gifts[step];
        var url = "http://partnerprogramma.bol.com/click/click?p=1&s=27614&t=p&sec=all:&f=PDL&";
        url += "pid=" + gift.refid;
        url += "&name=YUNO&subid=Moederdag";
        var ref = window.open(url, '_system', 'location=yes');

    }

});
angular.module('yuno').controller("GiftsController", function ($log, $scope, $location, $http, $filter, yunoService,$timeout) {

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
;
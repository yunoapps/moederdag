/**
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

});
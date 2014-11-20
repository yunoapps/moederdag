angular.module('yuno').service("yunoService", function () {

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


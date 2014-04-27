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
  });
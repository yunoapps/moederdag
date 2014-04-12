angular.module('yuno', [
	'ngRoute'
])

.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/start', {
          templateUrl: 'app/views/start.html',
          controller: 'StartController'
        })
        .when('/price', {
          templateUrl: 'app/views/price.html',
          controller: 'PriceController'
        })
        .when('/questions', {
          templateUrl: 'app/views/questions.html',
          controller: 'QuestionsController'
        })
        .when('/gifts', {
          templateUrl: 'app/views/gifts.html',
          controller: 'GiftsController'
        });
 
      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  });
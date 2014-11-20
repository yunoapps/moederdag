angular.module('yuno').controller("StartController", function($log, $scope, $location) {

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

});
angular.module('yuno').controller("QuestionsController", function ($log, $scope, $location, $http, yunoService) {

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

});
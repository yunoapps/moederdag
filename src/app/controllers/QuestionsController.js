angular.module('yuno').controller("QuestionsController", function ($log, $scope, $location, $http, yunoService) {

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

});
'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Zuser, Questions) {

	$scope.number = 0;
	$scope.questions = Questions.get({}, function(questions) {
		// console.log(questions.questions);
		$scope.currentQuestion = $scope.questions.questions[$scope.number];
		$scope.total = $scope.questions.questions.length;
	});

	$scope.score = 0;

	$scope.selectAnswer = function(answer) {
		if($scope.currentQuestion.answer == answer) {
			$scope.score = $scope.score + 10;
			alert("恭喜您，答对了，加10分！");
		} else {
			alert("很遗憾，答错了！");
		}
		$scope.number++;
		$scope.currentQuestion = $scope.questions.questions[$scope.number];

	};


}
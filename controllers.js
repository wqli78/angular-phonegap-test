'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Questions) {

	$scope.number = 0;
	$scope.grade = Questions.get({}, function(grade) {
		// console.log(questions.questions);
		$scope.currentQuestion = $scope.grade.questions[$scope.number];
		$scope.total = $scope.grade.questions.length;
	});

	$scope.score = 0;

	$scope.selectAnswer = function(answer) {
		if($scope.currentQuestion.answer == answer) {
			$scope.score = $scope.score + 10;
			// alert("恭喜您，答对了，加10分！"); 
		} else {
			// alert("很遗憾，答错了！");
		}
		if (($scope.number + 1) < $scope.grade.questions.length){
				$scope.number++;
				$scope.currentQuestion = $scope.grade.questions[$scope.number];
		}
	};


}
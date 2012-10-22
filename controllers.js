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
			$("#right").show(function(){
				$("#right").fadeOut(2000);
			});
			// alert("恭喜您，答对了，加10分！"); 
		} else {
			$("#error").show(function(){
				$("#error").fadeOut(2000);
			});
			// alert("很遗憾，答错了！");
		}
		if (($scope.number + 1) < $scope.grade.questions.length){
				$scope.number++;
				$scope.currentQuestion = $scope.grade.questions[$scope.number];
		}
	};


}
'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Questions) {

	myInit();

	$scope.grade = Questions.get({}, function(grade) { //题库对象
		// console.log(questions.questions);
		$scope.currentQuestion = $scope.grade.questions[$scope.number];
		$scope.total = $scope.grade.questions.length;
	});


	//点击选项后的动作
	$scope.selectAnswer = function(answer) {
		if($scope.currentQuestion.answer == answer) {
			$("#right").show(function() {
				$("#right").fadeOut(1000);
			});
			$scope.score = $scope.score + 10;
			$scope.rightNumber++;
			// alert("恭喜您，答对了，加10分！"); 
		} else {
			$("#error").show(function() {
				$("#error").fadeOut(1000);
			});
			// alert("很遗憾，答错了！");
		}
		if(($scope.number + 1) < $scope.grade.questions.length) {
			$scope.number++;
			$scope.currentQuestion = $scope.grade.questions[$scope.number];
		} else {
			$.mobile.changePage($('#answerResult'));
		}
	};

	//重新开始答题
	$scope.restart = function() {
		myInit();
		$.mobile.changePage($('#answerQuestion'));
	}

	function myInit() {
		$scope.number = 0; //答到第几道题
		$scope.rightNumber = 0; //答对了几道题
		$scope.score = 0; //得分		
	}
}
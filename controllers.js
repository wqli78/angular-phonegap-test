'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Questions) {

	//选择考试阶段
	$scope.selectLevel = function(level) {

		myInit();		
		var gradeName="youeryuan";
		if(level == 1) {
			gradeName = "youeryuan";
		} else if(level == 2) {
			gradeName = "xiaoxue";
		}
		$scope.grade = Questions.get({gradeName:gradeName}, function(grade) { //题库对象
			// console.log($scope.grade);
			$scope.currentQuestion = $scope.grade.questions[$scope.number];
			$scope.total = $scope.grade.questions.length;
		});

		//$.mobile.changePage($('#answerQuestion'));

	};

	//选择答案
	$scope.selectAnswer = function(answer) {
		if($scope.currentQuestion.answer == answer) {
			$("#right").show(function() {
				$("#right").fadeOut(1000,function(){
				});
			});
			$scope.score = $scope.score + 10;
			$scope.rightNumber++;
		} else {
			$("#error").show(function() {
				$("#error").fadeOut(1000);
			});
		}
		$scope.nextQuestion();
	};

	$scope.nextQuestion = function(){
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
		$scope.currentQuestion = $scope.grade.questions[$scope.number];
		$.mobile.changePage($('#answerQuestion'));
	};


	function myInit() {
		$scope.number = 0; //答到第几道题
		$scope.rightNumber = 0; //答对了几道题
		$scope.score = 0; //得分		
	}
}
'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Questions,RemoteQuestions) {

	//选择考试阶段
	$scope.selectLevel = function(level) {

		$scope.method = 'JSONP';
		$scope.url = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero'
			 $http({method: $scope.method, url: $scope.url}).
			success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			}).
			error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
			});

		$http({method: 'JSONP', url: 'http://localhost:3000/api/getQuestion?callback=JSON_CALLBACK'}).
    success(function(data, status, headers, config) {
			alert(data.content);
    // this callback will be called asynchronously
    // when the response is available
    }).
    error(function(data, status, headers, config) {
    	alert(status);
    	alert(headers);
    // called asynchronously if an error occurs
    // or server returns response with status
    // code outside of the <200, 400) range
    });
		myInit();
		var gradeName = "youeryuan";
		if(level == 1) {
			gradeName = "youeryuan";
		} else if(level == 2) {
			gradeName = "xiaoxue";
		}else{
			gradeName = level;
		}
		$scope.grade = Questions.get({
			gradeName: gradeName
		}, function(grade) { //题库对象
			// console.log($scope.grade);
			$scope.currentQuestion = $scope.grade.questions[$scope.number];
			$scope.total = $scope.grade.questions.length;
		});
		$.mobile.changePage($('#answerQuestion'), {
			transition: "slide"
		});

	};

	//选择答案
	$scope.selectAnswer = function(answer) {
		if($scope.currentQuestion.answer == answer) {
			// $("#right").show(function() {
			//	$("#right").fadeOut(1000, function() {});
			// });
			$scope.score = $scope.score + 10;
			$scope.rightNumber++;
			$("#answerOk").popup("open");
			setTimeout(function() {
				$("#answerOk").popup("close");
				$scope.nextQuestion();
			}, 1000);
		} else {
			$("#answerError").popup("open");
			setTimeout(function() {
				$("#answerError").popup("close");
				$scope.nextQuestion();
			}, 1000);
		}
	};

	$scope.nextQuestion = function() {
		if(($scope.number + 1) < $scope.grade.questions.length) {
			$scope.number++;
			$scope.currentQuestion = $scope.grade.questions[$scope.number];
		} else {
			$.mobile.changePage($('#answerResult'));

		}
		//将此时的变量状态显式通知html模版进行更新
		$scope.$apply(function(){   });
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
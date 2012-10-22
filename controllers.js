'use strict';

/* Controllers */

function IndexCtrl($scope, $http, Questions) {

	$scope.number = 0;
	$scope.questions = Questions.get({}, function(questions) {
		// console.log(questions.questions);
		$scope.currentQuestion = $scope.questions.questions[$scope.number];
		$scope.total = $scope.questions.questions.length;
	});

	$scope.score = 0;

}


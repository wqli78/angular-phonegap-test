'use strict';

/* Controllers */

function IndexCtrl($scope, $filter, $http, Questions, RemoteQuestions, localStorageService) {

	//根据症状过滤出的检测流程
	$scope.filterQiaos = [];
	$scope.santongJson = Questions.get({
		gradeName: "santong"
	}, function(santongJson) {});

	//可用来刷新动态html的jm效果
	// $('#list_container').trigger('create');
	//定义症状输入窗口自动过滤动作
	$("#ST_searchBox").keyup(function() {
		var filter = $(this).val();
		$scope.filterQiaos = $filter('filter')($scope.santongJson.qiaos, filter);
		console.log(filter);
		console.log($scope.filterQiaos.length);

		$scope.$apply();

	});

	//检查是否有体检的历史记录
	$scope.checkHistory = function() {
		// localStorageService.clearAll();
		// localStorageService.remove(key);
		if(localStorageService.get('checkHistory')) {
			return true;
		} else {
			return false;
		}
	};

	//选择某一窍进行检查，转入答题页面
	$scope.selectSantong = function(qiaoName) {
		// myInit();
		var qiaoName = qiaoName || 'biqiao';
		_.filter($scope.santongJson.qiaos, function(qiao) {
			return qiao.name == qiaoName;
		});

		$scope.currentQiao = _.filter($scope.santongJson.qiaos, function(qiao) {
			return qiao.name == qiaoName;
		})[0];
		$scope.currentQuestion = $scope.currentQiao.questions.start;
		$.mobile.changePage($('#santong_answer'), {
			transition: "slide"
		});
	};

	//选择某个答案后，在此处进行下一步判断
	$scope.STselectAnswer = function(answer) {
		var answer = $scope.currentQuestion[answer];
		if(_.indexOf(['ok', 'fail', 'hs', 'hx', 'rs', 'rx'], answer) != -1) {
			$scope.resultInfo = $scope.currentQiao.result[answer].content;
			localStorageService.add('checkHistory', JSON.stringify({
				time: 12331,
				qiao: 'biqiao',
				result: 'hs'
			}));
			$.mobile.changePage($('#STanswerResult'), {
				transition: "slide"
			});
		} else {
			$scope.currentQuestion = $scope.currentQiao.questions[answer];
		}
	};

	$scope.STrestart = function() {
		$scope.currentQuestion = $scope.currentQiao.questions["start"];
		$.mobile.changePage($('#santong_answer'), {
			transition: "slide"
		});

		// console.log(JSON.parse(localStorageService.get('checkHistory')));
	};



	//普通答题代码
	$scope.selectLevel = function(level) {

		RemoteQuestions.query({}, function(data) {
			console.log(data);
		});

		$.ajax({
			dataType: "jsonp",
			url: 'http://localhost:3000/api/getQuestion?callback=?',
			success: function(data) {
				console.log(data.name);
			}
		});

		$scope.method = 'JSONP';
		$scope.url = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero'
		$http({
			method: $scope.method,
			url: $scope.url
		}).
		success(function(data, status) {
			$scope.status = status;
			$scope.data = data;

		}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});

		$http({
			method: 'JSONP',
			url: 'http://localhost:3000/api/getQuestion?callback=JSON_CALLBACK2'
		}).
		success(function(data, status, headers, config) {
			alert(data.name);
			console.log(data);
			// this callback will be called asynchronously
			// when the response is available
		}).
		error(function(data, status, headers, config) {
			console.log('error');
			console.log(status);
			console.log(headers);
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
		} else {
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
		$scope.$apply(function() {});
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


//中医诊疗标准

function zhenliaoCtrl($scope, $filter, $http, Questions, RemoteQuestions, localStorageService) {

	//根据症状过滤出的检测流程
	$scope.filterZhengzhuangs = [];
	$scope.showfilterZhengzhuangs = [];

	$scope.showlimit = 5;
	$scope.zhenliaoJson = Questions.get({
		gradeName: "zhenliao"
	}, function(zhenliaoJson) {});

	//定义症状输入窗口自动过滤动作
	$("#ZL_searchBox").blur(function() {
		var filter = $(this).val();
		if(filter && filter.length > 0) {
			$("#zhenliao_tip").hide();
			$scope.currentEnd = 0;
			$("#zhengzhuangList").empty();
			$scope.filterZhengzhuangs = $filter('filter')($scope.zhenliaoJson.zhengzhuangs, filter);
			// console.log(filter);
			// console.log($scope.filterZhengzhuangs.length);
			$scope.getMore();
		}
	});

	$scope.showMore = function() {
		if($scope.currentEnd < $scope.filterZhengzhuangs.length) {
			return true;
		} else {
			return false;
		}
	};

	$scope.getMore = function() {
		if($scope.filterZhengzhuangs.length > $scope.currentEnd + $scope.showlimit) {
			$scope.showfilterZhengzhuangs = $scope.filterZhengzhuangs.slice($scope.currentEnd, $scope.currentEnd + $scope.showlimit);
			$scope.currentEnd = $scope.currentEnd + $scope.showlimit;
		} else {
			$scope.showfilterZhengzhuangs = $scope.filterZhengzhuangs.slice($scope.currentEnd, $scope.filterZhengzhuangs.length - 1);
			$scope.currentEnd = $scope.filterZhengzhuangs.length;
		}
		$scope.showfilterZhengzhuangs.forEach(function(zhengzhuang) {

			$("#zhengzhuangList").append('<div id= "zhengzhuangList"><div data-role="collapsible">           <h3>' + zhengzhuang.cname + '</h3>           <p>症状：' + zhengzhuang.zhengzhuangs + '</p>         <p>治法：' + zhengzhuang.zhifa + '</p>        <p>方药：' + zhengzhuang.fangyao + '</p>        </div> ')
		});

		if($scope.currentEnd == $scope.showlimit) {
			$scope.$apply();
		}

		//可用来刷新动态html的jm效果
		$('#zhenliao_index').trigger('pagecreate');
	};
}
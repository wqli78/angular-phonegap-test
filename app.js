'use strict';



var zhongyi = angular.module('zhongyi', ['zuserServices','Questions', 'ui']). //注入服务
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/index', {
		templateUrl: 'views/index.html',
		controller: IndexCtrl
	}).
	when('/zhongyi/edit/:id', {
		templateUrl: 'views/edit.html',
		controller: ZuserEditCtrl
	}).
	otherwise({
		redirectTo: '/index'
	});
}]);

zhongyi.value('ui.config',{
	select2: {
		allowClear: true
	}
});

zhongyi.value('ui.config', {
// The ui-jq directive namespace
jq: {
// The Tooltip namespace
tooltip: {
// Tooltip options. This object will be used as the defaults
placement: 'right'
}
}
});
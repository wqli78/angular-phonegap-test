'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
value('version', '0.1');


angular.module('Questions', ['ngResource']).factory('Questions', function($resource) {
	return $resource('questions/:gradeName.json', {}, {
		'query': {
			method: 'GET',
			params: {},
			isArray: true
		}
	});
});

var remoteUrl = 'http://localhost:3000/api/getQuestion';
angular.module('RemoteQuestions', ['ngResource']).factory('RemoteQuestions', function($resource) {
	return $resource(remoteUrl, {alt:'json', callback:'JSON_CALLBACK'}, {
		'query': {
			method: 'GET',
			params: {},
			// isArray: true
		},
		'jsonp': {
			method: 'JSONP',
			params: {},
			// isArray: true
		}
	});
});

function BuzzController($resource) {
this.userId = 'googlebuzz';
this.Activity = $resource(
'https://www.googleapis.com/buzz/v1/activities/:userId/:visibility/:activityId/:comments',
{alt:'json', callback:'JSON_CALLBACK'},
{get:{method:'JSONP', params:{visibility:'@self'}}, replies: {method:'JSONP', params:{visibility:'@self', comments:'@comments'}}}
);
}
 
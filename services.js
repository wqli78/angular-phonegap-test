'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
value('version', '0.1');


angular.module('Questions', ['ngResource']).factory('Questions', function($resource) {
	return $resource('questions/youeryuan.json', {}, {
		'query': {
			method: 'GET',
			params: {},
			isArray: true
		}
	});
});
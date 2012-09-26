
// Declare app level module which depends on filters, and services
var phonecat = angular.module('phonecat', ['phonecatFilters', 'phonecatServices'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/phones', {
        templateUrl: 'views/phoneList.html',
        controller: 'PhoneListCtrl'
      })
      .when('/phones/:phoneId', {
        templateUrl: 'views/phoneDetail.html',
        controller: 'PhoneDetailCtrl'
      })
      .otherwise({
        redirectTo: 'phones'
      });
  }]);

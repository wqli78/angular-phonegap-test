
phonecat.controller('PhoneListCtrl', function($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
});

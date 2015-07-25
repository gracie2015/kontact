'use strict'

var registerController = kontactApp.controller('registerCtrl', function($scope, $http){
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.username = '';
  $scope.password = '';
  
  $scope.register = function() {
    $http.post('/registerUsers/register',{
      firstname : $scope.firstName,
      lastname : $scope.lastName,
      username : $scope.username,
      password : $scope.password
    }).success(function(data) {
      //not defined yet...
    });
  };
});
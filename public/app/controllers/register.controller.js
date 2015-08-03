'use strict'

var registerController = kontactApp.controller('registerCtrl', function($scope, $http, $location){
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.username = '';
  $scope.password = '';
  
  $scope.register = function() {
    $http.post('/register',{
      firstname : $scope.firstName,
      lastname : $scope.lastName,
      username : $scope.username,
      password : $scope.password
    }).success(function(data) {
     $location.path('/login'); 
    });
  };
});
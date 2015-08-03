'use strict'

var loginController = kontactApp.controller('loginCtrl', function($scope, $window, $http, $location, UserAuthFactory, AuthenticationFactory) {
  
  $scope.username = '';
  $scope.password = '';

  $scope.login = function(){
    if($scope.username !== undefined && $scope.password !== undefined){
      UserAuthFactory.login($scope.username, $scope.password).success(function(data){
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = data.user.username;
 alert("window.sessionStorage.token: " + data.token);
 alert("window.sessionStorage.user: " + data.user.username);
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh

 alert("login successfull!");
          $location.path("/list");
    }).error(function(status){
      alert('something went wrong!');
    })
    }
    else{
      alert("invalid credentials!");
    } 
  };
});

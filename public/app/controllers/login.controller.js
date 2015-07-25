'user strict'

var loginController = kontactApp.controller('loginCtrl', function($scope, $http) {
  
  $scope.username = '';
  $scope.password = '';

  $scope.login = function(){
    $http.post('/registerUsers/checklogin',{
      username: $scope.username,
      password: $scope.password
    }).success(function(data){
      //not yet defined...
    });
  };
});
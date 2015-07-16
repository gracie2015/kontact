'use strict';

var addUserDlgController = kontactApp.controller('AddUserDlgCtrl', function($scope, $http, $modalInstance) {
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.gender = '';
  $scope.cell = '';
  $scope.email = '';
  
  $scope.addUser = function() {
    $http.post('/users/', {
      firstname: $scope.firstName,
      lastname: $scope.lastName,
      gender: $scope.gender,
      cell: $scope.cell,
      email: $scope.email
    }).success(function(data) {
      $modalInstance.close();
    });
  }
  
});

var listController = kontactApp.controller('ListCtrl', function($scope, $http, $modal) {
  $scope.getUsers = function() {
    $http.get('/users/')
    .then(function(response) {
      $scope.users = response.data;
    });
  };
  
  $scope.getUsers();
  
  $scope.genderText = function(gender) {
    if (gender === 'M') {
      return 'Male';
    }
    return 'Female';
  };
  
  $scope.openAddUserDlg = function() {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'addUserDlg.html',
      controller: 'AddUserDlgCtrl'
    });
    
    modalInstance.result.then(function() {
      $scope.getUsers();
    }, function() {
    });
  };
  
  $scope.onChange = function(idx) {
    $scope.selectedId = idx;
  };
  
  $scope.delUser = function() {
    //alert($scope.selectedId);
    $http.delete('/users/' + $scope.selectedId)
      .success(function(data) {
        $scope.getUsers();
      });
  }
});
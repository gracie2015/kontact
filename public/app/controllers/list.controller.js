'use strict';

var addUserDlgController = kontactApp.controller('AddUserDlgCtrl', function($scope, $http, $modalInstance) {
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.gender = '';
  $scope.cell = '';
  $scope.email = '';
  $scope.location = '';
  
  $scope.addUser = function() {
    
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': $scope.location }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var coords = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng()
        };
        
        $http.post('/users/', {
          firstname: $scope.firstName,
          lastname: $scope.lastName,
          gender: $scope.gender,
          cell: $scope.cell,
          email: $scope.email,
          coords: coords,
          location: $scope.location
          
        }).success(function(data) {
          $modalInstance.close();
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };
  
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
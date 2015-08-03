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
        
        $http.post('/kontact/v1/contacts/', {
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

var modifyUserDlgController = kontactApp.controller('ModifyUserDlgCtrl', function($scope, $http, $modalInstance, selectedId) {

  $scope.id = selectedId;
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.gender = '';
  $scope.cell = '';
  $scope.email = '';
  $scope.location = '';
  
  $scope.modifyUser = function() {
    alert("inside modifyUser, id is  "+$scope.id);
    
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': $scope.location }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var coords = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng()
        };
       
        $http.post(('/kontact/v1/contacts/' + $scope.id), {
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
  $scope.getContacts = function() {
    $http.get('/kontact/v1/contacts/')
    .then(function(response) {
      $scope.contacts = response.data;
    });
  };
  
  $scope.getContacts();
  
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
      $scope.getContacts();
    }, function() {
    });
  };
  
  
  
  $scope.onChange = function(idx) {
    $scope.selectedId = idx;
  };
  
  $scope.openModifyUserDlg = function() {
    alert("hello: " + $scope.selectedId);// hello 2...
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'modifyUserDlg.html',
      controller: 'ModifyUserDlgCtrl',
      resolve:{
        selectedId: function(){
          return $scope.selectedId;
        }
      }
    });
    
    modalInstance.result.then(function() {
      $scope.getContacts();
    }, function() {
    });
  };
  
  $scope.delUser = function() {
    alert($scope.selectedId);
    $http.delete('/kontact/v1/contacts/' + $scope.selectedId)
      .success(function(data) {
        $scope.getContacts();
      });
  }
});
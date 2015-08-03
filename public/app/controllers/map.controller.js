'use strict';

var mapController = kontactApp.controller('MapCtrl', function($scope, $http) {
  $scope.center = {
    latitude: 47.5,
    longitude: -122.2
  };
   
  $scope.getContacts = function() {
    $http.get('/kontact/v1/contacts/')
    .then(function(response) {
      $scope.contacts = response.data;
      
    });
  };
  
  $scope.getContacts();
 
  $scope.zoom = 9;
  
  $scope.selectedMarker = null;
  $scope.showInfoWindow = false;
  
  $scope.markerClick = function (marker, event, obj) {
    $scope.selectedMarker = obj;
    $scope.showInfoWindow = true;
  };

});


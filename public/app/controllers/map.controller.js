'use strict';

var mapController = kontactApp.controller('MapCtrl', function($scope, $http) {
  $scope.center = {
    latitude: 47.5,
    longitude: -122.2
  };
  
  // $scope.markers = [];
   
  $scope.getUsers = function() {
    $http.get('/users/')
    .then(function(response) {
      $scope.users = response.data;
      /*
      angular.forEach($scope.users, function (val, idx) {
        var userMarker = {
          id: val.id,
          coords: val.coords
        };
        $scope.markers.push(userMarker);
      });
      */
    });
  };
  
  $scope.getUsers();
 
  $scope.zoom = 9;
  
  $scope.selectedMarker = null;
  $scope.showInfoWindow = false;
  
  $scope.markerClick = function (marker, event, obj) {
    $scope.selectedMarker = obj;
    $scope.showInfoWindow = true;
  };

});

/*
var mapController = kontactApp.controller('MapCtrl', function($scope) {
  $scope.center = {
    latitude: 47.5,
    longitude: -122.2
  };
  $scope.markers = [
    {
      id: 0,
      coords: {
        latitude: 47.618819,
        longitude: -122.168126
      },
      data: 'Bellevue'
    },
    {
      id: 1,
      coords:{
        latitude: 47.673406,
        longitude: -122.119031
      },
      data: 'Redmond'
    }
    
    ];
  $scope.zoom = 9;
  
  $scope.selectedMarker = null;
  $scope.showInfoWindow = false;
  
  $scope.markerClick = function (marker, event, obj) {
    $scope.selectedMarker = obj;
    $scope.showInfoWindow = true;
  };

});
*/
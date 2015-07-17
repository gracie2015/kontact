'use strict';

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
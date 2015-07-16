'use strict';

var mapController = kontactApp.controller('MapCtrl', function($scope) {
  $scope.center = {
    latitude: 45,
    longitude: -73
  };
  $scope.markers = [];
  $scope.zoom = 8;
});
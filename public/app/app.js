'use strict';

var kontactApp = angular.module('kontactApp', [
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
]);

kontactApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/list');
  $stateProvider
    .state('list', {
      url: '/list',
      views:{
        'navbar': {
          templateUrl: 'app/views/navbar.html'
        },
        'content': {
          templateUrl: 'app/views/list.html',
          controller: 'ListCtrl'
        }
      }
    })
    
    .state('map', {
      url: '/map',
      views: {
        'navbar': {
          templateUrl: 'app/views/navbar.html'
        },
        'content': {
          templateUrl: 'app/views/map.html',
          controller: 'MapCtrl'
        }
      }
    })
});
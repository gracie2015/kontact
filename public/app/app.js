'use strict';

var kontactApp = angular.module('kontactApp', [
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
]);

kontactApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login',{
      url: '/login',
      views: {
        'content': {
          templateUrl: 'app/views/login.html',
          controller: 'loginCtrl'
        }
      }
    })
    .state('register',{
      url: '/register',
      views: {
        'content':{
          templateUrl: 'app/views/register.html',
          controller: 'registerCtrl'
        }
      }
    })
    .state('list', {
      url: '/list',
      views: {
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
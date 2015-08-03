'use strict';

var kontactApp = angular.module('kontactApp', [
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
]);

kontactApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $httpProvider.interceptors.push('TokenInterceptor');
  
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

kontactApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;

    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;

    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
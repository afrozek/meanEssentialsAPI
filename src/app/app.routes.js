(function() {
  'use strict';




  angular
    .module('app')
    .config(routerConfig);

    routerConfig.$inject = ['$stateProvider','$urlRouterProvider', '$locationProvider','$httpProvider'];

  /** @ngInject */
   function routerConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider


      //attach resolve prop to state obj if it doesnt already exist
      .decorator('path', function(state, parentFn) {
      //console.log("configuring states") 
          if (state.self.resolve === undefined) {
            state.self.resolve = {};
            state.resolve = state.self.resolve;
          }
          return parentFn(state);
      })
  

      .state('app', { 
        abstract: true,
        templateUrl: 'app/app.view.html',
        controller: 'appController',
        controllerAs: 'appCtrl',
        data: {
          requireAuth: false
        }
      })

      .state('app.landing', {
        abstract: true,
        templateUrl: 'app/appModules/landing/landing.view.html',
        controller: 'landingController',
        controllerAs: 'landingCtrl',
        data: {
          requireAuth: false
        }
      })

      .state('app.landing.home', {
        url: '/',
        templateUrl: 'app/appModules/landing/landingHome.view.html',
        
      })


      .state('app.auth', {
        abstract: true,
        templateUrl: 'app/appModules/auth/auth.view.html',
        
      })

      .state('app.auth.login', {
        url: '/login',
        templateUrl: 'app/appModules/login/login.view.html',
        
      })

      .state('app.auth.signup', {
        url: '/signup',
        templateUrl: 'app/appModules/signup/signup.view.html',
        
      })

      .state('app.auth.signupSuccess', {
        url: '/signupSuccess',
        controller: 'signupController',
        controllerAs: 'signupCtrl',
        templateUrl: 'app/appModules/signup/signupSuccess.view.html',
        
      })

      .state('app.auth.activate', {
        url: '/activate/:uid/:token',
        controller: 'activateController',
        controllerAs: 'activateCtrl',
        templateUrl: 'app/appModules/activate/activate.view.html',
        
      })

      .state('app.auth.forgotUsername', {
        url: '/forgotUsername/',
        controller: 'forgotUsernameController',
        controllerAs: 'forgotUsernameCtrl',
        templateUrl: 'app/appModules/forgot/forgotUsername.view.html',
        
      })

      .state('test', {
        url: '/test',
        template: '<h1>HI!</h1>',

      })

      .state('app.dashboard', {
          abstract: false,
          url: '/dashboard',
          templateUrl: 'app/appModules/dashboard/dashboard.view.html',
          controller: 'dashboardController',
          controllerAs: 'dashboardCtrl',
          data: {
            requireAuth: true
          },
          redirectTo: {state: 'app.dashboard.home'}
          // resolve: {
          //   isAuthenticated: ['authService' ,function(authService){
          //     return authService.isAuthenticated();
          //   }]
          // }
        })

      .state('app.dashboard.home', {
        url: '/home',
        template: '<h1> dashboard home </h1>',
        
      })






      $httpProvider.interceptors.push('interceptorService');





    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  }//end routerConfig function




})();
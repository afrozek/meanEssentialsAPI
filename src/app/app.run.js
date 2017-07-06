

(function(){

'use strict';

	angular
	.module('app')
	.run(run)

	run.$inject = ['$rootScope', '$state', '$templateCache', 'browserCheckService','scriptBlockerCheckService','tabSessionSyncService', 'authService', '$http', '$q'];

	function run($rootScope, $state, $templateCache, browserCheckService, scriptBlockerCheckService, tabSessionSyncService, authService, $http, $q) {

	   $rootScope.$on('$viewContentLoaded', function() {
	      $templateCache.removeAll();
	   });

	 // console.log($http);

	 //browser check  
	 browserCheckService.checkBrowser();
	 
	 //script blocker check
	 scriptBlockerCheckService.checkScripts();

	 //sync session storage
	 tabSessionSyncService.sync();




	 $rootScope.$on('$stateChangeError', function ( toState, fromState) {
           
          // event.preventDefault();
           console.log("State Change Error");
           // $state.go('app.docs')
        
      });




	 //before state change
	 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	 		 console.log("going to: ", toState.name)
	 		 authService.stateRedirectCheck(event, toState);	
	 		 return authService.stateChangeAuthCheck(event, toState);

	 });

	 $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
	

	 })


	 




	} //end run

})();
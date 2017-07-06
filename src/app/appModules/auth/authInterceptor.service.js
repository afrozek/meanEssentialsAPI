(function(){
	'use strict'

	angular
    	.module('auth')
    	.factory('interceptorService', interceptorService);

    interceptorService.$inject = ['notifyService', '$rootScope', '$q']

    function interceptorService( notifyService, $rootScope, $q) {


    	var service = {

          request: request,
          // requestError: requestError,
          // response: response,
          responseError: responseError

    	};

    	return service;

    	////////////

    	function request(config) {

	      // var token = authService.getToken();

       //    if(token){
       //      // console.log("setting Headers");
       //      config.headers['Authorization'] = 'Token ' + token;
       //    }

          return config;

	    }

	    function responseError(error) {

            // if our server returns a 403 forbidden response
                console.log("interceptorResponseError")
                $rootScope.$emit("notAuthenticated");  
                return $q.reject(error) ;
	    }



    } //end authService

	
// end IIFE
})();


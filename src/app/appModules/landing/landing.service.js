(function(){
	'use strict'

	angular
    	.module('landing')
    	.factory('landingService', landingService);

    landingService.$inject = []

    function landingService() {
    	var service = {

    		error: error,
    		info: info,
    		success: success

    	};

    	return service;

    	////////////

    	function error() {
	      /* */
	    }

	    function info() {
	      /* */
          console.log("landingService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


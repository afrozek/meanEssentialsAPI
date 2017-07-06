(function(){
	'use strict'

	angular
    	.module('forgot')
    	.factory('forgotService', forgotService);

    forgotService.$inject = []

    function forgotService() {
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
          console.log("forgotService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


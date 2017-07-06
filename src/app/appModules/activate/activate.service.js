(function(){
	'use strict'

	angular
    	.module('activate')
    	.factory('activateService', activateService);

    activateService.$inject = []

    function activateService() {
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
          console.log("activateService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


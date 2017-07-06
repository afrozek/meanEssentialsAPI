(function(){
	'use strict'

	angular
    	.module('dashboard')
    	.factory('dashboardService', dashboardService);

    dashboardService.$inject = [];

    function dashboardService() {
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
          console.log("dashboardService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


(function(){
	'use strict'

	angular
    	.module('api')
    	.factory('apiService', apiService);

    apiService.$inject = [];

    function apiService() {
    	var service = {

    		rippleBaseUrl: '',
            tangentBaseUrl: '',
            consellationBaseUrl: '',
            customerSupportBaseUrl: ''


    	};

    	return service;

    	////////////

    	function error() {
	      /* */
	    }

	    function info() {
	      /* */
          console.log("apiService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


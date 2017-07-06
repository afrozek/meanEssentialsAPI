(function(){
	'use strict'

	angular
    	.module('token')
    	.factory('tokenService', tokenService);

    tokenService.$inject = ['$window']

    function tokenService($window) {
    	
        var service = {

    		setToken: setToken,
            getToken: getToken,
            removeToken: removeToken

    	};

    	return service;

    	////////////

    	function setToken (token) {
            $window.sessionStorage.setItem('userToken', token);
        }

        function getToken () {
            var token = $window.sessionStorage.getItem('userToken');
            return token;
        }

        function removeToken () {
            $window.sessionStorage.removeItem('userToken');
        }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


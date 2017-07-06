(function(){
	'use strict'

	angular
    	.module('tabSessionSync')
    	.factory('tabSessionSyncService', tabSessionSyncService);

    tabSessionSyncService.$inject = []

    function tabSessionSyncService() {
    	var service = {

    		sync: sync,

    	};

    	return service;

    	////////////

    	function sync() {
            //session manager bewtween tabs
   

                if (!sessionStorage.length || typeof(sessionStorage) == 'undefined') {
                    // Ask other tabs for session storage
                    localStorage.setItem('getSessionStorage', Date.now());
                };

                window.addEventListener('storage', function(event) {

                    //console.log('storage event', event);

                    if (event.key == 'getSessionStorage') {
                        // Some tab asked for the sessionStorage -> send it

                        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
                        localStorage.removeItem('sessionStorage');

                    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
                        // sessionStorage is empty -> fill it

                        var data = JSON.parse(event.newValue),
                                    value;

                        for (var key in data) {
                            sessionStorage.setItem(key, data[key]);
                        }

                        // showSessionStorage();
                    }
                });

                window.onbeforeunload = function() {
                    //sessionStorage.clear();
                };

         
	    }

	    function info() {
	      /* */
          console.log("tabSessionSyncService");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();


(function(){
	'use strict'

	angular
    	.module('browserCheck')
    	.factory('browserCheckService', browserCheckService);

    browserCheckService.$inject = ['bowser', '$state', '$location']

    function browserCheckService(bowser, $state, $location) {
    	var service = {
    		checkBrowser: checkBrowser,
            oldBrowser: false
    	};

    	return service;

    	////////////

    	function checkBrowser() {

           

	        if(bowser.mobile){

            }
            else if(bowser.tablet){

            }
            else{

                  // console.log(bowser)
                  //browser check

                  if (bowser.chrome && bowser.version < 40) {
                    service.oldBrowser = true;
                  }

                  //browser check
                  if(bowser.msie && bowser.version < 9) {
                    service.oldBrowser = true;
                  }

                  //browser check
                  if(bowser.safari && bowser.version < 9) {
                    service.oldBrowser = true;
                  }

                  //browser check
                  if(bowser.firefox && bowser.version < 49) {
                    service.oldBrowser = true;
                  }

                  //browser check
                  if(bowser.opera && bowser.version < 10) {
                    service.oldBrowser = true;
                  }
            }

            if(service.oldBrowser == true){
                // $location.path('/updatebrowser')
                document.write("Your " + bowser.name + " browser is out of date. Please update it for the best experience");
            }


	    } // end check browser



    }

	
// end IIFE
})();


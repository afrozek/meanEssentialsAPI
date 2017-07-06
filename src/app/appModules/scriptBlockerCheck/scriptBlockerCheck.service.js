(function(){
	'use strict'

	angular
    	.module('scriptBlockerCheck')
    	.factory('scriptBlockerCheckService', scriptBlockerCheckService);

    scriptBlockerCheckService.$inject = []

    function scriptBlockerCheckService() {
    	var service = {

            checkScripts: checkScripts,
            scriptsBlocked: false

    	};

    	return service;

    	////////////

        function checkScripts() {
            console.log("Called")
            checkStripe()
                .then(checkRecaptcha)
                .then(gstatic)
        }



        function checkStripe(){

          return $.getScript('https://js.stripe.com/v2/')
              .done(function( script, textStatus ) {
                console.log("completed stripe ajax request");
              })
              .fail(function( jqxhr, settings, exception ) {
                    console.log("failed stripe");
                    service.scriptsBlocked = true;
                    return scriptErrorHandler("Stripe");
            }); // end getScript
        }//end checkStripe

        function checkRecaptcha(){

          return $.getScript('https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit')
              .done(function( script, textStatus ) {
                console.log("completed stripe ajax request");
              })
              .fail(function( jqxhr, settings, exception ) {
                    console.log("failed recaptcha");
                    service.scriptsBlocked = true;
                    return scriptErrorHandler("Recaptcha");
            }); // end getScript
        }//end checkStripe

        function gstatic(){

          return $.getScript('https://www.gstatic.com/recaptcha/api2/r20161004153729/recaptcha__en.js')
              .done(function( script, textStatus ) {
                console.log("completed stripe ajax request");
              })
              .fail(function( jqxhr, settings, exception ) {
                    console.log("failed gstatic");
                    service.scriptsBlocked = true;
                    return scriptErrorHandler("Gstatic");
            }); // end getScript
        }//end checkStripe

        function scriptErrorHandler(scriptName){
            document.write("Failed to load " + scriptName + ". Please ensure all script blockers are disabled.")
        }


    }//end scriptBlockerCheckService

	
// end IIFE
})();


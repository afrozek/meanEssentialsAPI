(function(){
	'use strict'

	angular
    	.module('notify')
    	.factory('notifyService', notifyService);

    notifyService.$inject = ['$timeout']

    function notifyService($timeout) {

    	var service = {
    		
    		info: info,
            success: success,
            error: error,
            removeNotification: removeNotification,
            messages : []
    	};

        //dismisses after 5 seconds
        var duration = 6000;

        

    	return service;

    	////////////

    	function error() {
	      /* */
	    }

	    function info(message) {
        message = {class: 'info', data: message};
        //check for dupes
            if(findMessage(message) !== false)
                return false;

          //no dupes, push message  
          service.messages.push(message) 

          //remove after x seconds
          $timeout(function(){
            service.messages.splice(0,1);
          }, duration)

	    } //end info

        function success(message) {
        message = {class: 'success', data: message};
        //check for dupes
            if(findMessage(message) !== false)
                return false;

          //no dupes, push message  
          service.messages.push(message)  

          //remove after x seconds
          $timeout(function(){
            service.messages.splice(0,1);
          }, duration)

        } //end success

        function error(message) {
        message = {class: 'error', data: message};
        //check for dupes
            if(findMessage(message) !== false)
                return false;

          //no dupes, push message  
          service.messages.push(message)  

          //remove after x seconds
          $timeout(function(){
            service.messages.splice(0,1);
          }, duration)

        } //end error

        function removeNotification(message) {

            var found = findMessage(message);
            if(found !== false){
                 service.messages.splice(found, 1);
            }
               
        }//end removeNotification

        //searches message array for message
        //returns index of message if found
        function findMessage(message){
             for(var i = 0; i < service.messages.length; i++) { 
                if(service.messages[i].data == message.data){
                    return i;
                }
                
            } //end for
            return false;
        }//end find message


    }

	
// end IIFE
})();


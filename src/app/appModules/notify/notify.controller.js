(function() {
	'use strict'

	angular
		.module('notify')
		.controller('notifyController', notifyController)

	notifyController.$inject = ['$scope', 'notifyService']

	function notifyController($scope, notifyService) {


			

			// notifyService.info("testing the service");
			$scope.messages = notifyService.messages;

			$scope.info = function(message){
				console.log("bb")
				notifyService.info(message);
			}

			$scope.success = function(message){
				notifyService.success(message);
			}

			$scope.error = function(message){
				notifyService.error(message);
			}

			$scope.close = function(message){
				notifyService.removeNotification(message);
			}
		
	}


//end IIFE
})();




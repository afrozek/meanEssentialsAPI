(function() {
	'use strict'

	angular
		.module('activate')
		.controller('activateController', activateController)

	activateController.$inject = ['$timeout', "authService", "$stateParams"]

	function activateController($timeout, authService, $stateParams) {

	    var vm = this;

	    var uid = null;
	    var token = null;


	    init();


	    function init(){
	    	//clears everything
	    	clear();
	    	getCredentials();
	    	activateAccount();

	    }

	    //original state
	    function clear(){
	    	vm.activateStatus = null;
	    	vm.heading = null;
	   		vm.subHeading = null;
	   		vm.imageSrc = null;
	   		vm.buttonStateRef = null;
	   		vm.buttonText = null;
	    }

	    function getCredentials() {
	    	uid = $stateParams.uid;
	    	token = $stateParams.token;

	    	if(!uid || !token)
	    		return false;
	    	else return true;

	    }



	    function activateAccount() {
	    	if(getCredentials()){
	    		var formData = {uid: uid, token: token }
	    		authService.activateAccount(formData).then(activateAccountSuccess, activateAccountError);
	    	}
		    	 
		    else 
		    	return activateAccountError();	
	    }

	    function activateAccountSuccess() {
    		vm.activateStatus = true;
	    	vm.heading = 'Account Activated';
	   		vm.subHeading = 'Your Account has been successfully activated.';
	   		vm.imageSrc = 'assets/images/gridbotSuccess@3x.png';
	   		vm.buttonStateRef = "app.dashboard";
	   		vm.buttonText = "Go to my Dashboard";
	    }

	    function activateAccountError() {
		    vm.activateStatus = false;
	    	vm.heading = 'Account Activation Failed';
	   		vm.subHeading = 'We were unable activate your account. Please contact support.';
	   		vm.imageSrc = 'assets/images/gridbotError@2x.png';
	   		vm.buttonStateRef = "app.dashboard";
	   		vm.buttonText = "Contact Support";
	    }



	    function refresh() {
	      /* */
	    }

	    function search() {
	      /* */
	    }
	}


//end IIFE
})();




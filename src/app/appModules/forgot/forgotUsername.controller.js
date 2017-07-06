(function() {
	'use strict'

	angular
		.module('forgot')
		.controller('forgotUsernameController', forgotUsernameController)

	forgotUsernameController.$inject = ['$state', 'authService'];

	function forgotUsernameController($state, authService) {
	    var vm = this;

	    vm.forgotUsernameSubmit = forgotUsernameSubmit;
	    vm.forgotUsernameForm = {};
	    vm.forgotUsernameStatus = null;
	    // vm.submitForm = false;
	    vm.validateFormFields = validateFormFields;


	    ////////////

	    function forgotUsernameSubmit(form) {

	    	//first validate form
	    	if(validateFormFields(form) == false)
	    		return false;
	    	 
	    	
	    	// vm.submitForm = true;
	    	vm.forgotUsernameStatus = 'loading';

	    	//wait 500 millisecs so they see the loading animation
	    	setTimeout(sendRequest, 1000)
	    	

	    	function sendRequest(){

	    		// make copy of data
	    		var formData = angular.copy(vm.forgotUsernameForm)

	    		//send request
	    		authService.forgotUsername(formData).then(forgotUsernameRequestHandler,forgotUsernameRequestErrorHandler);
	    	}//end sendRequest function

	    }//end forgotUsername function

	    function forgotUsernameRequestHandler(res){
	    	console.log("handled");
	    	console.log(res);
		    vm.forgotUsernameStatus = true;
		    // setTimeout(function(){
		    // 	$state.go('app.auth.signupSuccess');
		    // },100)
	    }

	    function forgotUsernameRequestErrorHandler(err){
	    	console.log(err);
	    	vm.forgotUsernameStatus = null;
	    	// vm.submitForm = false;
	    	vm.forgotUsernameError = "Failed to send email"
	    	vm.forgotUsernameForm.password = null;
	    }

	    //takes the scope version of form
	    function validateFormFields(form){

	    	var isValid = true;

	    	//email check
	    	if(form.email.$dirty || form.email.$touched || vm.forgotUsernameError ){
				var email = vm.forgotUsernameForm.email;

				// console.log("touched")
				//empty check
				if( typeof(email) == 'undefined' || email == "" || email == null){
					 form.email.customError = "please enter a valid email.";
					 isValid = false;
				}
				// else if(email.length < 3){
				// 	form.email.customError = "Minimum 3 characters";
				// 	isValid = false;
				// }
				// else if(email.length > 8){
				// 	form.email.customError = "Maximum 8 characters";
				// 	isValid = false;
				// }
				else{
					form.email.customError = "";
				}	

	    	}

	    	// recaptcha check
	    	if(!vm.recaptcha){
					 console.log("recaptcha error")
					 isValid = false;
			}

	    	return isValid;
	
	    		
	   	} //end validateFormFields

	    function clearForm() {
	    	vm.forgotUsernameForm = {};
	    }
			
			


	}//end forgotUsernameController


//end IIFE
})();


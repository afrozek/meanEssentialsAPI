(function() {
	'use strict'

	angular
		.module('signup')
		.controller('signupController', signupController)

	signupController.$inject = [ '$state','tokenService', 'authService','notifyService','$interval'];

	function signupController( $state, tokenService, authService, notifyService, $interval) {
	    var vm = this;

	    //signup page
	    vm.signup = signup;
	    vm.signupForm = {};
	    vm.signupSuccess = false;
	    vm.submitForm = false;
	    vm.validateFormFields = validateFormFields;

	    //signup success page
	    vm.resendEmail = resendEmail;
	    vm.disableResend = false;
	    vm.resendTimer = 30;



	    ////////////

	    function signup(form) {

	    	//first validate form
	    	if(validateFormFields(form) == false)
	    		return false;
	    	 
	    	
	    	vm.submitForm = true;

	    	//wait 500 millisecs so they see the loading animation
	    	setTimeout(sendRequest, 500)
	    	

	    	function sendRequest(){

	    		// make copy of data
	    		var formData = angular.copy(vm.signupForm)

	    		//send request
	    		authService.signup(formData).then(signupRequestHandler,signupRequestErrorHandler);
	    	}//end sendRequest function

	    }//end signup function

	    function signupRequestHandler(res){
	    	console.log("handled");
	    	console.log(res);
		    vm.signupSuccess = true;
		    setTimeout(function(){
		    	$state.go('app.auth.signupSuccess');
		    },100)
		    console.log(res)
	    }

	    function signupRequestErrorHandler(err){
	    	console.log(err);
	    	vm.signupSuccess = false;
	    	vm.submitForm = false;
	    	vm.signupError = "Signup Failed"
	    	vm.signupForm.password = null;
	    	vm.signupForm.confirmPass = null;
	    }

	    //takes the scope version of form
	    function validateFormFields(form){

	    	var isValid = true;

	    	//username check
	    	if(form.username.$dirty || form.username.$touched || vm.signupError ){
				var username = vm.signupForm.username;
				console.log("touched")
				//empty check
				if( typeof(username) == 'undefined' || username == "" || username == null){
					 form.username.customError = "Username field is required.";
					 isValid = false;
				}
				// else if(username.length < 3){
				// 	form.username.customError = "Minimum 3 characters";
				// 	isValid = false;
				// }
				// else if(username.length > 8){
				// 	form.username.customError = "Maximum 8 characters";
				// 	isValid = false;
				// }
				else{
					form.username.customError = "";
				}	

	    	}

	    	//email check
	    	if(form.email.$dirty || form.email.$touched || vm.signupError ){
				var email = vm.signupForm.email;
				console.log("touched")
				//empty check
				if( typeof(email) == 'undefined' || email == "" || email == null){
					 form.email.customError = "email field is required.";
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

	    	//password check
	    	if(form.username.$dirty || form.username.$touched || vm.signupError ){
				var password = vm.signupForm.password;
				console.log("touched")
				//empty check
				if( typeof(password) == 'undefined' || password == "" || password == null){
					 form.password.customError = "password field is required.";
					 isValid = false;
				}
				else if(password.length < 3){
					form.password.customError = "Minimum 3 characters";
					isValid = false;
				}
				else if(password.length > 8){
					form.password.customError = "Maximum 8 characters";
					isValid = false;
				}
				else{
					form.password.customError = "";
				}	

	    	}

	    	//password check
	    	if(form.username.$dirty || form.username.$touched || vm.signupError ){
	    		var password = vm.signupForm.password;
				var confirmPass = vm.signupForm.confirmPass;
				console.log("touched")
				//empty check
				if( typeof(confirmPass) == 'undefined' || confirmPass == "" || confirmPass == null){
					 form.confirmPass.customError = "This field is required.";
					 isValid = false;
				}
				else if(confirmPass.length < 3){
					form.confirmPass.customError = "Minimum 3 characters";
					isValid = false;
				}
				else if(confirmPass.length > 8){
					form.confirmPass.customError = "Maximum 8 characters";
					isValid = false;
				}
				else if(confirmPass !== password){
					form.confirmPass.customError = "Passwords Don't Match";
					isValid = false;
				}
				else{
					form.confirmPass.customError = "";
				}	

	    	}

	    	//password check
	    	if(form.username.$dirty || form.username.$touched || vm.signupError ){
	    		var password = vm.signupForm.password;
				var confirmPass = vm.signupForm.confirmPass;
				console.log("touched")
				//empty check
				if( typeof(confirmPass) == 'undefined' || confirmPass == "" || confirmPass == null){
					 form.confirmPass.customError = "This field is required.";
					 isValid = false;
				}
				else if(confirmPass.length < 3){
					form.confirmPass.customError = "Minimum 3 characters";
					isValid = false;
				}
				else if(confirmPass.length > 8){
					form.confirmPass.customError = "Maximum 8 characters";
					isValid = false;
				}
				else if(confirmPass !== password){
					form.confirmPass.customError = "Passwords Don't Match";
					isValid = false;
				}
				else{
					form.confirmPass.customError = "";
				}	

	    	}

	  //   	//recaptcha check
	  //   	if(!vm.recaptcha){
			// 		 console.log("recaptcha error")
			// 		 isValid = false;
			// }

	    	return isValid;

			
	    		
	   	} //end validateFormFields


	   	function resendEmail(){

		    if(vm.disableResend == true) 
		      return notifyService.info("Please wait until the timer expires before resending again.");

		    vm.startResendTimer();

		    var token = authService.getToken();

		        authService.resendActivationEmail().then(function(response) {
		        	notifyService.success("Resending Account Activation email.");

		        }, function(error) {
		        	console.log(error)
		        	authService.removeToken();
		        	notifyService.error("Sorry we were unable to resend the Activation email. Please contact support");
		        });

	   	}//end resendEmail

	   

	    vm.startResendTimer = function() {
	    	vm.resendTimer = 30;
	   		vm.disableResend = true;

	     var intervalPromise = $interval(function(){
	        if(vm.resendTimer != 0) {
	          vm.resendTimer--; 
	          console.log(vm.resendTimer)
	        }
	        else{
	          vm.disableResend = false;
	          $interval.cancel(intervalPromise);
	          vm.resendTimer = 30;
	        }

	      }, 1000)

	    } //end startResendTimer

			
			


	}//end signupController


//end IIFE
})();



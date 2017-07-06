(function() {
	'use strict'

	angular
		.module('login')
		.controller('loginController', loginController)

	loginController.$inject = ['loginService', '$state','tokenService', 'authService'];

	function loginController( loginService, $state, tokenService, authService) {
	    var vm = this;

	    vm.login = login;
	    vm.loginForm = {};
	    vm.loginSuccess = false;
	    vm.submitForm = false;
	    vm.validateFormFields = validateFormFields;


	    // authService.getProfile().then(function(res){
	    // 	console.log(res);
	    // },function(err) {
	    // 	console.log(err);
	    // })


	    ////////////

	    function login(form) {

	    	//first validate form
	    	if(validateFormFields(form) == false)
	    		return false;
	    	 
	    	
	    	vm.submitForm = true;

	    	//wait 500 millisecs so they see the loading animation
	    	setTimeout(sendRequest, 500)
	    	

	    	function sendRequest(){

	    		// make copy of data
	    		var formData = angular.copy(vm.loginForm)

	    		//send request
	    		authService.login(formData).then(loginRequestHandler,loginRequestErrorHandler);
	    	}//end sendRequest function

	    }//end login function

	    function loginRequestHandler(res){
	    	// console.log("handled");
	    	// console.log(res);
		    vm.loginSuccess = true;
		    setTimeout(function(){
		    	// console.log("Going to dashboard")
		    	$state.go('app.dashboard.home');
		    },100)
	    }

	    function loginRequestErrorHandler(err){
	    	// console.log(err);
	    	vm.loginSuccess = false;
	    	vm.submitForm = false;
	    	vm.loginError = "Login Failed"
	    	vm.loginForm.password = null;
	    }

	    //takes the scope version of form
	    function validateFormFields(form){

	    	var isValid = true;

	    	//username check
	    	if(form.username.$dirty || form.username.$touched || vm.loginError ){
				var username = vm.loginForm.username;
				// console.log("touched")
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

	    	//password check
	    	if(form.username.$dirty || form.username.$touched || vm.loginError ){
				var password = vm.loginForm.password;
				// console.log("touched")
				//empty check
				if( typeof(password) == 'undefined' || password == "" || password == null){
					 form.password.customError = "password field is required.";
					 isValid = false;
				}
				// else if(password.length < 3){
				// 	form.password.customError = "Minimum 3 characters";
				// 	isValid = false;
				// }
				// else if(password.length > 8){
				// 	form.password.customError = "Maximum 8 characters";
				// 	isValid = false;
				// }
				else{
					form.password.customError = "";
				}	

	    	}

	    	return isValid;

			
	    		
	   	} //end validateFormFields

	    function clearForm() {
	    	vm.loginForm = {};
	    }
			
			


	}//end loginController


//end IIFE
})();



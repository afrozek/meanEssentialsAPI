(function(){
	'use strict'

	angular
    	.module('login')
    	.factory('loginService', loginService);

    loginService.$inject = ['$http','tokenService', '$state', 'authService','$rootScope' ];

    function loginService( $http , tokenService, $state, authService, $rootScope) {

        var path = "http://localhost:3100/api/users";

    	var service = {

    		login: login,
            logout: logout,
            isLoggedIn : isLoggedIn

    	};

    	return service;

    	////////////

    	function login( form ) {
             $http.post(path + "/login", form).then(function(res) {

                console.log(res);
                if(res.data.success == true){
                    //clear the form
                    form = {};

                    //emit loggedin to appCtrl
                    $rootScope.$emit("loggedIn");

                    //set the token
                    tokenService.setToken(res.data.token)

                    //send user message
                    toastr.success(res.data.message);
                    
                    //redirects based on the profile user level
                    authService.redirectDefault();
                }
                else toastr.error(res.data.message);
            })
        }

        function logout() {
            tokenService.removeToken();
            $rootScope.$emit("loggedOut");
            $state.go('app.login')

        }

        function isLoggedIn() {
              // emits loggedin, else does nothing 
              authService.isAuthenticated();
        }


    }

	
// end IIFE
})();

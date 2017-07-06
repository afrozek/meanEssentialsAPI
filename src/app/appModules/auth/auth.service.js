(function(){
    'use strict'

    angular
        .module('auth')
        .factory('authService', authService);

    authService.$inject = ['tokenService', '$state', '$http', '$q', '$rootScope','apiService', '$log', '$window', 'notifyService','$urlRouter', '$cookies']

    function authService( tokenService, $state, $http , $q, $rootScope, apiService, $log, $window, notifyService, $urlRouter, $cookies) {

        var service = {
            signup: signup,
            login: login,
            logout: logout,
            getProfile: getProfile,
            setToken: setToken,
            getToken: getToken,
            removeToken: removeToken,
            notAuthenticated: notAuthenticated,
            isAuthenticated: isAuthenticated,
            stateChangeAuthCheck: stateChangeAuthCheck,
            resendActivationEmail: resendActivationEmail,
            stateRedirectCheck : stateRedirectCheck,
            activateAccount: activateAccount,
            forgotUsername: forgotUsername,
            setListeners: setListeners,
        }

        //set base routes
        var ripple = apiService.rippleBaseUrl;


     

        return service;
        setListeners();

        function setListeners(){
            console.log("setListeners")
            //listens for notAuthenticated requests from the authinterceptor
            $rootScope.$on('notAuthenticated', function() {
                console.log("On notAuthenticated")
                notAuthenticated();
            })


        }



        function signup(formData) {
            return $http.post(ripple + '/account/signup/', formData).then(function(res) {
                       

                        //set token if successful
                        if(res.data.auth_token){
                            service.setToken(res.data.auth_token);   
                        }

                        return res;
                    },function(err){
                        return $q.reject(err);
                    })//end then
        }//end signup function






        function resendActivationEmail() {
          var token = service.getToken();  
          var token = {"Authorization" : 'Token ' + token };
          return $http.post(ripple + '/account/resendActivationEmail/', token).then(function(res) {          
                        return res;
                    },function(err){
                        return $q.reject(err);
                    })//end then
        }//end resendActivationEmail


        function activateAccount(formData) {
            return $http.post(ripple + '/account/activateAccount/', formData).then(function(res) {
                       

                        //set token if successful
                        if(res.data.auth_token){
                            service.setToken(res.data.auth_token);   
                        }

                        return res;
                    },function(err){
                        return $q.reject(err);
                    })//end then
        }//end activateAccount function




        function login(formData) {

            //get user agent
            var userAgent = $window.navigator.userAgent;
            formData.device_info = userAgent;

            //check for cookie
            var udi = $cookies.get('udi');
            
            if(udi){
              formData.udi = udi;
            }

            formData = $.param(formData);

            //setheaders
            var headers = {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          };


            return $http({
              method: 'POST', 
              url: ripple + '/account/login/', 
              headers: headers,
              data: formData
            }).then(function(res) {
                //set token if successful
                if(res.data.auth_token){
                    setToken(res.data.auth_token);  
                    console.log("token: ", getToken()) 
                }
                    return res;
                },function(err){
                    console.log(err)
                    return $q.reject(err);
                })//end then





        }//end login function


        function getProfile() {

            var headers = getHeaders();

            return $http({
              method: 'POST', 
              url: ripple + '/account/getProfile/', 
              headers: headers
            }).then(function(res) {
                       

                     console.log(res);

                        return res;
                    },function(err){
                        console.log(err)
                        return $q.reject(err);
                    })//end then

        }//end getprofile function


        function logout() {
            removeToken();
            $state.go('app.landing.home')
        }

        function notAuthenticated() {

             removeToken();

             if($state.current.name != 'app.auth.login'){
                notifyService.error("Authentication Failed, Please Login.")
                $state.go('app.auth.login');
             }
        }

        //returns profile 
        function isAuthenticated() {
            console.log("isAuthenticated");
            return service.getProfile().then(function(res){
                return res;
            },function(err) {
                 //auth interceptor will take care of redirect
                 console.log("isAuthenticated: Authentication Failed")
                 notAuthenticated();
                 return $q.reject();

            })
        }

       



        //checks if state requires authentication
        function stateChangeAuthCheck(event, toState, toParams, fromState, fromParams) {
            console.log("stateChangeAuthCheck");
            if(toState.data.requireAuth){
                    console.log("adding state auth resolver");
                    return addStateAuthResolvers(toState);
                    
            }
        }

        function addStateAuthResolvers(toState) {
            
            // //attach resolve prop to state obj if it doesnt already exist
            // if(typeof(toState.resolve) == 'undefined'){
            //     console.log("adding resolve");
            //     toState.resolve = {};
            // }

            //add authresolver to resolve
            toState.resolve.authResolver = function() {
                
                console.log(toState.resolve)
                return isAuthenticated();
            }
            console.log("resolver added");
            console.log(toState)
        }


        //token managment

        function setToken (token) {
            $window.sessionStorage.setItem('token', token);
        }

        function getToken () {
            var token = $window.sessionStorage.getItem('token');
            return token;
        }

        function removeToken () {
            $window.sessionStorage.removeItem('token');
        }

        function getHeaders() {
            //grab token
            var token = getToken();
            
            //default headers
            var headers = {
                Authorization: 'Token ' + token,
            }

            return headers;
        }


        //checks the redirectTo property in the routes file and redirects
        //required for the parent ui states
        function stateRedirectCheck(event, toState, toParams) {

            if(toState.redirectTo){
                event.preventDefault();
                console.log("Redirecting To: ", toState.redirectTo.state);
                return $state.go(toState.redirectTo.state);

            }
        }


        //forgotUsername
        function forgotUsername(formData) {
            return $http.post(ripple + '/account/forgotUsername/', formData).then(function(res) {
                        return res;
                        
                    },function(err){
                        return $q.reject(err);
                    })//end then
        }//end login function



        

    }//end authService 

    
// end IIFE
})();

(function(){
angular
    .module('login')
    .directive('loginFormDirective', loginFormDirective);

function loginFormDirective() {
	return{
		restrict: 'E',
		templateUrl: 'app/appModules/login/loginForm.view.html',
		replace: true,
		controller: 'loginController',
		controllerAs: 'loginCtrl',
		link: link
	}

	function link(scope, elem, attrs) {
		var vm = scope.loginCtrl;
		// console.log(vm.loginSuccess);


		scope.$watch(function(){return vm.loginSuccess}, function(newValue, oldValue) {
            if (newValue){
                // console.log("I see a data change!");
                // elem.css("display", "none");
            }
        }, true);


		
	}//end link function


}//end loginFormDirective function

//end IIFE
})();
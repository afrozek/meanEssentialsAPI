(function(){
angular
    .module('signup')
    .directive('signupFormDirective', signupFormDirective);

function signupFormDirective() {
	return{
		restrict: 'E',
		templateUrl: 'app/appModules/signup/signupForm.view.html',
		replace: true,
		controller: 'signupController',
		controllerAs: 'signupCtrl',
		link: link
	}

	function link(scope, elem, attrs) {
		var vm = scope.signupCtrl;
		// console.log(vm.signupSuccess);


		// scope.$watch(function(){return vm.signupSuccess}, function(newValue, oldValue) {
  //           if (newValue){
  //               // console.log("I see a data change!");
  //               // elem.css("display", "none");
  //           }
  //       }, true);


		
	}//end link function


}//end signupFormDirective function

//end IIFE
})();
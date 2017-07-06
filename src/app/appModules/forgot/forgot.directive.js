(function(){
angular
    .module('forgot')
    .directive('forgotDir', forgotDir);

function forgotDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

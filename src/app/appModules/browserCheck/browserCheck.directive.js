(function(){
angular
    .module('browserCheck')
    .directive('browserCheckDir', browserCheckDir);

function browserCheckDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

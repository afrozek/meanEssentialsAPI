(function(){
angular
    .module('activate')
    .directive('activateDir', activateDir);

function activateDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

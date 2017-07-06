(function(){
angular
    .module('dashboard')
    .directive('dashboardDir', dashboardDir);

function dashboardDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

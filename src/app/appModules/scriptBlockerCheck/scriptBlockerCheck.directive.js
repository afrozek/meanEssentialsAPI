(function(){
angular
    .module('scriptBlockerCheck')
    .directive('scriptBlockerCheckDir', scriptBlockerCheckDir);

function scriptBlockerCheckDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

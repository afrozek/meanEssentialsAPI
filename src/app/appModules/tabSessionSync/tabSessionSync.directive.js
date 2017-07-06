(function(){
angular
    .module('tabSessionSync')
    .directive('tabSessionSyncDir', tabSessionSyncDir);

function tabSessionSyncDir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();

(function(){
angular
    .module('notify')
    .directive('notifyDir', notifyDir);


function notifyDir() {
	return{
		restrict: 'E',
		templateUrl: 'app/appModules/notify/notify.view.html',
		replace: true,
		controller: 'notifyController'
	}


}

//end IIFE
})();

(function() {
	'use strict'

	angular
		.module('tabSessionSync')
		.controller('tabSessionSyncCtrl', tabSessionSyncCtrl)

	tabSessionSyncCtrl.$inject = []

	function tabSessionSyncCtrl() {

	    var vm = this;

	    vm.gotoSession = gotoSession;
	    vm.refresh = refresh;
	    vm.search = search;
	    vm.sessions = [];
	    vm.title = 'tabSessionSync';

	    ////////////

	    function gotoSession() {
	      /* */
	    }

	    function refresh() {
	      /* */
	    }

	    function search() {
	      /* */
	    }
	}


//end IIFE
})();




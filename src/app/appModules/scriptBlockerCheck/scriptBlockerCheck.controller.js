(function() {
	'use strict'

	angular
		.module('scriptBlockerCheck')
		.controller('scriptBlockerCheckCtrl', scriptBlockerCheckCtrl)

	scriptBlockerCheckCtrl.$inject = []

	function scriptBlockerCheckCtrl() {

	    var vm = this;

	    vm.gotoSession = gotoSession;
	    vm.refresh = refresh;
	    vm.search = search;
	    vm.sessions = [];
	    vm.title = 'scriptBlockerCheck';

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




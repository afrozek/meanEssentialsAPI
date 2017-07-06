(function() {
	'use strict'

	angular
		.module('dashboard')
		.controller('dashboardController', dashboardController)

	dashboardController.$inject = []

	function dashboardController() {

	    var vm = this;

	    vm.gotoSession = gotoSession;
	    vm.refresh = refresh;
	    vm.search = search;
	    vm.sessions = [];
	    vm.title = 'dashboard';

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




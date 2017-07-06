#!/bin/bash
# Bash script to generate new angular modules
# Just go into the desired directory and type 
# sh comp.sh nameOfModule
# Will create a directory and the module, controller, factory, and directive

mkdir $1
cd $1

cat <<EOF >> $1".module.js"
(function(){
	'use strict'

angular
	.module('$1', [
	  
	]);

})();
EOF


# mkdir "controllers"
# cd "controllers" 
cat <<EOF >> $1".controller.js"
(function() {
	'use strict'

	angular
		.module('$1')
		.controller('$1Controller', $1Controller)

	$1Controller.\$inject = []

	function $1Controller() {

	    var vm = this;

	    vm.gotoSession = gotoSession;
	    vm.refresh = refresh;
	    vm.search = search;
	    vm.sessions = [];
	    vm.title = '$1';

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



EOF
# cd ..

# mkdir "views"
# cd "views" 
cat <<EOF >> $1".view.html"
<div id="$1Page" class="container" >
	<div class="page-header centerText">
	  <h1>$1</h1>
	</div>
</div>
EOF
# cd ..


# mkdir "services"
# cd "services" 
cat <<EOF >> $1".service.js"
(function(){
	'use strict'

	angular
    	.module('$1')
    	.factory('$1Service', $1Service);

    $1Service.\$inject = []

    function $1Service() {
    	var service = {

    		error: error,
    		info: info,
    		success: success

    	};

    	return service;

    	////////////

    	function error() {
	      /* */
	    }

	    function info() {
	      /* */
          console.log("$1Service");
	    }

	    function success() {
	      /* */
	    }


    }

	
// end IIFE
})();

EOF
# cd ..

# mkdir "directives"
# cd "directives" 
cat <<EOF >> $1".directive.js"
(function(){
angular
    .module('$1')
    .directive('$1Dir', $1Dir);

function $1Dir() {
	return{
		restrict: 'E',
		templateUrl: '',
		replace: true
		// scope: {}
	}
}

//end IIFE
})();
EOF
cd ..

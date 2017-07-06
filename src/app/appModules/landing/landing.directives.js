(function(){
angular
    .module('app')
    .directive('patternParallax', patternParallax);

function patternParallax() {
	return{
		restrict: 'AE',
		link: link
	}
}


function link(scope, elem, attrs) {
	
	var landingRootView = document.getElementById('landingRootView');
	// console.log(landingRootView)
	
	landingRootView.addEventListener('scroll', function(){ // on page scroll
	 requestAnimationFrame(parallax) // call parallaxbubbles() on next available screen paint
	}, false)

	function parallax(){
		 // console.log('parallax')
         var scrollPosition = landingRootView.scrollTop;
         // console.log(scrollPosition)
		 // elem.style.transform = 'translateY('  + (-scrollPosition * .1) + 'px)';
		 elem.css("transform", "translateY( -" + (scrollPosition * .2) + "px)");
	}



}

//end IIFE
})();

(function(){
'use strict';

angular
.module('app')
.directive('onScroll', function(){
  
  return{
    restrict: 'A',
    link: link
  }

  
  function link(scope, elem, attrs){
  		
  		var lastScroll = null;
  		elem.on('scroll', function(){
  			console.log("scroll dir")
  			toggleNav(lastScroll);
  		})
 

  function toggleNav(lastScroll){
  		var landingRootView = document.getElementById('landingRootView');
  		var elem = document.getElementById('navbarLanding');
  	

  	  var scrollPosition = landingRootView.scrollTop;
  	  var style = window.getComputedStyle(elem);
  	  
      var navHeight = style.getPropertyValue('height');
         	
    	// console.log(lastScroll)
       if (scrollPosition > lastScroll ) {
       	  // console.log('hide')
 
          elem.style.transform = ( "translateY( -" + navHeight + ")");
            
        } else {
	        // console.log('show')
	        elem.style.transform = ("translateY(0px)");   
        }


        lastScroll = scrollPosition;
        // console.log(lastScroll)
  }
}
  
})
	
})();



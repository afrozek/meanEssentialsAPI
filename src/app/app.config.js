(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

    config.$inject = ["noCAPTCHAProvider", "vcRecaptchaServiceProvider", '$httpProvider'];
 
    function config(noCaptchaProvider, vcRecaptchaServiceProvider, $httpProvider) {



    /*logging*/
      // console.log = function() {};

    /*nocaptcha*/
      // noCaptchaProvider.setSiteKey('6LcwgSUTAAAAANU4yRy6lQQurHuDIzaukBI662L8');
      // noCaptchaProvider.setTheme('light');


      // vcRecaptchaServiceProvider.setDefaults({
      //   key: '6LcwgSUTAAAAANU4yRy6lQQurHuDIzaukBI662L8',
      // });



 
    // alternatively, register the interceptor via an anonymous factory
      $httpProvider.interceptors.push('interceptorService');






  }//end config

})(); 



(function() {
  'use strict';

  angular
    .module('app')
    .controller('appController', appController);

  appController.$inject = ['apiService','$log','notifyService','authService', '$rootScope'];

  /** @ngInject */
  function appController(apiService, $log, notifyService, authService, $rootScope) {
    var vm = this;
    vm.controllerName = "appController";

    vm.logout = logout;
    notifyService.success("Testing");

    //sets main app rootscope listeners
    authService.setListeners();








    //////////////////

    function logout(){
      authService.logout();
    }

  

  }//end appController
   
})();





  
  /////////////


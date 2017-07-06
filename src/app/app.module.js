(function() {
  'use strict';

  angular
    .module('app', [
        'jlareau.bowser',
        'browserCheck',
        'scriptBlockerCheck',
        'tabSessionSync',
        'api',
        'ui.router',
        'ngAnimate',
        'landing',
        'auth',
        'token',
        'noCAPTCHA',
        'signup',
        'activate',
        'login',
        'forgot',
        'dashboard',
        'notify',
        'vcRecaptcha',
        'ngCookies'


    ]);
})();


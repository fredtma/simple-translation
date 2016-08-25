'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'ngResource', 'pascalprecht.translate']).config(config).run(run);

config.$inject = ['$httpProvider', 'mySaviorProvider', '$stateProvider', '$translateProvider', '$urlRouterProvider'];
function config($httpProvider, saver, $stateProvider, $translateProvider, $urlRouterProvider) {
  $httpProvider.defaults.withCredentials = false;
  saver.use('memory');

  $stateProvider
    .state('app', {
      url: '/',
      abstract: true,
      template: '<ui-view></ui-view>'
    });
  $urlRouterProvider.otherwise('/home');
  $translateProvider.useLoader('translationLoader', {belongsTo: 'wms'});
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
}

run.$inject = ['$rootScope', '$timeout', '$translate'];
function run($rootScope, $timeout, $translate) {
  $timeout(function() {
    $translate.use('en');
  });
  $rootScope.call = {languageChange: languageChange};

  function languageChange(key) {
    $translate.use(key);
  }
}

'use strict';
var perform;
// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'ngResource', 'pascalprecht.translate'])
  .config(config)
  .run(run);

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

  //Translation:
  //@description: translationLoader is a service that will call each time there is a lang change
  $translateProvider.useLoader('translationLoader', {component: 'reg28TableDescription'});
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
  perform = performance.now();
}

run.$inject = ['$rootScope', '$timeout', '$translate'];
function run($rootScope, $timeout, $translate) {
  $timeout(function() {
    $translate.use('en');
  });

  $rootScope.$on('$translateLoadingSuccess', function(e, data) {
    console.info('Translation Loading Success', data, performance.now() - perform);
  });

  function languageChange(key) {
    $translate.use(key);
  }
  $rootScope.call = {languageChange: languageChange};
}

'use strict';
var perform;
// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'ngResource', 'pascalprecht.translate'])
  .constant('SETTINGS', {
    api: {
      url: 'http://internal-dev-investments.mmiholdings.com/babelfish/api/v1/'
    }
  })
  .config(config)
  .run(run);

config.$inject = ['$httpProvider', 'mySaviorProvider', 'SETTINGS', '$stateProvider', '$translateProvider', '$urlRouterProvider'];
function config($httpProvider, saver, settings, $stateProvider, $translateProvider, $urlRouterProvider) {
  $httpProvider.defaults.withCredentials = false;
  saver.use('memory');

  $stateProvider
    .state('app', {
      url: '/',
      abstract: true,
      template: '<ui-view></ui-view>'
    });
  $urlRouterProvider.otherwise('/home');
  //Translation
  $translateProvider.useLoader('translationLoader', {provider: 'reg28TableDescription'});
  // $translateProvider.useUrlLoader(settings.api.url + 'language/reg28TableDescription', {});
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
  perform = performance.now();
}

run.$inject = ['$rootScope', '$timeout', '$translate'];
function run($rootScope, $timeout, $translate) {
  $timeout(function() {
    $translate.use('en');
  });
  $rootScope.$on('$translateReady', function(result) {
    console.log('$translateReady', result);
  });
  $rootScope.$on('$translateLoadingSuccess', function(result, data) {
    console.log('$translateLoadingSuccess', result, data, performance.now() - perform, $translate.getAvailableLanguageKeys());
  });

  function languageChange(key) {
    $translate.use(key);
  }
  function belongChange(key) {
    $translate.refresh();
  }
  $rootScope.call = {languageChange: languageChange, belongChange: belongChange};
}

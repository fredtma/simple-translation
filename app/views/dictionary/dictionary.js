(function() {
  'use strict';

  angular.module('myApp')
    .config(config)
    .controller('dictionaryCtrl', dictionaryCtrl);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider.state('dictionary', {
      url: '/dictionary',
      templateUrl: 'views/dictionary/dictionary.html',
      controller: 'dictionaryCtrl',
      controllerAs: 'ctrl'
    });
  }

  function dictionaryCtrl() {

  }
})();

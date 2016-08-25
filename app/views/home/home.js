(function() {
  'use strict';

  angular.module('myApp')
    .config(config)
    .controller('homeCtrl', homeCtrl);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller: 'homeCtrl',
      controllerAs: '$ctrl'
    });
  }

  homeCtrl.$inject = ['mySavior', '$scope'];
  function homeCtrl(saver, $scope) {
    var self = this;

    $scope.$on('savedLanguage', function() {
      var savedLanguage = saver.get('languages');
      console.log('savedLanguage', savedLanguage);
      self.languages = {'en': savedLanguage.en, 'af': savedLanguage.af};
    });
  }
})();

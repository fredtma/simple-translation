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

  homeCtrl.$inject = ['mySavior', '$scope', 'translationLoader'];
  function homeCtrl(saver, $scope, translationLoader) {
    var self  = this;
    self.call = {changeProvider: translationLoader.changeProvider};

    $scope.$on('savedLanguage', getLanguage);

    function getLanguage() {
      var savedLanguage = saver.get('languages');
      if(savedLanguage) {
        self.languages = {'en': savedLanguage.en, 'af': savedLanguage.af};
      }
    }
    getLanguage();
  }
})();

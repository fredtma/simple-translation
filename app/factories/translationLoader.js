(function() {
  'use strict';
  angular.module('myApp').factory('translationLoader', translationLoader);

  translationLoader.$inject = ['myResource', 'mySavior', '$rootScope', '$translate'];
  function translationLoader(resource, saver, $rootScope, $translate) {

    function loader(options) {
      console.log('options', options);

      loader.provider = loader.provider || options.provider;
      var savedLanguage = saver.get('languages');
      if(savedLanguage && !loader.isNew) {
        console.info('Using saved language');
        $rootScope.$broadcast('savedLanguage');
        return Promise.resolve(savedLanguage[options.key]);
      }

      return resource.init('/language/:provider').get({provider: loader.provider}).$promise.then(function(response) {
        saver.set('languages', response);
        $rootScope.$broadcast('savedLanguage');
        return response[options.key];
      });
    }
    loader.prototype.newProvider = function newProvider() {};
    loader.__proto__.changeProvider = function(provider) {
      loader.isNew    = (provider !== loader.provider);
      loader.provider = provider;
      $translate.refresh();
    };

    Object.defineProperty(loader, 'provider', {
      value: null,
      writable: true
    });

    return loader;
  }
})();

(function() {
  'use strict';
  angular.module('myApp').factory('translationLoader', translationLoader);

  translationLoader.$inject = ['myResource', 'mySavior', '$rootScope'];
  function translationLoader(resource, saver, $rootScope) {

    return function(options) {
      console.log(options);
      var savedLanguage = saver.get('languages');
      if(savedLanguage) {
        console.info('Using saved language');
        $rootScope.$broadcast('savedLanguage');
        return Promise.resolve(savedLanguage[options.key]);
      }

      return resource.init('/language/:belongs').get({belongs: 'wms'}).$promise.then(function(response) {
        saver.set('languages', response);
        $rootScope.$broadcast('savedLanguage');
        return response[options.key];
      });
    };
  }
})();

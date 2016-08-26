(function() {
  'use strict';
  angular.module('myApp').factory('translationLoader', translationLoader);

  translationLoader.$inject = ['myResource', 'mySavior', '$rootScope', '$translate'];
  function translationLoader(resource, saver, $rootScope, $translate) {

    /**
     * loader is the service/factory that the language api will call when ever there is a lang change

     * @param {object} options
     * @param {string} options.key
     * @param {object} options.$http
     * @param {string} options.component
     * @returns {*}
     */
    function loader(options) {
      loader.component   = loader.component || options.component;
      var savedLanguage = saver.get('languages');
      //We make use of a caching service to prevent call to the server.
      if(savedLanguage && !loader.isNew) {
        $rootScope.$broadcast('savedLanguage');
        return Promise.resolve(savedLanguage[options.key]);
      }

      return resource.init('/language/:component').get({component: loader.component}).$promise.then(function(response) {
        saver.set('languages', response);
        $rootScope.$broadcast('savedLanguage');
        return response[options.key] || response;
      });
    }

    /**
     * An extention of the loader. Adds the ability to change components.
     * This will over write the language module table

     * @param {string} component
     */
    loader.__proto__.changecomponent = function(component) {
      loader.isNew    = (component !== loader.component);
      loader.component = component;
      $translate.refresh();
    };

    /**
     * Set the properties for component and isNew
     * @type {{component: {value: null, writable: boolean}, isNew: {value: boolean, writable: boolean}}}
     */
    var properties = {
      component: {value: null, writable: true},
      isNew: {value: false, writable: true}
    };
    Object.defineProperties(loader, properties);

    return loader;
  }
})();

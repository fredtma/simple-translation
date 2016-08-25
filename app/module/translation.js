(function() {
  'use strict';
  angular.module('myApp').config(config).factory('translationLoader', translationLoader);

  config.$inject = ['$translateProvider'];
  function config($translateProvider) {
    'use strict';
    $translateProvider.useLoader('translationLoader', {/*options*/});
    $translateProvider.useSanitizeValueStrategy(null);
  }

  translationLoader.$inject = ['myResource'];
  function translationLoader(resource) {
    'use strict';

    return function(options) {
      return resource.init('language/:belongs').get({
        belongs: options.key
      }).then(function(response) {
        return response;
      });
    };
  }
})();

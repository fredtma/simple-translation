/**
 * This is a wrapper for ngResource.
 * You simply init the URL and set the different action.
 */
(function() {
  'use strict';
  angular.module('myApp')
    .factory('myResource', resource);

  resource.$inject = ['$resource'];
  function resource($resource) {

    var factory = {};
    var URL     = 'http://internal-dev-investments.mmiholdings.com/babelfish/api/v1/';
    var ACTIONS = {
      'cached': {'method': 'GET', 'isArray': true, 'responseType': 'json'},
      'admin': {
        'url': URL + '/admin/:id',
        'method': 'GET',
        'params': {id: '@_id'},
        'isArray': true,
        'responseType': 'json'
      }
    };
    factory.init = init;
    return factory;

    function init(tail, params, actions) {
      actions = angular.extend(ACTIONS, actions);
      return factory.serve = $resource(URL + tail, params, actions);
    }
  }
})();

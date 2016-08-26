(function() {
  'use strict';
  angular.module('myApp').filter('varType', varType);

  function varType() {
    return function(value, filter) {
      return (typeof value === filter);
    };
  }
})();

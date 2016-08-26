(function() {
  'use strict';
  angular.module('myApp')
    .provider('mySavior', mySavior);

  function mySavior() {
    var _using  = 'local';//local, session, memory
    var _memory = {};
    this.use    = use;
    this.$get   = dynamis;

    function use(key) {
      _using = key;
    }

    function str2Json(jsonString) {

      if (typeof jsonString !== 'string') {
        return false;
      }

      try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === 'object' && o !== null) {
          return o;
        }
      }
      catch (e) { console.error(e);}

      return false;
    }

    dynamis.$inject = ['$window'];
    function dynamis($window) {
      return {
        clear: clear,
        del: del,
        get: get,
        set: set,
        key: key,
      };

      function clear() {
        switch(_using) {
          case 'memory':
            _memory = {};
            break;
          case 'local':
            $window.localStorage.clear();
            break;
          case 'session':
            $window.sessionStorage.clear();
            break;
          default:
            $window.localStorage.clear();
            $window.sessionStorage.clear();
            _memory = {};
            break;
        };
      }

      function del(key) {
        switch(_using) {
          case 'memory':
            _memory[key] = {};
            break;
          case 'local':
            $window.localStorage.removeItem(key);
            break;
          case 'session':
            $window.sessionStorage.removeItem(key);
            break;
          default:
            $window.localStorage.removeItem(key);
            $window.sessionStorage.removeItem(key);
            _memory[key] = {};
            break;
        };
      }

      function get(key) {

        var value;
        switch(_using) {
          case 'memory':
            value = _memory[key];
            break;
          case 'local':
            value = $window.localStorage.getItem(key);
            break;
          case 'session':
            value = $window.sessionStorage.getItem(key);
            break;
          default:
            value = $window.localStorage.getItem(key);
            value = value || $window.sessionStorage.getItem(key);
            value = value || _memory[key];
            break;
        };
        return (typeof value === 'string') ? str2Json(value) : value;
      }

      function set(key, value) {

        var _value = (typeof value === 'string') ? value : JSON.stringify(value);
        switch(_using) {
          case 'memory':
            _memory[key] = value;
            break;
          case 'local':
            $window.localStorage.setItem(key, _value);
            break;
          case 'session':
            $window.sessionStorage.setItem(key, _value);
            break;
          default:
            $window.localStorage.setItem(key, _value);
            $window.sessionStorage.setItem(key, _value);
            _memory[key] = value;
            break;
        };
      }

      function key(key) {
        var val = get(key);

        function set(k, value) {
          val[k] = value;
          this.set(key, val, _local);
        }
        return {'set': set};
      }

    }
  }
})();

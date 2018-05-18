'use strict';

(function () {
  function Controller(SessionProxy) {
    var ctrl = this;

    function sourceCollectionWithout(item) {
      return (ctrl.sourceCollection || []).filter(function (element) {
        return element.action !== item.action || element.author !== item.author || element.changedOn !== item.changedOn;
      });
    }

    ctrl.add = function (item, date) {
      if (item && date) {
        item.changedOn = new Date(date).toISOString();

        if (!item.author) {
          item.author = SessionProxy.login();
        }

        var result = sourceCollectionWithout(item);
        result.push(item);

        if (ctrl.update && typeof ctrl.update === 'function') {
          ctrl.update(result);

          ctrl.item = {};
          ctrl.changedOn = null;
        }
      } else {
        ctrl.showError = true;
      }
    };
  }

  angular.module('obiba.mica.access').component('actionLogEditor', {
    bindings: {
      sourceCollection: '<',
      update: '<'
    },
    templateUrl: 'access/components/action-log/component.html',
    controller: ['SessionProxy', Controller]
  });
})();
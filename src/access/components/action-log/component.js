'use strict';

(function () {
  function ActionLogEditorController(SessionProxy) {
    var ctrl = this;

    ctrl.filterOutItemFromCollection = function (item, collection) {
      return (collection || []).filter(function (element) {
        return element.action !== item.action || element.author !== item.author || element.changedOn !== item.changedOn;
      });
    };

    ctrl.sourceCollectionWithout = function (item) {
      return ctrl.filterOutItemFromCollection(item, ctrl.sourceCollection);
    };

    ctrl.add = function (item) {
      if (item && item.action && item.changedOn) {
        item.changedOn = item.changedOn.toISOString();

        if (!item.author) {
          item.author = SessionProxy.login();
        }

        var result = ctrl.sourceCollectionWithout(item);
        result.push(item);

        if (ctrl.update && typeof ctrl.update === 'function') {
          ctrl.update({ logs: result });

          ctrl.item = {};
          ctrl.changedOn = null;
        } else {
          console.error('Did not create', item);
        }
      } else {
        ctrl.showError = true;
      }
    };
  }

  function ActionLogItemEditorController(SessionProxy, $uibModal) {
    var ctrl = this;
    ActionLogEditorController.call(ctrl, SessionProxy);

    function isAnActionLog(item) {
      return item && item.hasOwnProperty('action') && item.hasOwnProperty('author') && item.hasOwnProperty('changedOn');
    }

    ctrl.remove = function (item) {
      $uibModal.open({
        templateUrl: 'access/components/action-log/item/delete-modal.html',
        controller: ['$uibModalInstance', 'actionLogItem', function ($uibModalInstance, actionLogItem) { this.item = actionLogItem; }],
        controllerAs: '$modal',
        resolve: {
          actionLogItem: function () {
            return { action: item.action, author: item.author, changedOn: moment(item.changedOn).calendar() };
          }
        }
      }).result.then(function () {
        var result = ctrl.sourceCollectionWithout(item);

        if (result.length < ctrl.sourceCollection.length && (ctrl.update && typeof ctrl.update === 'function')) {
          ctrl.update({ logs: result });
        } else {
          console.error('Did not remove', item);
        }
      });
    };

    ctrl.edit = function (item) {
      $uibModal.open({
        templateUrl: 'access/components/action-log/item/edit-modal.html',
        controller: ['$uibModalInstance', 'actionLogItem', function ($uibModalInstance, actionLogItem) { this.item = actionLogItem; }],
        controllerAs: '$modal',
        size: 'sm',
        resolve: {
          actionLogItem: function () {
            return { action: item.action, author: item.author, changedOn: new Date(item.changedOn) };
          }
        }
      }).result.then(function (editionResult) {
        editionResult.changedOn = editionResult.changedOn.toISOString();

        if (ctrl.update && typeof ctrl.update === 'function') {
          var result = ctrl.sourceCollectionWithout(item);
          result = ctrl.filterOutItemFromCollection(editionResult, result);

          result.push(editionResult);
          ctrl.update({ logs: result });
        } else {
          console.error('Did not update', item);
        }
      });
    };

    ctrl.$onChanges = function (changes) {
      ctrl.showButtons = changes.item && changes.item.currentValue && isAnActionLog(changes.item.currentValue);
    };
  }

  angular.module('obiba.mica.access').component('actionLogEditor', {
    bindings: {
      sourceCollection: '<',
      update: '&'
    },
    templateUrl: 'access/components/action-log/component.html',
    controller: ['SessionProxy', ActionLogEditorController]
  });

  angular.module('obiba.mica.access').component('actionLogItemEditor', {
    bindings: {
      item: '<',
      sourceCollection: '<',
      update: '&'
    },
    templateUrl: 'access/components/action-log/item/component.html',
    controller: ['SessionProxy', '$uibModal', ActionLogItemEditorController]
  });
})();
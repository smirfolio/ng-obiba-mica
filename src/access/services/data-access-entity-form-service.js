'use strict';

(function () {
  function Service($rootScope, $filter, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS) {
    this.for = function (accessEntity, successCallback, errorCallback) {
      var entityRootpath = accessEntity['obiba.mica.DataAccessAmendmentDto.amendment'] ? DataAccessEntityUrls.getDataAccessAmendmentUrl(accessEntity['obiba.mica.DataAccessAmendmentDto.amendment'].parentId, accessEntity.id) :
        DataAccessEntityUrls.getDataAccessRequestUrl(accessEntity.id);

      var scope = $rootScope.$new();

      function confirmStatusChange(status, messageKey, statusName) {
        scope.$broadcast(
          NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.status-change-confirmation.title',
            messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
            messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
          }, status);
      }

      function statusChangedConfirmed(status, expectedStatus) {
        if (status === expectedStatus) {
          DataAccessEntityResource.updateStatus(entityRootpath, accessEntity.id, status).$promise.then(successCallback, errorCallback);
        }
      }

      this.reopen = function () {
        confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
      };

      this.review = function () {
        confirmStatusChange(DataAccessEntityService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
      };

      this.approve = function () {
        confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
      };

      this.reject = function () {
        confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
      };

      this.conditionallyApprove = function () {
        confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
      };

      scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function (event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
        }
      );

      scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function (event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
        }
      );

      scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function (event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
        }
      );

      scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function (event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
        }
      );

      scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function (event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
        }
      );

      return this;
    };
  }

  angular.module('obiba.mica.access').service('DataAccessEntityFormService', ['$rootScope', '$filter', 'DataAccessEntityUrls', 'DataAccessEntityResource', 'DataAccessEntityService', 'NOTIFICATION_EVENTS', Service]);
})();
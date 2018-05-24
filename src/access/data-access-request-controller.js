/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.access
  .controller('DataAccessRequestListController', [
    '$scope',
    'ngObibaMicaAccessTemplateUrl',

    function ($scope, ngObibaMicaAccessTemplateUrl) {
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
    }])

  .controller('DataAccessRequestViewController',
    ['$rootScope',
      '$scope',
      '$route',
      '$location',
      '$uibModal',
      '$routeParams',
      '$filter',
      '$translate',
      'DataAccessRequestResource',
      'DataAccessAmendmentsResource',
      'DataAccessEntityService',
      'DataAccessRequestStatusResource',
      'DataAccessFormConfigResource',
      'JsonUtils',
      'DataAccessRequestAttachmentsUpdateResource',
      'DataAccessRequestCommentsResource',
      'DataAccessRequestCommentResource',
      'ngObibaMicaUrl',
      'ngObibaMicaAccessTemplateUrl',
      'AlertService',
      'ServerErrorUtils',
      'NOTIFICATION_EVENTS',
      'DataAccessRequestConfig',
      'LocalizedSchemaFormService',
      'SfOptionsService',
      'moment',
      'UserProfileService',

      function ($rootScope,
        $scope,
        $route,
        $location,
        $uibModal,
        $routeParams,
        $filter,
        $translate,
        DataAccessRequestResource,
        DataAccessAmendmentsResource,
        DataAccessEntityService,
        DataAccessRequestStatusResource,
        DataAccessFormConfigResource,
        JsonUtils,
        DataAccessRequestAttachmentsUpdateResource,
        DataAccessRequestCommentsResource,
        DataAccessRequestCommentResource,
        ngObibaMicaUrl,
        ngObibaMicaAccessTemplateUrl,
        AlertService,
        ServerErrorUtils,
        NOTIFICATION_EVENTS,
        DataAccessRequestConfig,
        LocalizedSchemaFormService,
        SfOptionsService,
        moment,
        UserProfileService) {


        var TAB_NAMES = Object.freeze({
          form: 0,
          amendments: 1,
          documents: 2,
          comments: 3,
          history: 4
        });

        function onError(response) {
          AlertService.alert({
            id: 'DataAccessRequestViewController',
            type: 'danger',
            msg: ServerErrorUtils.buildMessage(response)
          });
        }

        function onAttachmentError(attachment) {
          AlertService.alert({
            id: 'DataAccessRequestViewController',
            type: 'danger',
            msgKey: 'server.error.file.upload',
            msgArgs: [attachment.fileName]
          });
        }

        function retrieveComments() {
          $scope.form.comments = DataAccessRequestCommentsResource.query({ id: $routeParams.id });
        }

        function selectTab(tab) {
          switch (tab) {
            case TAB_NAMES.form:
            case TAB_NAMES.history:
            case TAB_NAMES.documents:
              break;
            case TAB_NAMES.comments:
              if ($scope.parentId === undefined) {
                retrieveComments();
              }
              break;
            case TAB_NAMES.amendments:
              $scope.parentId = $routeParams.id;
              break;
          }
        }

        function submitComment(comment) {
          DataAccessRequestCommentsResource.save({ id: $routeParams.id }, comment.message, retrieveComments, onError);
        }

        function updateComment(comment) {
          DataAccessRequestCommentResource.update({ id: $routeParams.id, commentId: comment.id }, comment.message, retrieveComments, onError);
        }

        function deleteComment(comment) {
          $scope.commentToDelete = comment.id;

          $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
            {
              titleKey: 'comment.delete-dialog.title',
              messageKey: 'comment.delete-dialog.message',
              messageArgs: [comment.createdBy]
            }, comment.id
          );
        }

        function toggleAttachmentsForm(show) {
          if (show) {
            $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
          }
          $scope.showAttachmentsForm = show;
        }

        function setLogsHistory(request) {
          DataAccessAmendmentsResource.getLogHistory({ id: request.id }).$promise.then(function (amendmentHistory) {
            $scope.logsHistory =
              DataAccessEntityService.processLogsHistory(
                [].concat((request.statusChangeHistory), (request.actionLogHistory || []), (amendmentHistory || []))
                  .sort(function(a, b) {
                    return a.changedOn.localeCompare(b.changedOn);
                  })
              );

            return $scope.logsHistory;
          }, function (reason) {
            console.error('Error getting log history for DAR', $routeParams.id, reason);
          });
        }

        function getRequest() {
          return DataAccessRequestResource.get({ id: $routeParams.id }).$promise.then(function onSuccess(request) {
            setLogsHistory(request);

            try {
              $scope.dataAccessRequest = request;
              $scope.form.model = request.content ? JSON.parse(request.content) : {};
              var requestDownloadUrlPdf = ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
              $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=') !== -1) ? '&' : '?') + 'lang=' + $translate.use();
              $scope.attachments = angular.copy(request.attachments) || [];
            } catch (e) {
              $scope.validForm = false;
              $scope.form.model = {};
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-request.parse-error'
              });
            }

            initializeForm();

            request.attachments = request.attachments || [];

            $scope.lastSubmittedDate = findLastSubmittedDate();

            return request;
          }, onError);
        }

        function updateAttachments() {
          var request = angular.copy($scope.dataAccessRequest);
          request.attachments = $scope.attachments;
          DataAccessRequestAttachmentsUpdateResource.save(request, function () {
            toggleAttachmentsForm(false);
            $scope.dataAccessRequest = getRequest();
          });
        }

        function initializeForm() {
          SfOptionsService.transform().then(function (options) {
            $scope.sfOptions = options;
            $scope.sfOptions.pristine = { errors: true, success: false };
          });

          // Retrieve form data
          DataAccessFormConfigResource.get(
            function onSuccess(dataAccessForm) {
              $scope.dataAccessForm = dataAccessForm;
            },
            onError
          );
        }

        function findLastSubmittedDate() {
          var history = $scope.dataAccessRequest.logsHistory || [];
          return history.filter(function (item) {
            return item.to === DataAccessEntityService.status.SUBMITTED;
          }).sort(function (a, b) {
            if (moment(a).isBefore(b)) {
              return -1;
            }

            if (moment(a).isSame(b)) {
              return 0;
            }

            if (moment(a).isAfter(b)) {
              return 1;
            }
          }).pop();
        }

        function deleteEntity() {
          $scope.requestToDelete = $scope.dataAccessRequest.id;
          $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
            {
              titleKey: 'data-access-request.delete-dialog.title',
              messageKey: 'data-access-request.delete-dialog.message',
              messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
            }, $scope.requestToDelete
          );
        }

        function getDownloadHref(attachment) {
          return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
            .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
        }

        function onDeleteConfirmed(event, id) {
          if ($scope.requestToDelete === id) {
            DataAccessRequestResource.delete({ id: $scope.requestToDelete },
              function () {
                $location.path('/data-access-requests').replace();
              });

            delete $scope.requestToDelete;
          }
        }

        function onUpdatStatusSuccess() {
          setTimeout(function () {
            $scope.dataAccessRequest = getRequest();
          });
        }

        function confirmStatusChange(status, messageKey, statusName) {
          $rootScope.$broadcast(
            NOTIFICATION_EVENTS.showConfirmDialog,
            {
              titleKey: 'data-access-request.status-change-confirmation.title',
              messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
              messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
            }, status);
        }

        function statusChangedConfirmed(status, expectedStatus) {
          if (status === expectedStatus) {
            DataAccessRequestStatusResource.update({
              id: $scope.dataAccessRequest.id,
              status: status
            }, onUpdatStatusSuccess, onError);
          }
        }

        function printForm() {
          // let angular digest!
          setTimeout(function () { window.print(); }, 250);
        }

        function submitForm() {
          $scope.$broadcast('schemaFormValidate');
          if ($scope.forms.requestForm.$valid) {
            DataAccessRequestStatusResource.update({
              id: $scope.dataAccessRequest.id,
              status: DataAccessEntityService.status.SUBMITTED
            }, function onSubmitted() {
              $uibModal.open({
                scope: $scope,
                templateUrl: 'access/views/data-access-request-submitted-modal.html'
              }).result.then(function () {
                onUpdatStatusSuccess();
              });
            }, onError);
          } else {
            AlertService.alert({
              id: 'DataAccessRequestViewController',
              type: 'danger',
              msgKey: 'data-access-request.submit.invalid'
            });
          }
        }

        function onDeleteCommentConfirmed(event, id) {
          if ($scope.commentToDelete === id) {
            DataAccessRequestCommentResource.delete({ id: $routeParams.id, commentId: id }, {}, retrieveComments, onError);
          }
        }

        function updateActionLogs(actionLogs) {
          if (Array.isArray(actionLogs)) {
            $scope.dataAccessRequest.actionLogHistory = actionLogs;
            DataAccessRequestResource.editActionLogs($scope.dataAccessRequest, function () {
              onUpdatStatusSuccess();
            });
          }
        }

        function reOpen() {
          confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
        }

        function review() {
          confirmStatusChange(DataAccessEntityService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
        }

        function approve() {
          confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
        }

        function reject() {
          confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
        }

        function conditionallyApprove() {
          confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
        }

        function onStatusOpened(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
        }

        function onStatusReviewed(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
        }

        function onStatusConditionallyApproved(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
        }

        function onStatusApproved(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
        }

        function onStatusRejected(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
        }

        function getFullName(profile) {
          return UserProfileService.getFullName(profile);
        }

        $scope.logsHistory = [];
        $scope.parentId = undefined;
        $scope.validForm = true;
        $scope.config = DataAccessRequestConfig.getOptions();
        $scope.actions = DataAccessEntityService.actions;
        $scope.nextStatus = DataAccessEntityService.nextStatus;
        $scope.showAttachmentsForm = false;
        $scope.selectTab = selectTab;
        $scope.delete = deleteEntity;
        $scope.submitComment = submitComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;
        $scope.getDownloadHref = getDownloadHref;
        $scope.updateAttachments = updateAttachments;
        $scope.cancelAttachments = function () { toggleAttachmentsForm(false); };
        $scope.editAttachments = function () { toggleAttachmentsForm(true); };
        $scope.updateActionLogs = updateActionLogs;
        $scope.onAttachmentError = onAttachmentError;
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
        $scope.submit = submitForm;
        $scope.reopen = reOpen;
        $scope.review = review;
        $scope.approve = approve;
        $scope.reject = reject;
        $scope.conditionallyApprove = conditionallyApprove;
        $scope.UserProfileService = UserProfileService;

        $scope.userProfile = function (profile) {
          $scope.applicant = profile;
          $uibModal.open({
            scope: $scope,
            templateUrl: 'access/views/data-access-request-profile-user-modal.html'
          });
        };

        $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
        $scope.printForm = printForm;
        $scope.getFullName = getFullName;
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteCommentConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusOpened);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusReviewed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusConditionallyApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusRejected);
        $rootScope.$on('$translateChangeSuccess', initializeForm);

        $scope.tabs = { activeTab: 0 };
        $scope.TAB_NAMES = TAB_NAMES;
        $scope.forms = {};
        $scope.form = {
          schema: null,
          definition: null,
          model: {},
          comments: null
        };

        $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};
      }])

  .controller('DataAccessRequestEditController', ['$rootScope',
    '$log',
    '$scope',
    '$routeParams',
    '$location',
    '$uibModal', 'LocalizedSchemaFormService',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessFormConfigResource',
    'JsonUtils',
    'AlertService',
    'ServerErrorUtils',
    'SessionProxy',
    'DataAccessEntityService',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'FormDirtyStateObserver',
    'DataAccessRequestDirtyStateService',
    '$timeout',

    function ($rootScope,
      $log,
      $scope,
      $routeParams,
      $location,
      $uibModal,
      LocalizedSchemaFormService,
      DataAccessRequestsResource,
      DataAccessRequestResource,
      DataAccessFormConfigResource,
      JsonUtils,
      AlertService,
      ServerErrorUtils,
      SessionProxy,
      DataAccessEntityService,
      ngObibaMicaAccessTemplateUrl,
      DataAccessRequestConfig,
      SfOptionsService,
      FormDirtyStateObserver,
      DataAccessRequestDirtyStateService,
      $timeout) {

      var onSuccess = function (response, getResponseHeaders) {
        FormDirtyStateObserver.unobserve();
        var parts = getResponseHeaders().location.split('/');
        $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
      };

      var onError = function (response) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();

      var validate = function (form) {
        $scope.$broadcast('schemaFormValidate');
        $uibModal.open({
          resolve: {
            isValid: form.$valid
          },
          templateUrl: 'access/views/data-access-request-validation-modal.html',
          controller: ['$scope', 'isValid', function ($scope, isValid) {
            $scope.isValid = isValid;
          }]
        });
      };

      var cancel = function () {
        $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
      };

      var save = function () {
        $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);

        if ($scope.newRequest) {
          DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
        } else {
          DataAccessRequestResource.save($scope.dataAccessRequest, function () {
            FormDirtyStateObserver.unobserve();
            $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
          }, onError);
        }
      };

      function initializeForm() {
        // Retrieve form data

        SfOptionsService.transform().then(function (options) {
          $scope.sfOptions = options;
          $scope.sfOptions.onError = onAttachmentError;
        });

        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.sfForm.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.sfForm.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            if ($scope.sfForm.definition.length === 0) {
              $scope.sfForm.definition = [];
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.sfForm.schema).length === 0) {
              $scope.sfForm.schema = {};
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }

            if ($scope.validForm) {
              $scope.dataAccessRequest = $routeParams.id ?
                DataAccessRequestResource.get({ id: $routeParams.id }, function onSuccess(request) {
                  try {
                    $scope.sfForm.model = request.content ? JSON.parse(request.content) : {};
                  } catch (e) {
                    $scope.sfForm.model = {};
                    AlertService.alert({
                      id: 'DataAccessRequestEditController',
                      type: 'danger',
                      msgKey: 'data-access-request.parse-error'
                    });
                  }

                  $scope.canEdit = DataAccessEntityService.actions.canEdit(request);
                  $scope.sfForm.schema.readonly = !$scope.canEdit;
                  $scope.$broadcast('schemaFormRedraw');

                  request.attachments = request.attachments || [];
                  return request;
                }) : {
                  applicant: SessionProxy.login(),
                  status: DataAccessEntityService.status.OPENED,
                  attachments: []
                };
            }

            $timeout(function () {
              $scope.sfForm = angular.copy($scope.sfForm);
              $scope.loaded = true;
            }, 250);
          },
          onError
        );
      }

      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      initializeForm();

      $scope.loaded = false;
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.validForm = true;
      $scope.requestId = $routeParams.id;
      $scope.newRequest = $routeParams.id ? false : true;
      $scope.cancel = cancel;
      $scope.save = save;
      $scope.editable = true;
      $scope.validate = validate;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('form');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('form');
      $scope.sfForm = {
        schema: null,
        definition: null,
        model: {}
      };

      FormDirtyStateObserver.observe($scope);

      DataAccessRequestDirtyStateService.setForm($scope.form);
      $scope.$on('$destroy', function () {
        DataAccessRequestDirtyStateService.setForm(null);
      });

    }]);

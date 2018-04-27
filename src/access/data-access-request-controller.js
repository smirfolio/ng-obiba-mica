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
      '$timeout',

    function ($rootScope,
              $scope,
              $route,
              $location,
              $uibModal,
              $routeParams,
              $filter,
              $translate,
              DataAccessRequestResource,
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
              $timeout) {

      var onError = function (response) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      $scope.$on('$destroy', function() {
        console.log('$onDestroy');
      });

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      var retrieveComments = function() {
        $scope.form.comments = DataAccessRequestCommentsResource.query({id: $routeParams.id});
      };

      var selectTab = function(id) {
        $scope.selectedTab = id;
        switch (id) {
          case 'amendments':
            $scope.parentId = $scope.dataAccessRequest.id;
            break;
          case 'comments':
            var search = $location.search();
            search.tab = TABS.amendments;
            $location.search(search);
            retrieveComments();
            /* falls through */
          case 'form':
            /* falls through */
          default:
            // so next time selecting amendments the list is refreshed
            $scope.parentId = undefined;
        }
      };

      var submitComment = function(comment) {
        DataAccessRequestCommentsResource.update({id: $routeParams.id}, comment.message, retrieveComments, onError);
      };

      var updateComment = function(comment) {
        DataAccessRequestCommentResource.update({id: $routeParams.id, commentId: comment.id}, comment.message, retrieveComments, onError);
      };

      var deleteComment = function(comment) {
        $scope.commentToDelete = comment.id;

        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'comment.delete-dialog.title',
            messageKey:'comment.delete-dialog.message',
            messageArgs: [comment.createdBy]
          }, comment.id
        );
      };

      var toggleAttachmentsForm = function(show) {
        if (show) {
          $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
        }
        $scope.showAttachmentsForm = show;
      };

      var getRequest = function () {
        return DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
          try {
            $scope.form.model = request.content ? JSON.parse(request.content) : {};
            var requestDownloadUrlPdf =  ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
            $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=')!==-1)?'&':'?') +'lang=' + $translate.use();


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
        });
      };

      var updateAttachments = function() {
        var request = angular.copy($scope.dataAccessRequest);
        request.attachments = $scope.attachments;
        DataAccessRequestAttachmentsUpdateResource.update(request, function() {
          toggleAttachmentsForm(false);
          $scope.dataAccessRequest = getRequest();
        });
      };

      function initializeForm() {
        SfOptionsService.transform().then(function(options) {
          $scope.sfOptions = options;
          $scope.sfOptions.pristine = {errors: true, success: false};
        });

        // Retrieve form data
        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.form.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.form.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            $scope.form.downloadTemplate = dataAccessForm.pdfDownloadType === 'Template';

            if ($scope.form.definition.length === 0) {
              $scope.validForm = false;
              $scope.form.definition = [];
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.form.schema).length === 0) {
              $scope.validForm = false;
              $scope.form.schema = {readonly: true};
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }
            $scope.form.schema.readonly = true;

            $timeout(function () {
              $scope.form = angular.copy($scope.form);
              $scope.$broadcast('schemaFormRedraw');
            }, 250);
          },
          onError
        );
      }

      function findLastSubmittedDate() {
        var history = $scope.dataAccessRequest.statusChangeHistory || [];
        return history.filter(function(item) {
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

      var TABS = Object.freeze({
        form: 'form',
        amendments: 'amendments',
        documents: 'documents',
        comments: 'comments',
        history: 'history'
      });

      function validateTabs() {
        var search = $location.search();
        search.tab = TABS[search.tab] || TABS.form;
        $scope.activeTab = Object.keys(TABS).indexOf(search.tab);
        $location.search(search);
      }

      $scope.form = {
        schema: null,
        definition: null,
        model: {},
        comments: null
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.commentToDelete === id) {
           DataAccessRequestCommentResource.delete({id: $routeParams.id, commentId: id}, {}, retrieveComments, onError);
        }
      });

      $scope.getDownloadHref = function(attachment) {
        return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
          .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
      };

      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.actions = DataAccessEntityService.actions;
      $scope.nextStatus = DataAccessEntityService.nextStatus;
      $scope.selectTab = selectTab;
      $scope.submitComment = submitComment;
      $scope.updateComment = updateComment;
      $scope.deleteComment = deleteComment;
      $scope.showAttachmentsForm = false;
      $scope.updateAttachments = updateAttachments;
      $scope.cancelAttachments = function() {
        toggleAttachmentsForm(false);
      };
      $scope.editAttachments = function() {
        toggleAttachmentsForm(true);
      };
      $scope.onAttachmentError = onAttachmentError;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
      $scope.getStatusHistoryInfoId = DataAccessEntityService.getStatusHistoryInfoId;
      DataAccessEntityService.getStatusHistoryInfo(function(statusHistoryInfo) {
        $scope.getStatusHistoryInfo = statusHistoryInfo;
      });

      $scope.parentId = undefined;
      $scope.validForm = true;

      validateTabs();

      $scope.delete = function () {
        $scope.requestToDelete = $scope.dataAccessRequest.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.delete-dialog.title',
            messageKey:'data-access-request.delete-dialog.message',
            messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
          }, $scope.requestToDelete
        );
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.requestToDelete === id) {
          DataAccessRequestResource.delete({id: $scope.requestToDelete},
            function () {
              $location.path('/data-access-requests').replace();
            });

          delete $scope.requestToDelete;
        }
      });

      var onUpdatStatusSuccess = function () {
        setTimeout(function () {
          $scope.dataAccessRequest = getRequest();
        });
      };

      var confirmStatusChange = function(status, messageKey, statusName) {
        $rootScope.$broadcast(
          NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.status-change-confirmation.title',
            messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
            messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
          }, status);
      };

      var statusChangedConfirmed = function(status, expectedStatus) {
        if (status === expectedStatus) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: status
          }, onUpdatStatusSuccess, onError);
        }
      };

      var printForm = function() {
        // let angular digest!
        setTimeout(function(){ window.print(); }, 250);
      };

      $scope.submit = function () {
        $scope.$broadcast('schemaFormValidate');
        if ($scope.forms.requestForm.$valid) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: DataAccessEntityService.status.SUBMITTED
          }, function onSubmitted() {
            $uibModal.open({
              scope: $scope,
              templateUrl:'access/views/data-access-request-submitted-modal.html'
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
      };

      $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};
      $route.current.params.activeTab = 'amendments';

      function update() {
        var current = Object.keys(TABS).filter(function(key, index) {
          return index === $scope.activeTab;
        }).pop() || 'form';

        switch (current) {
          case TABS.form:
            $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};
            break;
          case TABS.amendments:
            $scope.parentId = $scope.dataAccessRequest.id;
            retrieveComments();
            break;
        }
      }

      function onLocationChange(event, newLocation, oldLocation) {
        console.log('onLocationChange', newLocation, oldLocation, $location.path());
        if (newLocation !== oldLocation) {
          validateTabs();
          update();
          console.log('Active Tab', $scope.activeTab);
          var search = $location.search;
          console.log(search.tab);
          if ('form' === search.tab) {
            $scope.activeTab = 0;
            $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};
          }
        }
      }

      $scope.reopen = function () {
        confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
      };
      $scope.review = function () {
        confirmStatusChange(DataAccessEntityService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
      };
      $scope.approve = function () {
        confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
      };
      $scope.reject = function () {
        confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
      };
      $scope.conditionallyApprove = function () {
        confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
      };

      $scope.userProfile = function (profile) {
        $scope.applicant = profile;
        $uibModal.open({
          scope: $scope,
          templateUrl: 'access/views/data-access-request-profile-user-modal.html'
        });
      };

      $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      $scope.printForm = printForm;

      $scope.getFullName = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
          }
          return profile.username;
        }
        return null;
      };

      $scope.getProfileEmail = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'email');
          }
        }
        return null;
      };

      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
        }
      );

      $scope.$on('$locationChangeSuccess', onLocationChange);
      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      $scope.activeTab = 0;
      $scope.forms = {};
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

      var onSuccess = function(response, getResponseHeaders) {
        FormDirtyStateObserver.unobserve();
        var parts = getResponseHeaders().location.split('/');
        $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
      };

      var onError = function(response) {
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

      var validate = function(form) {
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

      var cancel = function() {
        $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
      };

      var save = function() {
        $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);

        if ($scope.newRequest) {
          DataAccessRequestsResource.update($scope.dataAccessRequest, onSuccess, onError);
        } else {
          DataAccessRequestResource.update($scope.dataAccessRequest, function() {
            FormDirtyStateObserver.unobserve();
            $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
          }, onError);
        }
      };

      function initializeForm() {
        // Retrieve form data

        SfOptionsService.transform().then(function(options) {
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
                DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
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

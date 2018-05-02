'use strict';

(function () {
  function Controller($scope, $location, $routeParams, $uibModal, DataAccessEntityResource, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, ServerErrorUtils, AlertService, DataAccessRequestDirtyStateService, FormDirtyStateObserver, ngObibaMicaAccessTemplateUrl) {

    function getDataContent(data) {
      return data.content ? JSON.parse(data.content) : {};
    }

    function onSuccess() {
      FormDirtyStateObserver.unobserve();
      $location.path($scope.entityUrl).replace();
    }

    function onError(response) {
      AlertService.alert({
        id: 'DataAccessAmendmentEditController',
        type: 'danger',
        msg: ServerErrorUtils.buildMessage(response)
      });
    }

    $scope.entityUrl = $routeParams.id ? DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id) : DataAccessEntityUrls.getDataAccessRequestUrl($routeParams.parentId);
    $scope.read = false;

    var amendment = $routeParams.id ?
      DataAccessEntityResource.get($scope.entityUrl, $routeParams.id) :
      { $promise: new Promise(function (resolve) { setTimeout(resolve, 0, {}); }) };
    var model = amendment.$promise.then(getDataContent);
    var dataAccessForm = DataAccessAmendmentFormConfigResource.get();

    Promise.all([amendment, model, dataAccessForm]).then(function (values) {
      $scope.requestEntity = values[0];
      $scope.model = values[1];
      $scope.dataAccessForm = values[2];

      return values;
    }, function (reason) {
      console.error('Failed to resolve amendment promises because', reason);
    });

    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');

    FormDirtyStateObserver.observe($scope);

    DataAccessRequestDirtyStateService.setForm($scope.form);
    $scope.$on('$destroy', function () {
      FormDirtyStateObserver.unobserve();
      DataAccessRequestDirtyStateService.setForm(null);
    });

    $scope.cancel = function () {
      $location.path($scope.entityUrl).replace();
    };

    $scope.save = function () {
      $scope.requestEntity.content = angular.toJson($scope.model);
      $scope.requestEntity.parentId = $routeParams.parentId;

      if (!$routeParams.id) {
        DataAccessEntityResource.create($scope.entityUrl, $scope.requestEntity).$promise.then(onSuccess, onError);
      } else {
        DataAccessEntityResource.update($scope.entityUrl, $scope.requestEntity).$promise.then(function () {
          FormDirtyStateObserver.unobserve();
          $location.path($scope.entityUrl).replace();
        }, onError);
      }
    };

    $scope.validate = function (form) {
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
  }

  angular.module('obiba.mica.access').controller('DataAccessAmendmentEditController', ['$scope', '$location', '$routeParams', '$uibModal', 'DataAccessEntityResource', 'DataAccessAmendmentFormConfigResource', 'DataAccessEntityUrls', 'ServerErrorUtils', 'AlertService', 'DataAccessRequestDirtyStateService', 'FormDirtyStateObserver', 'ngObibaMicaAccessTemplateUrl', Controller]);
})();
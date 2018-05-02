'use strict';

(function () {
  function Controller($scope, $routeParams, $uibModal, DataAccessEntityResource, DataAccessEntityService, DataAccessEntityFormService, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, AlertService, ngObibaMicaAccessTemplateUrl) {
    // Begin profileService    
    function getAttributeValue(attributes, key) {
      var result = attributes.filter(function (attribute) {
        return attribute.key === key;
      });

      return result && result.length > 0 ? result[0].value : null;
    }

    $scope.userProfile = function (profile) {
      $scope.applicant = profile;
      $uibModal.open({
        scope: $scope,
        templateUrl: 'access/views/data-access-request-profile-user-modal.html'
      });
    };

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
    // End profileService

    function getDataContent(data) {
      return data.content ? JSON.parse(data.content) : {};
    }

    function resetRequestEntity() {
      var entity = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
      Promise.all([entity, entity.$promise.then(getDataContent)])
        .then(function (values) {
          $scope.requestEntity = values[0];
          $scope.model = values[1];
        });
    }

    $scope.entityUrl = DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id);
    $scope.read = true;

    var amendment = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
    var model = amendment.$promise.then(getDataContent);
    var dataAccessForm = DataAccessAmendmentFormConfigResource.get();

    Promise.all([amendment, model, dataAccessForm]).then(function (values) {
      $scope.requestEntity = values[0];
      $scope.model = values[1];
      $scope.dataAccessForm = values[2];

      $scope.actions = DataAccessEntityService.actions;
      $scope.nextStatus = DataAccessEntityService.nextStatus;

      Object.assign($scope, DataAccessEntityFormService.for($scope.requestEntity, resetRequestEntity));

      return values;
    }, function (reason) {
      console.error('Failed to resolve amendment promises because', reason);
    });

    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');

    $scope.submit = function () {
      $scope.$broadcast('schemaFormValidate');
      if ($scope.forms.requestForm.$valid) {
        DataAccessEntityResource.updateStatus($scope.entityUrl, $routeParams.id, DataAccessEntityService.status.SUBMITTED).$promise
          .then(function () {
            $uibModal.open({
              scope: $scope,
              templateUrl: 'access/views/data-access-request-submitted-modal.html'
            }).result.then(function () {
              resetRequestEntity();
            });
          });
      } else {
        AlertService.alert({
          id: 'DataAccessAmendmentViewController',
          type: 'danger',
          msgKey: 'data-access-request.submit.invalid'
        });
      }
    };
  }

  angular.module('obiba.mica.access').controller('DataAccessAmendmentViewController', ['$scope', '$routeParams', '$uibModal', 'DataAccessEntityResource', 'DataAccessEntityService', 'DataAccessEntityFormService', 'DataAccessAmendmentFormConfigResource', 'DataAccessEntityUrls', 'AlertService', 'ngObibaMicaAccessTemplateUrl', Controller]);
})();
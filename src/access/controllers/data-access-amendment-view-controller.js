'use strict';

(function () {
  function Controller($scope, $routeParams, $uibModal, DataAccessEntityResource, DataAccessEntityService, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, ngObibaMicaAccessTemplateUrl) {
    console.log($routeParams);
    $scope.entityUrl = DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id);
    
    var amendment = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);    
    var model = amendment.$promise.then(function (data) {
      return data.content ? JSON.parse(data.content) : {};
    });
    var dataAccessForm = DataAccessAmendmentFormConfigResource.get();

    var response = Promise.all([amendment, model, dataAccessForm]).then(function (values) {
      $scope.requestEntity = values[0];
      $scope.model = values[1];
      $scope.dataAccessForm = values[2];

      $scope.actions = DataAccessEntityService.actions;
      $scope.nextStatus = DataAccessEntityService.nextStatus;

      return values;
    }, function (reason) {
      return reason;
    });

    console.log('response', response);

    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');

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
  }

  angular.module('obiba.mica.access').controller('DataAccessAmendmentViewController', ['$scope', '$routeParams', '$uibModal', 'DataAccessEntityResource', 'DataAccessEntityService', 'DataAccessAmendmentFormConfigResource', 'DataAccessEntityUrls', 'ngObibaMicaAccessTemplateUrl', Controller]);
})();
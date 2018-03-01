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

ngObibaMica.analysis
.controller('EntitiesCountController', [
  '$scope',
  '$location',
  'EntitiesCountResource',
  'AlertService',
  'ServerErrorUtils',
  'ngObibaMicaAnalysisTemplateUrl',
  'EntitiesCountService', 
  function($scope, $location, EntitiesCountResource, AlertService, ServerErrorUtils, ngObibaMicaAnalysisTemplateUrl, EntitiesCountService) {
    $scope.entitiesHeaderTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getHeaderUrl('entities');
    $scope.result = {};
    $scope.query = $location.search().query;

    function onError(response) {
      $scope.result = {};
      $scope.loading = false;
      AlertService.alert({
        id: 'EntitiesCountController',
        type: 'danger',
        msg: ServerErrorUtils.buildMessage(response),
        delay: 5000
      });
    }

    $scope.loading = false;
    EntitiesCountResource.get({ query: $scope.query },
      function onSuccess(response) {
        $scope.result = response;
        $scope.showStudy = !EntitiesCountService.isSingleStudy();
        $scope.loading = false;
      },
      onError);
  }]);

'use strict';

ngObibaMica.search
  .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'RqlQueryService',
    '$filter',
    '$scope',

    function (GraphicChartsConfig,
      GraphicChartsUtils,
      RqlQueryService,
      $filter,
      $scope
      ) {
      $scope.updateCriteria = function (key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          $scope.onUpdateCriteria(item, 'studies');
        });
      };

      function initialize(result) {
        if (!result) {
          return;
        }

        $scope.chartObjects = {};
        $scope.noResults = true;

       var graphs = GraphicChartsUtils.getGraphConfig();

        if (result && result.studyResultDto.totalHits) {
          $scope.noResults = false;
          $scope.dtosResult = result;
          $scope.chartObjects = [];
          Object.keys(graphs).forEach(function(Chart){
            var chartOption = {
              chartConfig: null
            };
            chartOption.chartConfig = graphs[Chart];
            $scope.chartObjects.push(chartOption);
          });
          $scope.dtosResult = result;
        }
      }

      $scope.__defineSetter__('result', initialize);
    }])

  .directive('graphicsResult', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '<',
        loading: '<',
        onUpdateCriteria: '='
      },
      controller: 'GraphicsResultController',
      templateUrl: 'search/components/result/graphics-result/component.html'
    };
  }]);
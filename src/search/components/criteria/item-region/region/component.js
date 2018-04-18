'use strict';

ngObibaMica.search
  .controller('searchCriteriaRegionController', ['$scope', 'RqlQueryService', '$timeout', function ($scope, RqlQueryService, $timeout) {
    var canShow = false;

    $scope.$watchCollection('search.criteria', function () {
      $scope.renderableTargets = RqlQueryService.getRenderableTargetCriteriaFromRoot($scope.search.criteria);
    });

    $scope.$watchCollection('search.criteriaItemMap', function () {
      if ($scope.search.criteriaItemMap) {
        canShow = Object.keys($scope.search.criteriaItemMap).length > 1;
      }
    });

    $scope.$watchCollection('search.rqlQuery', function () {
      var args = angular.copy($scope.search.rqlQuery.args);
      if (args) {
        // remove limit or sort statements as these will be handled by other clients
        angular.forEach(args, function(arg) {
          if (arg.args) {
            var i = arg.args.length;
            while(i--) {
              if (arg.args[i].name === 'limit' || arg.args[i].name === 'sort') {
                arg.args.splice(i, 1);
              }
            }
          }
        });
        // remove empty RQL nodes
        var i = args.length;
        while(i--) {
          if (!args[i].args || args[i].args.length === 0) {
            args.splice(i, 1);
          }
        }
      }
      $scope.query = new RqlQuery().serializeArgs(args);
    });

    var canShowCriteriaRegion = function () {
      return ($scope.options.studyTaxonomiesOrder.length || $scope.options.datasetTaxonomiesOrder.length || $scope.options.networkTaxonomiesOrder.length) && canShow;
    };

    $scope.showCopiedQueryTooltipStatus = false;
    var showCopiedQueryTooltip = function () {
      $scope.showCopiedQueryTooltipStatus = true;
      $timeout(function () {
        $scope.showCopiedQueryTooltipStatus = false;
      }, 1000);
    };

    $scope.showCopiedQueryTooltip = showCopiedQueryTooltip;
    $scope.canShowCriteriaRegion = canShowCriteriaRegion;
  }])

  .directive('searchCriteriaRegion', ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        options: '=',
        search: '='
      },
      controller: 'searchCriteriaRegionController',
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchCriteriaRegionTemplate')
    };
  }]);
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

(function () {
  function NetworksResultTable(PageUrlService,
    ngObibaMicaSearch,
    RqlQueryService,
    StudyFilterShortcutService,
    ngObibaMicaSearchTemplateUrl) {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
        lang: '=',
        summaries: '=',
        loading: '=',
        onUpdateCriteria: '='
      },
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchNetworksResultTable'),
      link: function (scope) {
        function setInitialStudyFilterSelection() {
          var result = StudyFilterShortcutService.getStudyClassNameChoices();

          angular.extend(scope, result); // adds choseAll, choseIndividual and choseHarmonization functions

          /* jshint bitwise: false */
          scope.colSpans = {
            datasets: (scope.optionsCols.showNetworksStudyDatasetColumn & result.choseIndividual) + (scope.optionsCols.showNetworksHarmonizationDatasetColumn & result.choseHarmonization),
            variables: (scope.optionsCols.showNetworksStudyVariablesColumn & result.choseIndividual) + (scope.optionsCols.showNetworksDataschemaVariablesColumn & result.choseHarmonization)
          };
        }

        var options = ngObibaMicaSearch.getOptions();
        scope.options = options.networks;
        scope.resultTabOrder = options.resultTabsOrder;
        scope.optionsCols = scope.options.networksColumn;
        scope.PageUrlService = PageUrlService;

        scope.$on('$locationChangeSuccess', function () {
          setInitialStudyFilterSelection();
        });

        scope.updateCriteria = function (id, type, destinationType, tabEvent) {
          var newTab = null;
          if(window.event.type === 'click' && window.event.ctrlKey && tabEvent){
            newTab = {
              display: 'list'
            };
          }
          var datasetClassName;
          if (type === 'HarmonizationDataset' || type === 'StudyDataset') {
            datasetClassName = type;
            type = 'datasets';
          }

          var stuydClassName;
          if (type === 'HarmonizationStudy' || type === 'Study') {
            stuydClassName = type;
            type = 'studies';
          }

          var variableType;
          if (type === 'DataschemaVariable' || type === 'CollectedVariable') {
            variableType = type.replace('Variable', '');
            type = 'variables';
          }

          type = destinationType ? destinationType : type;
          if(newTab){
            newTab.type = type;
          }
          RqlQueryService.createCriteriaItem('network', 'Mica_network', 'id', id).then(function (item) {
            if (datasetClassName) {
              RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'className', datasetClassName).then(function (datasetItem) {
                scope.onUpdateCriteria(item, type, false, false, false, false, newTab);
                scope.onUpdateCriteria(datasetItem, type, false, false, false, false, newTab, true);
              });
            } else if (stuydClassName) {
              RqlQueryService.createCriteriaItem('study', 'Mica_study', 'className', stuydClassName).then(function (studyItem) {
                scope.onUpdateCriteria(item, type, false, false, false, false, newTab);
                scope.onUpdateCriteria(studyItem, type, false, false, false, false, newTab, true);
              });
            } else if (variableType) {
              RqlQueryService.createCriteriaItem('variable', 'Mica_variable', 'variableType', variableType).then(function (variableItem) {
                scope.onUpdateCriteria(item, type, false, false, false, false, newTab);
                scope.onUpdateCriteria(variableItem, type, false, false, false, false, newTab, true);
              });
            } else {
              scope.onUpdateCriteria(item, type, false, false, false, false, newTab, true);
            }
          });
        };

        setInitialStudyFilterSelection();
      }
    };
  }

  ngObibaMica.search.directive('networksResultTable',
    [
      'PageUrlService',
      'ngObibaMicaSearch',
      'RqlQueryService',
      'StudyFilterShortcutService',
      'ngObibaMicaSearchTemplateUrl',
      NetworksResultTable
    ]);
})();

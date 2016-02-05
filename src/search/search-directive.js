/*
 * Copyright (c) 2016 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('obiba.mica.search')
  .directive('taxonomyPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        taxonomy: '=',
        lang: '=',
        onNavigate: '='
      },
      templateUrl: 'search/views/taxonomy-panel-template.html'
    };
  }])

  .directive('vocabularyPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        taxonomy: '=',
        vocabulary: '=',
        lang: '=',
        onNavigate: '='
      },
      templateUrl: 'search/views/vocabulary-panel-template.html'
    };
  }])

  .directive('termPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        target: '=',
        taxonomy: '=',
        vocabulary: '=',
        term: '=',
        lang: '=',
        onSelect: '='
      },
      templateUrl: 'search/views/term-panel-template.html'
    };
  }])

  .directive('networksResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/views/list/networks-search-result-table-template.html'
    };
  }])

  .directive('datasetsResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/views/list/datasets-search-result-table-template.html'
    };
  }])

  .directive('studiesResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/views/list/studies-search-result-table-template.html'
    };
  }])

  .directive('variablesResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/views/list/variables-search-result-table-template.html'
    };
  }])

  .directive('coverageResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '=',
        loading: '='
      },
      controller: 'CoverageResultTableController',
      templateUrl: 'search/views/coverage/coverage-search-result-table-template.html'
    };
  }])

  .directive('graphicsResult', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '=',
        loading: '='
      },
      controller: 'GraphicsResultController',
      templateUrl: 'search/views/graphics/graphics-search-result-template.html'
    };
  }])

  .directive('resultPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        type: '=',
        display: '=',
        dto: '=',
        lang: '=',
        loading: '=',
        onTypeChanged: '='
      },
      controller: 'SearchResultController',
      templateUrl: 'search/views/search-result-panel-template.html'
    };
  }])

  .directive('criterionDropdown', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        query: '=',
        onSelect: '=',
        onRemove: '='
      },
      controller: 'CriterionDropdownController',
      templateUrl: 'search/views/criterion-dropdown-template.html',
      link: function(scope, element) {
        scope.remove = function(id) {
          scope.onRemove(id);
          element.remove();
          scope.$destroy();
        };
      }
    };
  }])

  .directive('criteriaPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criteria: '=',
        query: '='
      },
      controller: 'CriteriaPanelController',
      templateUrl: 'search/views/criteria-panel-template.html'
    };
  }]);

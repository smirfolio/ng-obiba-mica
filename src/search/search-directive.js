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
        summaries: '='
      },
      templateUrl: 'search/views/networks-search-result-table-template.html'
    };
  }])

  .directive('datasetsResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '='
      },
      templateUrl: 'search/views/datasets-search-result-table-template.html'
    };
  }])

  .directive('studiesResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '='
      },
      templateUrl: 'search/views/studies-search-result-table-template.html'
    };
  }])

  .directive('variablesResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        summaries: '='
      },
      templateUrl: 'search/views/variables-search-result-table-template.html'
    };
  }])

  .directive('resultPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        type: '=',
        dto: '=',
        lang: '=',
        onTypeChanged: '='
      },
      controller: 'SearchResultController',
      templateUrl: 'search/views/search-result-panel-template.html'
    };
  }])

  .directive('queryDropdown', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        onSelect: '='
      },
      controller: 'QueryDropdownController',
      templateUrl: 'search/views/query-dropdown-template.html'
    };
  }])

  .directive('queryPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criteria: '='
      },
      controller: 'QueryPanelController',
      templateUrl: 'search/views/query-panel-template.html'
    };
  }]);

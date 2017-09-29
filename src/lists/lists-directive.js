/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('obiba.mica.lists')
  .directive('listSortWidget', [function () {
    return {
      restrict: 'EA',
      controller: 'listSortWidgetController',
      templateUrl: 'lists/views/sort-widget/sort-widget-template.html'
    };
  }])
  .directive('listSearchWidget', [function () {
    return {
      restrict: 'EA',
      require: '^^suggestionField',
      transclude: true,
      replace: true,
      scope: {
        target: '='
      },
      controller: 'listSearchWidgetController',
      templateUrl: 'lists/views/input-search-widget/input-search-widget-template.html'
    };
  }])

  .directive('suggestionField', ['DocumentSuggestionResource', '$translate',
    function (DocumentSuggestionResource, $translate) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          target: '=',
          model: '=',
          placeholderText: '=',
          select: '='
        },
        templateUrl: 'lists/views/input-search-widget/suggestion-field.html',
        link: function (scope) {
          scope.suggest = function (query) {
            if (scope.target && query && query.length > 1) {
              return DocumentSuggestionResource.query({locale: $translate.use(), documentType: scope.target, query: query})
                  .$promise.then(function (response) { return Array.isArray(response) ? response : []; });
            } else {
              return [];
            }
          };
        }
      };
    }]
  );
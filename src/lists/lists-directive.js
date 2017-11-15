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

/* global typeToTarget */

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
        type: '='
      },
      controller: 'listSearchWidgetController',
      templateUrl: 'lists/views/input-search-widget/input-search-widget-template.html'
    };
  }])

  .directive('suggestionField', ['$location', 'DocumentSuggestionResource', '$translate','RqlQueryService',
    function ($location, DocumentSuggestionResource, $translate, RqlQueryService) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          documentType: '=',
          model: '=',
          placeholderText: '=',
          select: '='
        },
        templateUrl: 'lists/views/input-search-widget/suggestion-field.html',
        link: function (scope) {
          scope.suggest = function (query) {
            if (scope.documentType && query && query.length > 1) {
              var rql = RqlQueryService.parseQuery($location.search().query);
              var targetQuery = RqlQueryService.findTargetQuery(typeToTarget(scope.documentType), rql);
              var classNameQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className');
              if (classNameQuery) {
                query = 'className:' + classNameQuery.args[1] + ' AND (' + query.replace(/\/.*/, '') + ')';
              }

              return DocumentSuggestionResource.query({locale: $translate.use(), documentType: scope.documentType, query: query})
                  .$promise
                  .then(function (response) {
                      var parsedResponse = Array.isArray(response) ? response : [];

                      for (var i = 0; i < parsedResponse.length; i++) {
                        parsedResponse[i] = parsedResponse[i].replace(/\/.*/, '');
                      }

                      return parsedResponse;
                  });
            } else {
              return [];
            }
          };
        }
      };
    }]
  );
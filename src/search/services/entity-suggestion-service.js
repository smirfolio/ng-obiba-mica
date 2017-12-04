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

(function() {
  ngObibaMica.search.EntitySuggestionService = function($rootScope,
                                                        $location,
                                                        $translate,
                                                        DocumentSuggestionResource,
                                                        RqlQueryService) {

    function suggest(entityType, query) {
      if (entityType && query && query.length > 1) {
        return DocumentSuggestionResource.query({locale: $translate.use(), documentType: entityType, query: query})
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
    }

    function getCurrentSuggestion(target, query) {

      if (query) {
        var targetQuery = RqlQueryService.findTargetQuery(target, query);
        if (targetQuery) {
          var matchQuery = targetQuery.args.filter(function (arg) {
            return arg.name === RQL_NODE.MATCH && arg.args.length === 1;
          }).pop();

          return matchQuery && matchQuery.args ? matchQuery.args[0][0] : '';
        }
      }

      return '';
    }

    function selectSuggestion(target, suggestion) {
      $rootScope.$new().$emit('ngObibaMicaSearch.searchSuggestion', suggestion, target);
    }

    this.getCurrentSuggestion = getCurrentSuggestion;
    this.suggest = suggest;
    this.selectSuggestion = selectSuggestion;
  };

  ngObibaMica.search
    .service('EntitySuggestionService', [
      '$rootScope',
      '$location',
      '$translate',
      'DocumentSuggestionResource',
      'RqlQueryService',
      ngObibaMica.search.EntitySuggestionService
    ]);

})();
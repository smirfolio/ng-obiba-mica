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
  ngObibaMica.search.EntitySuggestionService = function($translate, DocumentSuggestionResource) {

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

    this.suggest = suggest;
  };

  ngObibaMica.search
    .service('EntitySuggestionService', [
      '$translate',
      'DocumentSuggestionResource',
      ngObibaMica.search.EntitySuggestionService
    ]);

})();
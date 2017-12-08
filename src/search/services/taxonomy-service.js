/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function() {
  'use strict';

  ngObibaMica.search.FilterVocabulariesByQueryString = function($translate, LocalizedValues) {
    function translateField(title) {
      return LocalizedValues.forLocale(title, $translate.use());
    }

    function asciiFold(text) {
      return text.normalize('NFD').replace(/\//g, ' ').replace(/[^\w|^\s|^-]/g, '');
    }

    function filter(vocabularies, queryString) {
      if (queryString) {
        var tokens = asciiFold(queryString).toLowerCase().split(' ').filter(function (token) {
          return token.length > 2;
        });
        var vocabulariesToFilter = angular.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;

        return (vocabulariesToFilter || []).filter(function (vocabulary) {
          vocabulary.filteredTerms = (vocabulary.terms || []).filter(function (term) {
            // term is selected when each of the token is included
            var toMatch = asciiFold(translateField(term.title) + ' ' + translateField(term.description) + ' ' + translateField(term.keywords)).trim();
            return tokens.map(function (token) {
              if (token.startsWith('-')) {
                var ntoken = token.substr(1);
                if (ntoken.length <= 2) {
                  return true;
                }
                return toMatch.indexOf(ntoken) === -1;
              }
              return toMatch.indexOf(token) >= 0;
            }).reduce(function(acc, val) {
              return acc && val;
            }, true);

          });

          return vocabulary.terms ? vocabulary.filteredTerms.length > 0 : true;
        });

      }
    }

    this.filter = filter;
  };

  ngObibaMica.search.TaxonomyService = function($q, TaxonomiesResource, TaxonomyResource, VocabularyService) {

    /**
     * @returns Returns a taxonomy
     */
    function getTaxonomy(target, taxonomyName) {
      return TaxonomyResource.get({
        target: target,
        taxonomy: taxonomyName
      }).$promise;
    }

    function getTaxonomiesInternal(target, taxonomyNames) {
      return TaxonomiesResource.get({
        target: target,
        query: 'taxonomyName:' + taxonomyNames.join(' OR taxonomyName:')
      }).$promise;
    }

    /**
     * @returns Returns a taxonomy for several names
     */
    function getTaxonomies(target, taxonomyNames) {
      var deferred = $q.defer();
      if (Array.isArray(taxonomyNames)) {
        getTaxonomiesInternal(target, taxonomyNames).then(function(taxonomies) {
          taxonomies.forEach(function(taxonomy) {
            taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
          });
          deferred.resolve(taxonomies);
        });
      } else {
        getTaxonomy(target, taxonomyNames).then(function(taxonomy) {
          taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
          deferred.resolve(taxonomy);
        });
      }

      return deferred.promise;
    }

    // exported functions

    this.getTaxonomy = getTaxonomy;
    this.getTaxonomies = getTaxonomies;
  };

  ngObibaMica.search
    .service('TaxonomyService',
      ['$q', 'TaxonomiesResource', 'TaxonomyResource', 'VocabularyService', ngObibaMica.search.TaxonomyService])
    .service('FilterVocabulariesByQueryString', ['$translate','LocalizedValues',  ngObibaMica.search.FilterVocabulariesByQueryString]);

})();
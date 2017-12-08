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

  ngObibaMica.search.VocabularyService = function($translate, LocalizedValues, MetaTaxonomyService) {

    function translateField(title) {
      return LocalizedValues.forLocale(title, $translate.use());
    }

    function asciiFold(text) {
      return text.normalize('NFD').replace(/\//g, ' ').replace(/[^\w|^\s|^-]/g, '');
    }

    /**
     * Filters the list of vocabularies based on a query string. A leading '-' will negate the filter result.
     *
     * @param vocabularies
     * @param queryString
     * @returns filtered vocabularies
     */
    function filter(vocabularies, queryString) {
      if (queryString) {
        var tokens = asciiFold(queryString).toLowerCase().split(' ').filter(function (token) {
          return token.length > 2;
        });

        var vocabulariesToFilter = Array.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;
        var fieldsToFilter = MetaTaxonomyService.getTaxonomyPanelOptions().fieldsToFilter;

        return (vocabulariesToFilter || []).filter(function (vocabulary) {
          vocabulary.filteredTerms = (vocabulary.terms || []).filter(function (term) {
            // Filter on configurable field
            var toMatchField = fieldsToFilter.reduce(function(toMatchField, field){
              return toMatchField + ' ' + translateField(term[field]);
            },fieldsToFilter[0] );
            // term is selected when each of the token is included
            var toMatch = asciiFold(toMatchField).trim().toLowerCase();
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

    function isVocabularyVisible(vocabulary) {
      if (!vocabulary) {
        return false;
      }

      var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function(a) {
        return a.key === 'hidden';
      }).pop() : null;

      return !hidden || hidden.value === 'false';
    }

    function isFacetVocabularyVisible(vocabulary) {
      if (!vocabulary || !vocabulary.attributes) {
        return false;
      }

      var result = vocabulary.attributes.filter(function(attribute) {
        return ['hidden' ,'facet'].indexOf(attribute.key) > -1;
      }).reduce(function(a, i) {
        a[i.key] = i.value;
        return a;
      }, {});

      return 'true' === result.facet && (!result.hidden || 'false' === result.hidden);
    }

    function findVocabularyAttributes(vocabulary, pattern) {
      return (vocabulary.attributes || []).filter(function(attribute){
        return attribute.key.search(pattern) > -1;
      }).reduce(function(a, i) {
        a[i.key] = i.value;
        return a;
      }, {});
    }

    function visibleVocabularies(vocabularies) {
      return (vocabularies || []).filter(isVocabularyVisible);
    }

    function visibleFacetVocabularies(vocabularies) {
      return (vocabularies || []).filter(isFacetVocabularyVisible);
    }

    this.isVisibleVocabulary = isVocabularyVisible;
    this.findVocabularyAttributes = findVocabularyAttributes;
    this.visibleVocabularies = visibleVocabularies;
    this.visibleFacetVocabularies = visibleFacetVocabularies;
    this.filter = filter;

    return this;
  };

  ngObibaMica.search.service('VocabularyService',
    ['$translate','LocalizedValues', 'MetaTaxonomyService', ngObibaMica.search.VocabularyService]);

})();
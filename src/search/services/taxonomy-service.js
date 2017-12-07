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
      return text.normalize('NFD').replace(/[^\w]/g, '');
    }

    function translateAndAsciiFold(text) {
      return asciiFold(translateField(text).toLowerCase());
    }

    function filter(vocabularies, queryString) {
      if(queryString){
        var vocabulariesToFilter = angular.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;

        return (vocabulariesToFilter || []).filter(function(vocabulary) {
          vocabulary.filteredTerms =  (vocabulary.terms || []).filter(function(term){
           return translateAndAsciiFold(term.title).indexOf(asciiFold(queryString.toLowerCase())) >= 0 ||
             translateAndAsciiFold(term.description).indexOf(asciiFold(queryString.toLowerCase())) >= 0 ||
             translateAndAsciiFold(term.keywords).indexOf(asciiFold(queryString.toLowerCase()))  >= 0;
          });

          return vocabulary.terms ? vocabulary.filteredTerms.length > 0 : true;
        });

      }
    }

    this.filter = filter;
  };

  ngObibaMica.search.TaxonomyService = function(TaxonomiesResource, TaxonomyResource) {

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
      var func = Array.isArray(taxonomyNames) ? getTaxonomiesInternal : getTaxonomy;
      return func(target, taxonomyNames);
    }

    // exported functions

    this.getTaxonomy = getTaxonomy;
    this.getTaxonomies = getTaxonomies;
  };

  ngObibaMica.search
    .service('TaxonomyService', ['TaxonomiesResource', 'TaxonomyResource', ngObibaMica.search.TaxonomyService])
    .service('FilterVocabulariesByQueryString', ['$translate','LocalizedValues',  ngObibaMica.search.FilterVocabulariesByQueryString]);

})();
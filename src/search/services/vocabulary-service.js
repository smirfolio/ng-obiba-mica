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

  ngObibaMica.search.VocabularyService = function() {

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

    return this;
  };

  ngObibaMica.search.service('VocabularyService', [ngObibaMica.search.VocabularyService]);

})();
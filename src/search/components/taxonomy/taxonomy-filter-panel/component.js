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

(function () {
  ngObibaMica.search.TaxonomyFilterPanelController = function(FilterVocabulariesByQueryString) {
    var ctrl = this;

    function selectTaxonomyVocabularyArgs(taxonomy, vocabulary, args) {
      console.log('TaxonomyFilterPanelController');
      ctrl.onSelectTerm({target: ctrl.target, taxonomy: taxonomy, vocabulary: vocabulary, args: args});
    }

    function onFilterChange(queryString) {
      if (!ctrl.taxonomyIsArray) {
        filterChangedForSingleTaxonomy(queryString);
      } else {
        filterChangedForMultipleTaxonomies(queryString);
      }
    }

    function filterChangedForSingleTaxonomy(queryString) {
      if (queryString) {
        ctrl.filteredVocabularies = FilterVocabulariesByQueryString.filter(ctrl.taxonomy.vocabularies, queryString);
      } else {
        ctrl.filteredVocabularies = initFilteredVocabularies(ctrl.taxonomy);
      }
    }

    function filterChangedForMultipleTaxonomies(queryString) {
      ctrl.filteredVocabularies = {};
      if (queryString) {
        ctrl.taxonomy.forEach(function (subTaxonomy) {
          ctrl.filteredVocabularies[subTaxonomy.name] = FilterVocabulariesByQueryString.filter(subTaxonomy, queryString);
        });
      } else {
        ctrl.taxonomy.forEach(function (subTaxonomy) {
          ctrl.filteredVocabularies[subTaxonomy.name] = initFilteredVocabularies(subTaxonomy);
        });
      }
    }

    function togglePannel(){
      ctrl.onToggle(ctrl.target, null);
    }

    function initFilteredVocabularies(taxonomy) {
      return taxonomy.vocabularies.map(function (vocabulary) {
        vocabulary.filteredTerms = vocabulary.terms;
        return vocabulary;
      });
    }

    function onChanges(changesObj) {
      ctrl.taxonomyIsArray = Array.isArray(ctrl.taxonomy);
      if (changesObj.taxonomy) {
        onFilterChange();
      }
    }

    function removeCriterion(item) {
      ctrl.onRemoveCriterion({item: item});
    }

    ctrl.$onChanges = onChanges;
    ctrl.selectTaxonomyVocabularyArgs = selectTaxonomyVocabularyArgs;
    ctrl.onFilterChange = onFilterChange;
    ctrl.togglePannel = togglePannel;
    ctrl.removeCriterion = removeCriterion;
  };

  ngObibaMica.search
    .component('taxonomyFilterPanel', {
      transclude: true,
      bindings: {
        result: '<',
        resultTabsOrder: '<',
        taxonomyTypeMap: '<',
        target: '<',
        taxonomy: '<',
        onSelectTerm: '&',
        onRemoveCriterion: '&',
        onToggle: '<'
      },
      templateUrl: 'search/components/taxonomy/taxonomy-filter-panel/component.html',
      controller: ['FilterVocabulariesByQueryString', ngObibaMica.search.TaxonomyFilterPanelController]
    });
})();

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
  ngObibaMica.search.TaxonomyFilterPanelController = function() {
    var ctrl = this;

    function selectTaxonomyVocabularyArgs(vocabulary, args) {
      ctrl.onSelectTerm({target: ctrl.target, taxonomy: ctrl.taxonomy, vocabulary: vocabulary, args: args});
    }

    ctrl.selectTaxonomyVocabularyArgs = selectTaxonomyVocabularyArgs;
  };

  ngObibaMica.search
    .component('taxonomyFilterPanel', {
      transclude: true,
      bindings: {
        target: '@',
        taxonomy: '<',
        onSelectTerm: '&'
      },
      templateUrl: 'search/components/taxonomy/taxonomy-filter-panel/component.html',
      controller: [ngObibaMica.search.TaxonomyFilterPanelController]
    });
})();

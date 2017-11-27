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

ngObibaMica.search.TaxonomyFilterDetailController = function() {
  var ctrl = this;

  function selectVocabularyArgs(vocabulary, args) {
    ctrl.onSelectTaxonomyTerm({taxonomy: ctrl.taxonomy, vocabulary: vocabulary, args: args});
  }

  ctrl.selectVocabularyArgs = selectVocabularyArgs;
};

ngObibaMica.search

  .component('taxonomyFilterDetail', {
    bindings: {
      vocabularies: '<',
      onSelectTaxonomyTerm: '&'
    },
    templateUrl: 'search/components/taxonomy/taxonomy-filter-detail/component.html',
    controller: [ngObibaMica.search.TaxonomyFilterDetailController]
  });

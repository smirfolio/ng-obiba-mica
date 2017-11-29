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
  ngObibaMica.search.VocabularyFilterDetailController = function (RqlQueryUtils) {
    var ctrl = this;

    if (RqlQueryUtils.isTermsVocabulary(ctrl.vocabulary) || RqlQueryUtils.isRangeVocabulary(ctrl.vocabulary)) {
      ctrl.criterionType = 'string-terms';
    } else if (RqlQueryUtils.isNumericVocabulary(ctrl.vocabulary)) {
      ctrl.criterionType = 'numeric';
    } else if (RqlQueryUtils.isMatchVocabulary(ctrl.vocabulary)) {
      ctrl.criterionType = 'match';
    }

    function selectVocabularyArgs(args) {
      console.log('VocabularyFilterDetailController');
      ctrl.onSelectVocabularyArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    ctrl.selectVocabularyArgs = selectVocabularyArgs;
  };

  ngObibaMica.search
    .component('vocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectVocabularyArgs: '&'
      },
      templateUrl: 'search/components/vocabulary/vocabulary-filter-detail/component.html',
      controller: ['RqlQueryUtils', ngObibaMica.search.VocabularyFilterDetailController]
    });
})();

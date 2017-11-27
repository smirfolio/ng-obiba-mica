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
  ngObibaMica.search.NumericVocabularyFilterDetailController = function() {
    var ctrl = this;

    function setRangeValue(input) {
      var args = {from: input.from, to: input.to};
      ctrl.onSelectArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    ctrl.setRangeValue = setRangeValue;
  };

  ngObibaMica.search
    .component('numericVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/numeric-vocabulary-filter-detail/component.html',
      controller: [ngObibaMica.search.NumericVocabularyFilterDetailController]
    });
})();

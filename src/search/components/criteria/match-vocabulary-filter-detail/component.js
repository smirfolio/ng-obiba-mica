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
  ngObibaMica.search.MatchVocabularyFilterDetailController = function() {
    var ctrl = this;

    function enterText(keyUpEvent) {
      var input = new obiba.utils.NgObibaStringUtils().cleanDoubleQuotesLeftUnclosed(keyUpEvent.target.value);
      var args = {text: input || '*'};
      if (keyUpEvent.keyCode === 13) {
        ctrl.onSelectArgs({vocabulary: ctrl.vocabulary, args: args});
      }
    }

    ctrl.enterText = enterText;
  };

  ngObibaMica.search
    .component('matchVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/match-vocabulary-filter-detail/component.html',
      controller: [ngObibaMica.search.MatchVocabularyFilterDetailController]
    });
})();

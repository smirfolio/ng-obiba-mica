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

ngObibaMica.search
  .component('matchVocabularyFilterDetail', {
    transclude: true,
    bindings: {
      vocabulary: '<'
    },
    templateUrl: 'search/components/criteria/match-vocabulary-filter-detail/component.html',
    controller: function() {
      // var ctrl = this;
    }
  });

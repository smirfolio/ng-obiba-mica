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

ngObibaMica.search.EntityCountsController = function() {
  var ctrl = this;
  function getTotalHits(entity){
    if (!ctrl.result.list || !ctrl.result.list[entity + 'ResultDto']) {
      return '';
    }
    return ctrl.result.list[entity + 'ResultDto'].totalHits;
  }
  ctrl.getTotalHits = getTotalHits;
};

ngObibaMica.search
  .component('entityCounts', {
    transclude: true,
    bindings: {
      result: '<',
      target: '<',
      resultTabsOrder: '<',
      taxonomyTypeMap: '<'
    },
    templateUrl: 'search/components/entity-counts/component.html',
    controller: [ngObibaMica.search.EntityCountsController]
  });

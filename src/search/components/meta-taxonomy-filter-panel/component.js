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

var obibaMicaSearch = angular.module('obiba.mica.search');

obibaMicaSearch.Controller = function() {
 var ctrl = this;

  function toggle() {
    ctrl.onToggle();
  }


  ctrl.toggle = toggle;
};

angular.module('obiba.mica.search')
    .component('metaTaxonomyFilterPanel', {
    bindings: {
      tabs: '<',
      onToggle: '&'
    },
    templateUrl: 'search/components/meta-taxonomy-filter-panel/component.html',
    controller: ['$scope', obibaMicaSearch.Controller]
  });


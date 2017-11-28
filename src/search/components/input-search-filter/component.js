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

ngObibaMica.search.inputSearchFilterController = function() {
  var ctrl = this;

  function change(){
    ctrl.onFilterChange({queryString:ctrl.queryString});
  }

  ctrl.queryString = '';
  ctrl.change = change;
};


ngObibaMica.search

  .component('inputSearchFilter', {
    transclude: true,
    bindings: {
      queryString: '<',
      vocabularies: '<',
      onFilterChange: '&'
    },
    templateUrl: 'search/components/input-search-filter/component.html',
    controller: [ngObibaMica.search.inputSearchFilterController]
  });

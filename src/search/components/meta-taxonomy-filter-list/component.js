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

angular.module('obiba.mica.search')

  .component('metaTaxonomyFilterList', {
    transclude: true,
    bindings: {
      tab: '='
    },
    templateUrl: 'search/components/meta-taxonomy-filter-list/component.html',
    controller: function() {
      var ctrl = this;
      ctrl.items = ['Areas of Information', 'Scales / Measures', 'Source & Target', 'Properties'];
      ctrl.subItems = ['item 001','item 002','item 003','item 004','item 005'];
      ctrl.status = {isFirstOpen: true};
    }
  });

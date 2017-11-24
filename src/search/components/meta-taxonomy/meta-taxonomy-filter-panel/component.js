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

ngObibaMica.search.Controller = function($scope, MetaTaxonomyService, TaxonomyResource) {
 var ctrl = this;

  function toggle() {
    return TaxonomyResource.get({
      target: QUERY_TARGETS.VARIABLE,
      taxonomy: ctrl.metaTaxonomies[0].taxonomies[0].name
    }).$promise.then(function(taxonomy) {
        ctrl.onToggle(taxonomy);
      });


  }

  MetaTaxonomyService.getMetaTaxonomyForTargets(ctrl.tabs).then(function(metaTaxonomies) {
    ctrl.metaTaxonomies = metaTaxonomies;
  });

  ctrl.toggle = toggle;
};

ngObibaMica.search
    .component('metaTaxonomyFilterPanel', {
    bindings: {
      tabs: '<',
      onToggle: '<'
    },
    templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html',
    controller: ['$scope', 'MetaTaxonomyService', 'TaxonomyResource', ngObibaMica.search.Controller]
  });


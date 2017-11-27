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

ngObibaMica.search.Controller = function ($scope, MetaTaxonomyService, TaxonomyResource) {

  function onSelectTaxonomy(target, selectedTaxonomy) {
    if (ctrl.selectedTaxonomy !== selectedTaxonomy) {
      ctrl.selectedTaxonomy = selectedTaxonomy;
      ctrl.selectedTaxonomy.loading = true;
      return TaxonomyResource.get({
        target: target,
        taxonomy: selectedTaxonomy.info.name
      }).$promise.then(function (taxonomy) {
        delete ctrl.selectedTaxonomy.loading;
        ctrl.onToggle(taxonomy);
      });
    } else {
      delete ctrl.selectedTaxonomy.loading;
      ctrl.selectedTaxonomy = null;
      ctrl.onToggle(ctrl.selectedTaxonomy);
    }
  }

  /**
   * Retrieves all meta taxonomies
   */
  function init() {
    MetaTaxonomyService.getMetaTaxonomyForTargets(ctrl.tabs).then(function (metaTaxonomies) {
      ctrl.metaTaxonomies = metaTaxonomies;
    });
  }

  var ctrl = this;
  ctrl.loading = false;
  ctrl.selectedTaxonomy = null;
  ctrl.onSelectTaxonomy = onSelectTaxonomy;

  init();
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


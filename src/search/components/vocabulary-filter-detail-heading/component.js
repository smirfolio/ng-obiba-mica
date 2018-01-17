/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.VocabularyFilterDetailHeading = function($window) {
    var ctrl = this;

    function selectType(type){
      return ctrl.onSelectType({type: type});
    }

    function onFilterChange(queryString){
      return ctrl.onFilterChange({queryString:queryString});
    }

    function removeWindowEventHandlers() {
      $window.onkeyup = null;    
    }
    
    function addWindowEventHandlers() {
      
      $window.onkeyup = function(event) {
        if (event.keyCode === 27) {
          removeWindowEventHandlers();
          ctrl.togglePannel();
        }
      };
    }

    function initOverlay() {
      if (ctrl.showTaxonomyPanel) {
        addWindowEventHandlers();
      } else {
        removeWindowEventHandlers();
      }
    }
    
    ctrl.selectType = selectType;
    ctrl.filterChange = onFilterChange;

    initOverlay();
  };

  ngObibaMica.search
    .component('vocabularyFilterDetailHeading', {
      transclude: true,
      bindings: {
        showTaxonomyPanel: '<',
        taxonomyName: '<',
        taxonomiesQuery: '<',
        clearQuery: '<',
        onFilterChange: '&',
        taxonomyTypeMap: '<',
        resultTabsOrder: '<',
        target: '<',
        onSelectType: '&',
        result: '<',
        togglePannel: '&'
      },
      templateUrl: ['ngObibaMicaSearchTemplateUrl', function(ngObibaMicaSearchTemplateUrl){
        return ngObibaMicaSearchTemplateUrl.getTemplateUrl('vocabularyFilterDetailHeading');
      }],
      controller: ['$window', ngObibaMica.search.VocabularyFilterDetailHeading]
    });
})();

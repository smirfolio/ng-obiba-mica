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

(function() {

  ngObibaMica.search.VocabularyFilterDetailHeading = function() {
    var ctrl = this;

    function selectType(type){
      return ctrl.onSelectType({type: type});
    }

    function onFilterChange(queryString){
      return ctrl.onFilterChange({queryString:queryString});
    }

    ctrl.close = ctrl.togglePannel;
    ctrl.selectType = selectType;
    ctrl.filterChange = onFilterChange;
  };

  ngObibaMica.search
    .component('vocabularyFilterDetailHeading', {
      transclude: true,
      bindings: {
        taxonomyName: '=',
        taxonomiesQuery: '=',
        clearQuery: '=',
        onFilterChange: '&',
        taxonomyTypeMap: '=',
        resultTabsOrder: '=',
        target: '=',
        onSelectType: '&',
        result: '=',
        togglePannel: '&'
      },
      templateUrl: ['ngObibaMicaSearchTemplateUrl', function(ngObibaMicaSearchTemplateUrl){
        return ngObibaMicaSearchTemplateUrl.getTemplateUrl('vocabularyFilterDetailHeading');
      }],
      controller: ngObibaMica.search.VocabularyFilterDetailHeading
    });
})();

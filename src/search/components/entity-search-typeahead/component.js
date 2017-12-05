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

  ngObibaMica.search.Controller = function (EntitySuggestionService) {

    function init() {
      ctrl.model = EntitySuggestionService.getCurrentSuggestion(ctrl.target, ctrl.rqlQuery) || '';
    }

    function suggest(query) {
      return EntitySuggestionService.suggest(ctrl.entityType, query);
    }

    function select(suggestion) {
      EntitySuggestionService.selectSuggestion(ctrl.target, suggestion);
    }

    function onKeyUp(event) {
      if (event.keyCode === 13) {
        select(ctrl.model);
      }
    }

    function clear() {
      ctrl.model = '';
      select('');
    }

    function onChanges(changedObjects) {
      if (changedObjects.rqlQuery.currentValue) {
        init();
      }
    }

    var ctrl = this;
    ctrl.model = '';
    ctrl.suggest = suggest;
    ctrl.select = select;
    ctrl.clear = clear;
    ctrl.onKeyUp = onKeyUp;
    ctrl.$onChanges = onChanges;
  };

  ngObibaMica.search
    .component('entitySearchTypeahead', {
      bindings: {
        target: '<',
        entityType: '<',
        rqlQuery: '<',
        placeholderText: '@'
      },
      templateUrl: 'search/components/entity-search-typeahead/component.html',
      controller: ['EntitySuggestionService', ngObibaMica.search.Controller]
    });

})();
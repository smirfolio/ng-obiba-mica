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

angular.module('obiba.mica.lists')

  .controller('listSearchWidgetController', ['$scope', '$rootScope', 'StringUtils',
    function ($scope, $rootScope, StringUtils) {
      var emitter = $rootScope.$new();

      $scope.selectSuggestion = function (suggestion) {
        emitter.$emit('ngObibaMicaSearch.searchChange', StringUtils.quoteQuery(suggestion));
      };

      $scope.search = function() {
        emitter.$emit('ngObibaMicaSearch.searchChange', $scope.searchFilter);
      };
    }])
  .controller('listSortWidgetController', ['$scope', '$rootScope', 'sortWidgetService',
    function ($scope, $rootScope, sortWidgetService) {

      var emitter = $rootScope.$new();
      $scope.selectSort = sortWidgetService.getSortOptions();
      $scope.selectOrder = sortWidgetService.getOrderOptions();

      $scope.selected = {
        sort:  $scope.selectSort.options[0].value,
        order: $scope.selectOrder.options[0].value
      };

      var selectedOptions = sortWidgetService.getSortArg();
      if (selectedOptions) {
        $scope.selected = {
          sort:  selectedOptions.selectedSort ? selectedOptions.selectedSort.value : $scope.selectSort.options[0].value,
          order: selectedOptions.slectedOrder ? selectedOptions.slectedOrder.value : $scope.selectOrder.options[0].value
        };
      }
      $scope.radioCheked = function(){
        var sortParam = {
          sort: $scope.selected.sort,
          order: $scope.selected.order
        };
        if($scope.selected.sort === '_score'){
          sortParam.order= '-';
        }
        emitter.$emit('ngObibaMicaSearch.sortChange', sortParam);
      };
    }]);
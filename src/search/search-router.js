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

ngObibaMica.search
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'search/views/search-layout.html',
          controller: 'SearchController',
          reloadOnSearch: false,
          resolve: {
            // This will delay the loading of the search config until the options are all resolved; the result is
            // injected to the SearchController.
            options: ['ngObibaMicaSearch', function (ngObibaMicaSearch) {
              return ngObibaMicaSearch.getOptionsAsyn();
            }]
          }
        })
        .when('/classifications', {
          templateUrl: 'search/views/classifications.html',
          controller: 'SearchController',
          reloadOnSearch: false
        });
    }]);

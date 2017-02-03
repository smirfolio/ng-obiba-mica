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

function NgObibaMicaFileBrowserOptionsProvider() {
  var options = {
    locale: 'en',
    downloadInline: true,
    downloadKey: false,
    folders: {
      excludes: ['population']
    }
  };

  this.addExcludeFolder = function (folder) {
    if (folder) {
      options.folders.excludes.push(folder);
    }
  };

  this.$get = function () {
    return options;
  };
}

angular.module('obiba.mica.fileBrowser', [
  'pascalprecht.translate',
  'ui.bootstrap',
  'templates-ngObibaMica'
]).config(['$provide', function ($provide) {
  $provide.provider('ngObibaMicaFileBrowserOptions', new NgObibaMicaFileBrowserOptionsProvider());
}]);

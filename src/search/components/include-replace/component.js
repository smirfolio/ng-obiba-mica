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

(function () {
  function IncludeReplace() {
    return {
      require: 'ngInclude',
      link: function (scope, el) {
        el.replaceWith(el.children());
      }
    };
  }

  ngObibaMica.search.directive('includeReplace', IncludeReplace);
})();

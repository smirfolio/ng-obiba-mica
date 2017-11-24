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

ngObibaMica.module
  .Controller = function () {
  var ctrl = this;

  function toggle() {
    ctrl.onToggle();
  }

  // initialize properties can
  ctrl.toggle = toggle;
};

ngObibaMica.module
  .component('templateComponent', {
    bindings: {
      bla: '<', // one way binding
      onToggle: '&' // no references to call backs
    },
    templateUrl: 'search/components/template-component/component.html',
    controller: ['$scope', module.Controller]
  });


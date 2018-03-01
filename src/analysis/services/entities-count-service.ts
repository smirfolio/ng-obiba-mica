/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

declare var ngObibaMica: any;

interface IEntitiesCountService {
  isSingleStudy(): boolean;
}

class EntitiesCountService implements IEntitiesCountService {

  private options;

  constructor(ngObibaMicaSearch) {
    this.options = ngObibaMicaSearch.getOptions();
  }

  public isSingleStudy(): boolean {
    // not showing study means that there is only one
    return !this.options.studies.showSearchTab;
  }
}

ngObibaMica.analysis.service("EntitiesCountService", ["ngObibaMicaSearch", EntitiesCountService]);

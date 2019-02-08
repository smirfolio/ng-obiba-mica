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

declare var QUERY_TARGETS: any;
declare var QUERY_TYPES: any;

abstract class AbstractSelectionsDecorator implements ISelections {

  protected selections: any;
  protected documentType: string;

  constructor(documentType: string) {
    this.selections = {};
    this.documentType = documentType;
  }

  public getSelections(): any {
    return this.selections;
  }

  public clearSelections() {
    Object.keys(this.selections).forEach((key) => delete this.selections[key]);
  }

  public abstract select(id: string);

  public abstract selectPage();

  public abstract selectAll();

  public abstract decorate(client: any);
}

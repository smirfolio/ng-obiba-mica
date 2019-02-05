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

class PaginationController implements ng.IComponentController {

  public documents: any;
  public showTotal: boolean;
  public onChange: (args: any) => void;
  public pagination: any;
  public showPaginationTotal: boolean;
  public type: string;
  private preventPageChangeEvent: boolean = false;

  constructor() {
      console.log(this.documents);
      this.pagination = {};
  }

  public onUpdate(state: any, preventPageChangeEvent: boolean): void {
    this.preventPageChangeEvent = preventPageChangeEvent;
    this.pagination = state;
    this.showPaginationTotal = this.showTotal === true && this.pagination.pageCount > 1;
  }

  public pageChanged(): void {
    this.onChange({
      from: (this.pagination.currentPage - 1) * this.pagination.selected.value,
      replace: true === this.preventPageChangeEvent,
      size: this.pagination.selected.value,
    });
  }

  public pageSizeChanged(): void {
    this.pageChanged();
  }

  public $onInit(): void {
      console.log(this.documents);
      this.pagination.totalHits = this.documents ? this.documents.total : 0;
      this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
      this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
      this.pagination.from = this.documents ? this.documents.from + 1 : 0;
      const documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
      this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
  }
}

class PaginationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean = false;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
        documents: "=",
    };
    this.controller = PaginationController;
    this.controllerAs = "$ctrl";
    this.templateUrl = "data-table/components/obiba-data-table-pagination/component.html";
  }
}

ngObibaMica.search.component ("obibaDataTablePagination", new PaginationComponent());

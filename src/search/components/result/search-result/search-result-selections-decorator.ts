/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class SearchResultSelectionsDecorator extends AbstractSelectionsDecorator {
  private searchResult: any;
  private PaginationService: any;

  constructor(documentType: string, PaginationService: any) {
    super(documentType);
    this.PaginationService = PaginationService;
    this.PaginationService.registerListener(this.documentType, this);
  }

  public decorate(searchResult: any): void {
    this.searchResult = searchResult;
    this.searchResult.selections = this.selections; // temporary until AddToSet selections can be passed to AddRoS
    this.searchResult.allSelected = false;
    this.searchResult.pageSelections = {};
    this.searchResult.select = this.select.bind(this);
    this.searchResult.selectPage = this.selectPage.bind(this);
    this.searchResult.selectAll = this.selectAll.bind(this);
  }

  public clearSelections() {
    super.clearSelections();
    this.searchResult.pageSelections = {};
  }

  public update() {
    if (this.selections) {
      Object.keys(this.selections)
        .forEach((id) => this.selections[id]
          ? this.selections[id] = true
          : delete this.selections[id]);
    }
  }

  public selectPage(): void {
    this.selectPageInternal(this.searchResult.pageSelections[this.searchResult.pagination.currentPage]);
  }

  public onUpdate(state: any) {
    const currentPagination = this.searchResult.pagination;
    this.searchResult.pagination = state;

    if (currentPagination) {
      if (currentPagination.pageCount !== state.pageCount) {
        // page size has changed, reset selections
        this.clearSelections();
      } else if (currentPagination.currentPage !== state.currentPage) {
        this.selectPageInternal(this.searchResult.allSelected);
      }
    }

  }

  public select(id: string): void {
    const selected = this.selections[id];
    const currentPageSelected = this.searchResult.pageSelections[this.searchResult.pagination.currentPage];

    if (selected) {
      const pageSelected = this.searchResult.summaries
        .reduce((acc, val) => acc && this.selections[val.id], true);

      if (pageSelected) {
        this.searchResult.pageSelections[this.searchResult.pagination.currentPage] = true;
      }
    } else {
      delete this.selections[id];

      if (currentPageSelected) {
        delete this.searchResult.pageSelections[this.searchResult.pagination.currentPage];
      }
    }
  }

  public selectAll(): void {
    this.searchResult.allSelected = !this.searchResult.allSelected;

    if (this.searchResult.allSelected) {
      this.selectPageInternal(this.searchResult.allSelected);
    } else {
      this.clearSelections();
    }
  }

  private selectPageInternal(checked: boolean) {
    if (checked) {
      this.searchResult.pageSelections[this.searchResult.pagination.currentPage] = checked;
    } else {
      delete this.searchResult.pageSelections[this.searchResult.pagination.currentPage];
    }

    this.searchResult.summaries.forEach((summary) => checked
      ? this.selections[summary.id] = checked
      : delete this.selections[summary.id]);
  }
}

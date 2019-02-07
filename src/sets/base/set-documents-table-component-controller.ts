"use strict";

interface IDocumentsSetTableComponentController extends ng.IComponentController {
  documents: any;
  pagination: any;
  setId: string;
  table: any;
  type: string;
  localizedTotal: string;
  showStudies: boolean;
  showVariableType: boolean;
  clearSet(): void;
  download(): void;
  hasSelections(): boolean;
  entitiesCount(): void;
  onPageChange(type: string, from: number): void;
  pageChanged(): void;
  search(): void;
  updateAllSelected(): void;
  updateAllCurrentPageSelected(): void;
  updateSelection(documentId: any): void;
}

class DocumentsSetTableComponentController implements IDocumentsSetTableComponentController {

  public onPageChange: (type: string, from: number) => void;
  public documents: any;
  public pagination: any;
  public setId: string;
  public type: string;
  public table: any;
  public localizedTotal: string;
  public showStudies: boolean;
  public showVariableType: boolean;

  protected allSelected: boolean;
  protected allPageSelected: any;
  protected selections: any;

  constructor(
    protected SetService: ISetService,
    protected $log: any,
  ) {
    this.allSelected = false;
    this.allPageSelected = {};
    this.selections = {};
    this.documents = {
      from: 0,
      limit: 0,
      total: 0,
    };
    this.pagination = {
      currentPage: 1,
      from: 0,
      itemsPerPage: 10,
      maxSize: 10,
      to: 0,
      totalHits: 0,
    };

    this.showStudies = !this.SetService.isSingleStudy();
    this.showVariableType = this.SetService.hasHarmonizedDatasets();
  }

  public hasSelections(): boolean {
    return this.allSelected || this.getSelectedDocumentIds().length > 0;
  }

  public updateAllSelected(): void {
    this.$log.info("ALL=" + this.allSelected);
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.allPageSelected[this.pagination.currentPage] = true;
      this.updateAllCurrentPageSelected();
    } else {
      this.allPageSelected = {};
      this.selections = {};
    }
  }

  public updateAllCurrentPageSelected(): void {
    this.$log.info("ALLPAGE=" + JSON.stringify(this.allPageSelected));
    if (this.allSelected && !this.allPageSelected[this.pagination.currentPage]) {
      this.allSelected = false;
      this.allPageSelected = {};
      this.selections = {};
    } else if (this.documents && this.documents[this.type]) {
      this.documents[this.type].forEach((doc) => {
        this.selections[doc.id] = this.allPageSelected[this.pagination.currentPage];
      });
    }
  }

  public updateSelection(documentId: any): void {
    if (!this.selections[documentId]) {
      this.allPageSelected[this.pagination.currentPage] = false;
      this.allSelected = false;
    }
  }

  public entitiesCount(): void {
    if (this.pagination.totalHits) {
      const sels = this.getSelectedDocumentIds();
      this.SetService.gotoSetEntitiesCount(this.setId, (sels && sels.length > 0 ? sels : undefined));
    }
  }

  public download(): string {
    return this.SetService.getDownloadUrl(this.type, this.setId);
  }

  public search(): void {
    this.SetService.gotoSearch(this.type, this.setId);
  }

  public clearSet(): void {
    if (!this.hasSelections()) {
      return;
    }

    const sels = this.getSelectedDocumentIds();
    if (sels && sels.length > 0) {
      this.SetService.removeDocumentFromSet(this.setId, this.type, sels)
        .then(() => {
          this.allSelected = false;
          this.allPageSelected = {};
          this.selections = {};

          this.onPageChange(this.type, 0);
        });
    } else {
      this.SetService.clearSet(this.setId, this.type)
        .then(() => {
          this.allSelected = false;
          this.allPageSelected = {};
          this.selections = {};

          this.onPageChange(this.type, 0);
        });
    }
  }

  public pageChanged(): void {
    const from = (this.pagination.currentPage - 1) * this.documents.limit;
    this.onPageChange(this.type, from);
  }

  public $onInit(): void {
    this.table = {
      rows: new Array(),
    };
  }

  protected getSelectedDocumentIds(): string[] {
    if (this.allSelected) {
      return [];
    }
    return Object.keys(this.selections).filter((id) => this.selections[id]);
  }
}

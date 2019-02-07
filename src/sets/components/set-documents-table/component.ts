"use strict";

interface IDocumentSetTableComponentController extends ng.IComponentController {
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

class DocumentSetTableComponentController implements IDocumentSetTableComponentController {

  private static $inject = ["PageUrlService", "LocalizedValues", "SetService", "$translate", "$log"];

  public onPageChange: (type: string, from: number) => void;
  public documents: any;
  public pagination: any;
  public setId: string;
  public type: string;
  public table: any;
  public localizedTotal: string;
  public showStudies: boolean;
  public showVariableType: boolean;

  private allSelected: boolean;
  private allPageSelected: any;
  private selections: any;

  constructor(
    private PageUrlService: any,
    private LocalizedValues: any,
    private SetService: ISetService,
    private $translate: any,
    private $log: any,
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

  public $onChanges() {
    this.table = this.asTable();
    this.localizedTotal = this.LocalizedValues
      .formatNumber((this.documents && this.documents.total) ? this.documents.total : 0);
  }

  private getSelectedDocumentIds(): string[] {
    if (this.allSelected) {
      return [];
    }
    return Object.keys(this.selections).filter((id) => this.selections[id]);
  }

  private localize(values): string {
    return this.LocalizedValues.forLang(values, this.$translate.use());
  }

  private asTable(): any {
    const table = {
      rows: new Array(),
    };
    this.pagination.totalHits = this.documents ? this.documents.total : 0;
    this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
    this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
    this.pagination.from = this.documents ? this.documents.from + 1 : 0;
    const documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
    this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
    if (documentCounts) {
      if (this.allSelected) {
        this.allPageSelected[this.pagination.currentPage] = true;
      }
      this.documents[this.type].forEach((doc) => {
        if (this.allSelected) {
          this.selections[doc.id] = true;
        }
        const studyAcronym = this.localize(doc.studySummary.acronym);
        const studyName = this.localize(doc.studySummary.name);
        const studyType = doc.variableType === "Dataschema" ? "harmonization" : "individual";
        const studyLink = this.PageUrlService.studyPage(doc.studyId, studyType);
        const datasetName = this.localize(doc.datasetName);
        const datasetLink = this.PageUrlService.datasetPage(doc.datasetId, doc.variableType);
        const variableLink = this.PageUrlService.variablePage(doc.id);
        const attrLabel = doc.attributes.filter((attr) => attr.name === "label");
        const variableLabel = attrLabel && attrLabel.length > 0 ? this.localize(attrLabel[0].values) : "";
        const row = new Array(
          {
            link: undefined,
            value: doc.id,
          },
          {
            link: variableLink ? variableLink : datasetLink,
            value: doc.name,
          },
          {
            link: undefined,
            value: variableLabel,
          },
          {
            link: undefined,
            value: doc.variableType,
          },
          {
            link: studyLink,
            value: studyAcronym,
          },
          {
            link: datasetLink,
            value: datasetName,
          },
        );
        table.rows.push(row);
      });
    }
    return table;
  }
}

class DocumentSetTableComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
      documents: "<",
      onPageChange: "<",
      setId: "<",
      type: "<",
    };
    this.controller = DocumentSetTableComponentController;
    this.controllerAs = "$ctrl";
    this.templateUrl = "sets/components/set-documents-table/component.html";
  }
}

angular.module("obiba.mica.sets").component("setDocumentsTable", new DocumentSetTableComponent());

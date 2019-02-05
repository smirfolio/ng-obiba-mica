"use strict";

interface IAddToSetController extends ng.IController {

  openPopup(type: string, query?: string, identifiers?: [string]): void;
}

interface IAddToSetDirectiveScope extends ng.IScope {

  addToSet: [string];
  query: string;
  type: string;
}

class AddToSetController implements IAddToSetController {

  private static $inject = [
    "$uibModal",
    "$log",
    "RqlQueryService",
    "RqlQueryUtils",
    "SetsResource",
    "SetsImportResource",
    "SetService",
    "AlertService"];

  constructor(
    private $uibModal: any,
    private $log: any,
    private RqlQueryService: any,
    private RqlQueryUtils: any,
    private SetsResource: any,
    private SetsImportResource: any,
    private SetService: ISetService,
    private AlertService: any) {}

  public openPopup(type: string, query?: string, identifiers?: [string]) {
    const modalInstance = this.$uibModal.open({
      controller: "AddToSetModalInstanceController",
      controllerAs: "$ctrl",
      keyboard: false,
      resolve: {
        sets: () => {
          return this.SetsResource.query({type}).$promise.then((allSets: [any]) => {
            return allSets.filter((set: any) =>  set.name);
          });
        },
      },
      templateUrl: "sets/directives/add-to-set-modal/add-to-set-modal.html",
    });

    modalInstance.result.then((choice: { radio: string, selected?: string, name?: string }) => {
      if (choice.radio === "EXISTING" && choice.selected !== undefined) {
        this.processDocumentSet(choice.selected, type, query, identifiers);
      } else {
        this.SetsImportResource.save({type, name: choice.name}, "").$promise.then((set) => {
          this.processDocumentSet(set.id, type, query, identifiers);
        });
      }
    });
  }

  private addQuery(setId: string, type: string, query: string): any {
    const parsedQuery = this.RqlQueryService.parseQuery(query);
    const target = typeToTarget(type);

    const queryWithLimitAndFields =
      this.RqlQueryUtils.rewriteQueryWithLimitAndFields(parsedQuery, target, 20000, ["id"]);
    return this.SetService.addDocumentQueryToSet(setId, type, queryWithLimitAndFields);
  }

  private processDocumentSet(
    setId: string,
    type: string,
    query?: string,
    identifiers?: [string]): any {
      if (identifiers !== undefined && Array.isArray(identifiers)) {
        return this.SetService.addDocumentToSet(setId, type, identifiers);
      } else {
        return this.addQuery(setId, type, query);
      }
  }
}

class AddToSetDirective implements ng.IDirective {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public link: ng.IDirectiveLinkFn;
  public restrict: string;
  public scope: boolean | { [boundProperty: string]: string; };

  constructor() {
    this.restrict = "A";
    this.controller = AddToSetController;

    this.scope = {
      addToSet: "<",
      query: "<",
      type: "<",
    };

    this.link = (
      scope: IAddToSetDirectiveScope,
      elem: JQLite,
      attributes: ng.IAttributes,
      ctrl: IAddToSetController): void => {

      elem.on("click", () => {
        ctrl.openPopup(scope.type, scope.query, scope.addToSet);
      });
    };
  }
}

angular.module("obiba.mica.sets").directive("addToSet", () => new AddToSetDirective());

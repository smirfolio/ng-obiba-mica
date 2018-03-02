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
declare var RqlParser: any;
declare var RqlQuery: any;

enum Operation {
  All = "all",
  Exists = "exists",
  Empty = "empty",
  In = "in",
  Out = "out",
}

class VariableCriteriaController implements ng.IComponentController {

  private static $inject = [
    "VariableResource", "VariableSummaryResource", "LocalizedValues", "$log", "$location", "$translate", "$filter"];

  public id: string;
  public loading: boolean;
  public query: string;
  public rqlQuery: any;
  public state: any;
  public variable: any;
  public categoriesData: any;
  public searchText: string;
  public selectedCategories: any;
  public selectedOperation: string;
  public selectedMin: number;
  public selectedMax: number;

  constructor(
    private VariableResource: any,
    private VariableSummaryResource: any,
    private LocalizedValues: any,
    private $log: any,
    private $location: any,
    private $translate: any,
    private $filter: any) {
      this.query = "";
      this.state = { open: false };
      this.categoriesData = [];
      this.selectedCategories = {};
  }

  public $onInit() {
    this.loading = true;
    this.rqlQuery = this.parseQuery();
    if (this.rqlQuery.args) {
      const isNot = this.rqlQuery.name === "not";
      const rqlQueryWithArgs = isNot ? this.rqlQuery.args[0] : this.rqlQuery;
      // get variable from field name
      this.id = rqlQueryWithArgs.args[0].join(":");
      this.VariableResource.get({ id: this.id }, this.onVariable(), this.onError());
      // get categories if any
      if (rqlQueryWithArgs.args.length > 1) {
        rqlQueryWithArgs.args[1].forEach((value) => {
          this.selectedCategories[value] = true;
        });
      }
      this.selectedOperation = this.rqlQuery.name; // TODO handle not
      if (isNot && rqlQueryWithArgs.name === "in") {
        this.selectedOperation = "out";
      }
      if (isNot && rqlQueryWithArgs.name === "exists") {
        this.selectedOperation = "empty";
      }
    }
  }

  public onKeyup(event) {
    if (event.keyCode === 13) {
      this.closeDropdown();
    }
  }

  public closeDropdown() {
    this.state.open = false;
    // get the query from the selections
    let newQuery = "";
    const args = Object.keys(this.selectedCategories).filter((key) => {
      return this.selectedCategories[key];
    }).map((key) => key);
    switch (this.selectedOperation) {
      case Operation.All:
      case Operation.Exists:
        newQuery = this.selectedOperation + "({field})";
        break;
      case Operation.Empty:
        newQuery = "not(exists({field}))";
        break;
      case Operation.In:
      if (args && args.length > 0) {
        newQuery = this.getNature() === "CATEGORICAL" ? "in({field},({args}))" : "range({field},({args}))";
      } else {
        newQuery = "not(exists({field}))";
        this.selectedOperation = "empty";
      }
      break;
      case Operation.Out:
      if (args && args.length > 0) {
        newQuery = this.getNature() === "CATEGORICAL" ? "not(in({field},({args})))" : "not(range({field},({args})))";
      } else {
        newQuery = "exists({field})";
        this.selectedOperation = "exists";
      }
    }
    newQuery = newQuery.replace("{field}", this.variable.id);
    newQuery = newQuery.replace("{args}", args.join(","));
    this.onUpdate(newQuery);
  }

  public openDropdown() {
    if (this.state.open) {
      this.closeDropdown();
      return;
    }
    this.state.open = true;
  }

  public showOptions(): boolean {
    return Operation.All !== this.selectedOperation
      && Operation.Exists !== this.selectedOperation
      && Operation.Empty !== this.selectedOperation;
  }

  public onRemove(): void {
    this.onUpdate("");
  }

  public onUpdate(newQuery: string): void {
    if (this.query === newQuery) {
      return;
    }
    const search = this.$location.search();
    search.query = search.query.split(this.query).join("").replace(/,,/, ",").replace(/^,/, "").replace(/,$/, "");
    if (newQuery && newQuery.length !== 0) {
        search.query = search.query + "," + newQuery;
    }
    this.$location.search(search);
  }

  public getNature(): string {
    return this.variable ? this.variable.nature : "?";
  }

  public getQueryTitle(truncated: boolean): string {
    if (!this.rqlQuery) {
      return "?";
    }

    let title = this.getOperationTitle();
    const rqlQueryWithArgs = this.getRqlQueryWithArgs();

    if (rqlQueryWithArgs.args.length > 1) {
      let items = rqlQueryWithArgs.args[1];
      if (this.getNature() === "CATEGORICAL") {
        items = items.map((x) => this.localizeCategory(x));
      }
      if (rqlQueryWithArgs.name === "range") {
        title = title + " [" + items.join(", ") + "]";
      } else {
        title = title + " (" + items.join(", ") + ")";
      }
    }
    return truncated && title.length > 50 ? title.substring(0, 50) + "..." : title;
  }

  private getOperationTitle(): string {
    const rqlQueryWithArgs = this.getRqlQueryWithArgs();
    if (this.isNotQuery()) {
      if (rqlQueryWithArgs.name === "exists") {
        return this.$filter("translate")("analysis.empty");
      } else {
        return this.$filter("translate")("analysis.out");
      }
    }
    return this.$filter("translate")("analysis." + rqlQueryWithArgs.name);
  }

  private getRqlQueryWithArgs(): any {
    if (this.isNotQuery()) {
      return this.rqlQuery.args[0];
    }
    return this.rqlQuery;
  }

  private isNotQuery(): boolean {
    return this.rqlQuery && this.rqlQuery.name === "not";
  }

  private parseQuery() {
    try {
      return new RqlParser().parse(this.normalize(this.query)).args[0];
    } catch (e) {
      this.$log.error(e.message);
    }
    return new RqlQuery();
  }

  private normalize(str: string): string {
    return str.split(":").join("/");
  }

  private localizeCategory(value: string): string {
    if (!this.variable || !this.variable.categories) {
      return value;
    }
    const categories = this.variable.categories.filter((cat) => cat.name === value + "");
    if (categories.length === 0) {
      return value;
    }
    const category = categories[0];
    if (!category.attributes) {
      return value;
    }
    const labels = category.attributes.filter((attr) => attr.name === "label");
    if (labels.length === 0) {
      return value;
    }
    const label = this.localize(labels[0].values);
    return label || value;
  }

  private localize(values): string {
    return this.LocalizedValues.forLang(values, this.$translate.use());
  }

  private prepareCategories(): void {
    this.categoriesData = [];
    if (this.getNature() === "CATEGORICAL") {
      this.variable.categories.forEach((cat) => {
        this.categoriesData.push({
          label: this.localizeCategory(cat.name),
          name: cat.name,
        });
      });
    }
  }

  private onVariable() {
    const that = this;
    return (response: any) => {
      that.variable = response;
      that.loading = false;
      that.prepareCategories();
    };
  }

  private onError() {
    const that = this;
    return (response: any) => {
      that.variable = undefined;
      that.loading = false;
    };
  }
}

class VariableCriteriaComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
      query: "<",
    };
    this.controller = VariableCriteriaController;
    this.controllerAs = "$ctrl";
    this.templateUrl = "analysis/components/variable-criteria/component.html";
  }
}

ngObibaMica.analysis
  .component("variableCriteria", new VariableCriteriaComponent());

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
  public summary: any;
  public variable: any;
  public categoriesData: any;
  public rangeMin: number;
  public rangeMax: number;
  public allFrequency: number;
  public existsFrequency: number;
  public emptyFrequency: number;
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
        if (rqlQueryWithArgs.name === "in") {
          rqlQueryWithArgs.args[1].forEach((value) => {
            this.selectedCategories[value] = true;
          });
        } else if (rqlQueryWithArgs.name === "range" && rqlQueryWithArgs.args[1].length > 0) {
          this.selectedMin = rqlQueryWithArgs.args[1][0] === "*" ? undefined : rqlQueryWithArgs.args[1][0];
          this.selectedMax = rqlQueryWithArgs.args[1].length < 2 || rqlQueryWithArgs.args[1][1] === "*" ?
            undefined : rqlQueryWithArgs.args[1][1];
        }
      }
      this.selectedOperation = this.rqlQuery.name === "range" ? "in" : this.rqlQuery.name;
      if (isNot && (rqlQueryWithArgs.name === "in" || rqlQueryWithArgs.name === "range")) {
        this.selectedOperation = "out";
      }
      if (isNot && rqlQueryWithArgs.name === "exists") {
        this.selectedOperation = "empty";
      }
    }
  }

  public onKeyup(event): void {
    if (event.keyCode === 13) {
      this.closeDropdown(false);
    } else if (event.keyCode === 27) {
      this.closeDropdown(true);
    }
  }

  public onSearchTextKeyup(event): void {
    const filter = this.searchText.trim();
    if (this.categoriesData)  {
      const regex = new RegExp(filter, "i");
      this.categoriesData.forEach((cat) => {
        cat.visible = cat.label.match(regex) !== null;
      });
    }
  }

  public closeDropdown(cancel: boolean) {
    this.state.open = false;
    if (cancel) {
      return;
    }
    // get the query from the selections
    let newQuery = "";
    let args;
    if (this.showCategoricalOptions()) {
      args = Object.keys(this.selectedCategories).filter((key) => {
        return this.selectedCategories[key];
      }).map((key) => key).join(",");
    }
    if (this.showNumericalOptions()) {
      const min = this.selectedMin ? this.selectedMin : "*";
      const max = this.selectedMax ? this.selectedMax : "*";
      args = [min, max].join(",");
    }
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
    newQuery = newQuery.replace("{args}", args);
    this.onUpdate(newQuery);
  }

  public openDropdown() {
    if (this.state.open) {
      this.closeDropdown(false);
      return;
    }
    this.state.open = true;
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

  public showCategoricalOptions(): boolean {
    return this.getNature() === "CATEGORICAL" && this.showOptions();
  }

  public showNumericalOptions(): boolean {
    return this.getNature() === "CONTINUOUS" && this.isNumerical() && this.showOptions();
  }

  private showOptions(): boolean {
    return Operation.All !== this.selectedOperation
      && Operation.Exists !== this.selectedOperation
      && Operation.Empty !== this.selectedOperation;
  }

  private getNature(): string {
    return this.variable ? this.variable.nature : "?";
  }

  private isNumerical(): boolean {
    return this.variable.valueType === "integer" || this.variable.valueType === "decimal";
  }

  private isLogical(): boolean {
    return this.variable.valueType === "boolean";
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
    return this.$filter("translate")("analysis." + (rqlQueryWithArgs.name === "range" ? "in" : rqlQueryWithArgs.name));
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
    if (!this.variable.categories) {
      return this.isLogical() ? this.$filter("translate")("global." + value) : value;
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
      const categories = this.variable.categories;
      if (categories) {
        categories.forEach((cat) => {
          this.categoriesData.push({
            label: this.localizeCategory(cat.name),
            name: cat.name,
            visible: true,
          });
        });
      } else if (this.isLogical()) {
        this.categoriesData.push({
          label: this.$filter("translate")("global.true"),
          name: "true",
          visible: true,
        });
        this.categoriesData.push({
          label: this.$filter("translate")("global.false"),
          name: "false",
          visible: true,
        });
      }
    }
  }

  private onVariable() {
    const that = this;
    return (response: any) => {
      that.variable = response;
      that.loading = false;
      that.prepareCategories();
      that.VariableSummaryResource.get({ id: response.id }, that.onVariableSummary(), that.onError());
    };
  }

  private onVariableSummary() {
    const that = this;
    return (response: any) => {
      that.summary = response;
      if (that.summary["Math.ContinuousSummaryDto.continuous"]) {
        const summary = that.summary["Math.ContinuousSummaryDto.continuous"].summary;
        that.rangeMin = summary.min;
        that.rangeMax = summary.max;
        const frequencies = that.summary["Math.ContinuousSummaryDto.continuous"].frequencies;
        that.existsFrequency = frequencies.filter((elem) => elem.value === "NOT_NULL")[0].freq;
        that.emptyFrequency = frequencies.filter((elem) => elem.value === "N/A")[0].freq;
        that.allFrequency = that.existsFrequency + that.emptyFrequency;
      }
      if (that.summary["Math.CategoricalSummaryDto.categorical"]) {
        const frequencies = that.summary["Math.CategoricalSummaryDto.categorical"].frequencies;
        that.categoriesData.forEach((cat) => {
          const freqs = frequencies.filter((elem) => elem.value === cat.name);
          if (freqs.length > 0) {
            cat.frequency = freqs[0].freq;
          }
        });
        that.allFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].n;
        that.existsFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].otherFrequency +
          frequencies.filter((elem) => elem.value !== "N/A").map((elem) => elem.freq).reduce((acc, curr) => acc + curr);
        that.emptyFrequency = that.allFrequency - that.existsFrequency;
      }
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

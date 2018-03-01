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

declare var RqlParser: any;
declare var RqlQuery: any;

class VariableCriteriaController implements ng.IComponentController {

  private static $inject = ["VariableResource", "VariableSummaryResource", "$log", "SearchContext", "LocalizedValues"];

  public id: string;
  public lang: string;
  public loading: boolean;
  public query: string;
  public rqlQuery: any;
  public variable: any;

  constructor(
    private VariableResource: any,
    private VariableSummaryResource: any,
    private $log: any,
    private SearchContext: any,
    private LocalizedValues: any) {
      this.query = "";
      this.lang = "en";
  }

  public $onInit() {
    this.lang = this.SearchContext.currentLocale();
    this.loading = true;
    this.rqlQuery = this.parseQuery();
    if (this.rqlQuery.args) {
      this.id = this.rqlQuery.args[0].join(":");
      this.VariableResource.get({ id: this.id }, this.onVariable(), this.onError());
    }
  }

  public onRemove(): void {
    // TODO
  }

  public getNature(): string {
    return this.variable ? this.variable.nature : "?";
  }

  public getOperation(): string {
    return this.rqlQuery ? this.rqlQuery.name : "?";
  }

  public getQueryTitle(truncated: boolean): string {
    let title = this.getOperation();
    if (this.rqlQuery && this.rqlQuery.args && this.rqlQuery.args.length > 1) {
      let items = this.rqlQuery.args[1];
      if (this.getNature() === "CATEGORICAL") {
        items = items.map((x) => this.localizeCategory(x));
      }
      if (title === "range") {
        title = "in [" + items.join(",") + "]";
      } else {
        title = title + " (" + items.join(",") + ")";
      }
    }
    return truncated ? title.substring(0, 30) : title;
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
    return this.LocalizedValues.forLang(values, this.lang);
  }

  private onVariable() {
    const that = this;
    return (response: any) => {
      that.variable = response;
      that.loading = false;
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

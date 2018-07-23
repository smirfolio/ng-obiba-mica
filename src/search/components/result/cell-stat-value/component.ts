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

class CellStatValueController implements ng.IComponentController {
    private static $inject = ["$log", "$location", "$httpParamSerializer"];
    public destinationTab: any;
    public disable: boolean;
    public entityCount: any;
    public href: string;
    public resultTabOrder: any;
    public updateCriteria: () => any;

    constructor(private $log: any, private $location: any, private $httpParamSerializer: any) {
    }

    public urlCriteria() {
        const that = this;
        that.href = "";
        if (typeof that.updateCriteria() !== "undefined") {
            that.updateCriteria().then((urlHref) => {
                urlHref.display = "list";
                that.href = window.location.origin + //
                    window.location.pathname + //
                    "/#/search?" + //
                    that.$httpParamSerializer(urlHref);
            });
        }
    }

    public $onInit() {
        if (this.resultTabOrder.indexOf(this.destinationTab) < 0) {
            this.disable = true;
        }
        this.urlCriteria();
    }
}

class CellStatValueComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public templateUrl: string;
    public transclude: boolean;
    public bindings: any;

    constructor() {
        this.transclude = true;
        this.bindings = {
            destinationTab: "@",
            entityCount: "<",
            resultTabOrder: "<",
            updateCriteria: "&",
        };
        this.controller = CellStatValueController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "search/components/result/cell-stat-value/component.html";
    }
}

ngObibaMica.search
    .component("cellStatValue", new CellStatValueComponent());

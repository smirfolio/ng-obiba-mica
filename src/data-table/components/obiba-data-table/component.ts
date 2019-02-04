/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class TableController implements ng.IComponentController {
    private static $inject = [
        "LocalizedValues",
        "$log", "$translate", "$filter", "DataTableResource"];
    public loading: boolean;
    public datatableconfig: any;
    public table: any;
    public dataQuery: any;

    constructor(
        private LocalizedValues: any,
        private $log: any,
        private $translate: any,
        private $filter: any,
        private DataTableResource: any,
        ) {
        this.table = {
            rows: new Array(),
        };
        this.dataQuery = new Array();
    }

    public $onInit() {
        this.getTable();
    }

    public $onChanges() {
        this.getTable();
    }

    private getTable(): any {
        this.loading = true;
        const table = this.DataTableResource.get({
            id: this.datatableconfig.parentEntityId, from: 0, limit: 3, sort: null, order: null,
        });
        if (table) {
            console.log(table);
            this.table =  table;
            this.dataQuery = {
                from: 0,
                limit: 3,
                total: 7,
            };
            this.loading = false;
        } else {
            this.loading = false;
        }
    }

}

class TableComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public templateUrl: string;
    public transclude: boolean;
    public bindings: any;

    constructor() {
        this.transclude = true;
        this.bindings = {
            datatableconfig: "<",
        };
        this.controller = TableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "data-table/components/obiba-data-table/component.html";
    }
}

ngObibaMica.dataTable.component("obibaDataTable", new TableComponent());

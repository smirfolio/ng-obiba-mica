class TableController implements ng.IComponentController {
    private static $inject = [
        "LocalizedValues",
        "$log", "$translate", "$filter", "DataTableResource"];
    public loading: boolean;
    public studyId: any;
    public table: any;

    constructor(
        private LocalizedValues: any,
        private $log: any,
        private $translate: any,
        private $filter: any,
        private DataTableResource: any,
        ) {
    }

    public $onInit() {
        this.loading = true;
        const table = this.DataTableResource.get({sId: this.studyId});
        console.log(table);
        if (table) {
            this.table =  table;
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
            studyId: "@",
        };
        this.controller = TableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "data-table/components/obiba-data-table/component.html";
    }
}

ngObibaMica.dataTable.component("obibaDataTable", new TableComponent());

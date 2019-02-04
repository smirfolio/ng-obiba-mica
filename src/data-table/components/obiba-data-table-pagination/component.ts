/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class PaginationController implements ng.IComponentController {
    public documents: any;
    public pagination: any;
    public type: string;

    public onPageChange: (type: string, from: number) => void;

    public constructor() {
        this.documents = {
            from: 0,
            limit: 0,
            total: 0,
        };
        this.pagination = {
            currentPage: 1,
            from: 0,
            itemsPerPage: 2,
            maxSize: 2,
            to: 2,
            totalHits: 0,
        };
    }

    public pageChanged(): void {
        const from = (this.pagination.currentPage - 1) * this.documents.limit;
        this.onPageChange(this.type, from);
    }
    public $onInit() {
        console.log(this.documents);
        this.pagination.totalHits = this.documents ? this.documents.total : 0;
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
        this.pagination.from = this.documents ? this.documents.from + 1 : 0;
        const documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
        this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
    }

}

class PaginationComponent implements ng.IComponentOptions {
    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public templateUrl: string;
    public transclude: boolean;
    public bindings: any;

    constructor() {
        this.transclude = true;
        this.bindings = {
            documents: "=",
        };
        this.controller = PaginationController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "data-table/components/obiba-data-table-pagination/component.html";
    }
}
ngObibaMica.dataTable.component("obibaDataTablePagination", new PaginationComponent());

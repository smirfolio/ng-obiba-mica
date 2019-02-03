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

interface IDatatable extends ng.resource.IResource<IDatatable> {
}
interface IDataTableResource extends ng.resource.IResourceClass<IDatatable> {
}

ngObibaMica.dataTable
.factory("DataTableResource", ["$resource", "ngObibaMicaUrl",
    ($resource: ng.resource.IResourceService, ngObibaMicaUrl): IDataTableResource => {
    const url = ngObibaMicaUrl.getUrl("dataTableStudyDatasets");
    const getAction: ng.resource.IActionDescriptor = {
        method: "get",
    };

    return  $resource(url, {}, {
        get: getAction,
    }) as IDataTableResource;
}]);

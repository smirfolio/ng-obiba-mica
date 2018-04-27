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

interface IDataAccessEntityResourceFactory {
  list(listUrl: string): any;

  create(listUrl: string, data: any): any;

  get(entityRootPath: string, id: string): any;

  update(entityRootPath: string, data: any): any;

  delete(entityRootPath: string, id: string): any;
}

class DataAccessEntityResource implements IDataAccessEntityResourceFactory {

  private static $inject = [
    "DataAccessRequestsResource",
    "DataAccessRequestResource",
    "DataAccessAmendmentsResource",
    "DataAccessAmendmentResource",
  ];

  constructor(private DataAccessRequestsResource: any,
              private DataAccessRequestResource: any,
              private DataAccessAmendmentsResource: any,
              private DataAccessAmendmentResource: any) {
  }

  public list(listUrl: string): any {
    const parentId: string = this.getParentId(listUrl);
    return parentId ?
      this.DataAccessAmendmentsResource.query({parentId}) :
      this.DataAccessRequestsResource.query();
  }

  public create(listUrl: string, data: any): any {
    const parentId: string = this.getParentId(listUrl);
    return parentId ?
      this.DataAccessAmendmentsResource.save(data) :
      this.DataAccessRequestsResource.save(data);
  }

  public update(entityRootPath: string, data: any): any {
    const parentId: string = this.getParentId(entityRootPath);
    return parentId ?
      this.DataAccessAmendmentResource.save(data) :
      this.DataAccessRequestResource.save(data);
  }

  public get(entityRootPath: string, id: string): any {
    const parentId: string = this.getParentId(entityRootPath);
    return parentId ?
      this.DataAccessAmendmentResource.get({parentId, id}) :
      this.DataAccessRequestResource.get({id});
  }

  public delete(entityRootPath: string, id: string): any {
    const parentId: string = this.getParentId(entityRootPath);
    return parentId ?
      this.DataAccessAmendmentResource.delete({parentId, id}) :
      this.DataAccessRequestResource.delete({id});
  }

  private getParentId(url: string) {
    const parentId = /data-access-request\/(.*)\/amendment/.exec(url);
    return parentId && parentId.length === 2 ? parentId[parentId.index] : null;
  }
}

ngObibaMica.access.service("DataAccessEntityResource", DataAccessEntityResource);

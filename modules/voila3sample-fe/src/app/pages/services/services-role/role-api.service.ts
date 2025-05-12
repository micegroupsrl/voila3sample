import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class RoleApiService extends BaseApiService<IRole> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/role';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getRoleByCriteria(options?: HttpParams): Observable<BaseApiResponse<IRole>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getRoleByRoleRoleGroup(key: string, options?: HttpParams): Observable<BaseApiResponse<IRole>> {
        return this.getRoleByCriteria(this.addFilter(options!, 'theRoleRoleGroup', key));
    }

    public addRole(role: IRole): Observable<IRole> {
        return this.addEntityInstance(role, this.url);
    }

    public getRoleById(id: string): Observable<IRole> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateRole(role: IRole): Observable<IRole> {
        return this.updateEntityInstance(role, this.url);
    }

    public deleteRole(id: string): Observable<IRole> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

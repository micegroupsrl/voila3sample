import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class RolePerUserApiService extends BaseApiService<IRolePerUser> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/role-per-user';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getRolePerUserByCriteria(options?: HttpParams): Observable<BaseApiResponse<IRolePerUser>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getRolePerUserByRole(key: string, options?: HttpParams): Observable<BaseApiResponse<IRolePerUser>> {
        return this.getRolePerUserByCriteria(this.addFilter(options!, 'theRole', key));
    }
    public getRolePerUserByUser(key: string, options?: HttpParams): Observable<BaseApiResponse<IRolePerUser>> {
        return this.getRolePerUserByCriteria(this.addFilter(options!, 'theUser', key));
    }

    public addRolePerUser(rolePerUser: IRolePerUser): Observable<IRolePerUser> {
        return this.addEntityInstance(rolePerUser, this.url);
    }

    public getRolePerUserById(id: string): Observable<IRolePerUser> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateRolePerUser(rolePerUser: IRolePerUser): Observable<IRolePerUser> {
        return this.updateEntityInstance(rolePerUser, this.url);
    }

    public deleteRolePerUser(id: string): Observable<IRolePerUser> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

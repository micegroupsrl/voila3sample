import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class PrivilegePerRoleApiService extends BaseApiService<IPrivilegePerRole> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/privilege-per-role';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getPrivilegePerRoleByCriteria(options?: HttpParams): Observable<BaseApiResponse<IPrivilegePerRole>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getPrivilegePerRoleByRole(key: string, options?: HttpParams): Observable<BaseApiResponse<IPrivilegePerRole>> {
        return this.getPrivilegePerRoleByCriteria(this.addFilter(options!, 'theRole', key));
    }
    public getPrivilegePerRoleByPrivilege(key: string, options?: HttpParams): Observable<BaseApiResponse<IPrivilegePerRole>> {
        return this.getPrivilegePerRoleByCriteria(this.addFilter(options!, 'thePrivilege', key));
    }

    public addPrivilegePerRole(privilegePerRole: IPrivilegePerRole): Observable<IPrivilegePerRole> {
        return this.addEntityInstance(privilegePerRole, this.url);
    }

    public getPrivilegePerRoleById(id: string): Observable<IPrivilegePerRole> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updatePrivilegePerRole(privilegePerRole: IPrivilegePerRole): Observable<IPrivilegePerRole> {
        return this.updateEntityInstance(privilegePerRole, this.url);
    }

    public deletePrivilegePerRole(id: string): Observable<IPrivilegePerRole> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

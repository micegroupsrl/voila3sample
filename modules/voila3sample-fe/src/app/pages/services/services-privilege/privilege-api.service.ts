import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class PrivilegeApiService extends BaseApiService<IPrivilege> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/privilege';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getPrivilegeByCriteria(options?: HttpParams): Observable<BaseApiResponse<IPrivilege>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addPrivilege(privilege: IPrivilege): Observable<IPrivilege> {
        return this.addEntityInstance(privilege, this.url);
    }

    public getPrivilegeById(id: string): Observable<IPrivilege> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updatePrivilege(privilege: IPrivilege): Observable<IPrivilege> {
        return this.updateEntityInstance(privilege, this.url);
    }

    public deletePrivilege(id: string): Observable<IPrivilege> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

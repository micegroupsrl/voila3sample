import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class UserApiService extends BaseApiService<IUser> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/user';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getUserByCriteria(options?: HttpParams): Observable<BaseApiResponse<IUser>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addUser(user: IUser): Observable<IUser> {
        return this.addEntityInstance(user, this.url);
    }

    public getUserById(id: string): Observable<IUser> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateUser(user: IUser): Observable<IUser> {
        return this.updateEntityInstance(user, this.url);
    }

    public deleteUser(id: string): Observable<IUser> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

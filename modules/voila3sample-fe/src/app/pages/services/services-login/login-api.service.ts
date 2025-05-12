import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { Voila3sampleEnvironment } from 'src/app/pages/environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
import { ILogin } from 'src/app/interfaces/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginApiService extends BaseApiService<any> {
    private url: string = Voila3sampleEnvironment.contextRoot;
    public user: any = {
        username: '',
        email: ''
    };
    public logged = false;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public doLogin(login: ILogin): Observable<ILogin> {
        return this.addLoginInstance(login, this.url + '/api/auth/signin');
    }

    protected addLoginInstance(entity: ILogin, url: string): Observable<ILogin> {
        return this.httpClient.post<ILogin>(this.baseUrl + '/' + url, entity, {
            withCredentials: environment.securityOn
        });
    }

    public doLogout(): Observable<String> {
        return this.addLogoutInstance(this.url + '/api/auth/signout');
    }

    protected addLogoutInstance(url: string): Observable<any> {
        return this.httpClient.post(this.baseUrl + '/' + url, null, {
            withCredentials: environment.securityOn,
            responseType: 'text'
        });
    }

    public getUtenteByCriteria(options?: HttpParams): Observable<BaseApiResponse<ILogin>> {
        return this.getEntityListByCriteria(this.url + '/user', options);
    }

    public getUtenteByUsername(username: string): Observable<ILogin> {
        return this.getEntityInstanceById(username, this.url + '/user');
    }

    public updateUtente(utente: ILogin): Observable<ILogin> {
        return this.updateEntityInstance(utente, this.url + '/user');
    }

    public deleteUtente(username: string): Observable<ILogin> {
        return this.deleteEntityInstance(username, this.url + '/user');
    }
}

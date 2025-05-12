import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IPersona } from 'src/app/pages/interfaces/persona.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class PersonaApiService extends BaseApiService<IPersona> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/persona';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getPersonaByCriteria(options?: HttpParams): Observable<BaseApiResponse<IPersona>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addPersona(persona: IPersona): Observable<IPersona> {
        return this.addEntityInstance(persona, this.url);
    }

    public getPersonaById(id: string): Observable<IPersona> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updatePersona(persona: IPersona): Observable<IPersona> {
        return this.updateEntityInstance(persona, this.url);
    }

    public deletePersona(id: string): Observable<IPersona> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

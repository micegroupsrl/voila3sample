import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class StatoOrdineApiService extends BaseApiService<IStatoOrdine> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/stato-ordine';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getStatoOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<IStatoOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addStatoOrdine(statoOrdine: IStatoOrdine): Observable<IStatoOrdine> {
        return this.addEntityInstance(statoOrdine, this.url);
    }

    public getStatoOrdineById(id: string): Observable<IStatoOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateStatoOrdine(statoOrdine: IStatoOrdine): Observable<IStatoOrdine> {
        return this.updateEntityInstance(statoOrdine, this.url);
    }

    public deleteStatoOrdine(id: string): Observable<IStatoOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

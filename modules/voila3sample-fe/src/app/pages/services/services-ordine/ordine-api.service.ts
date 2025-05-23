import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class OrdineApiService extends BaseApiService<IOrdine> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/ordine';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getOrdineByStatoOrdine(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getOrdineByCriteria(this.addFilter(options!, 'theStatoOrdine', key));
    }
    public getOrdineByTipoOrdine(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getOrdineByCriteria(this.addFilter(options!, 'theTipoOrdine', key));
    }
    public getOrdineByCliente(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getOrdineByCriteria(this.addFilter(options!, 'theCliente', key));
    }
    public getOrdineByOrdineAggregato(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getOrdineByCriteria(this.addFilter(options!, 'theOrdineAggregato', key));
    }

    public addOrdine(ordine: IOrdine): Observable<IOrdine> {
        return this.addEntityInstance(ordine, this.url);
    }

    public getOrdineById(id: string): Observable<IOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateOrdine(ordine: IOrdine): Observable<IOrdine> {
        return this.updateEntityInstance(ordine, this.url);
    }

    public deleteOrdine(id: string): Observable<IOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

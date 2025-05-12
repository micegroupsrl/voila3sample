import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class RigaOrdineApiService extends BaseApiService<IRigaOrdine> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/riga-ordine';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getRigaOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<IRigaOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getRigaOrdineByProdotto(key: string, options?: HttpParams): Observable<BaseApiResponse<IRigaOrdine>> {
        return this.getRigaOrdineByCriteria(this.addFilter(options!, 'theProdotto', key));
    }
    public getRigaOrdineByOrdine(key: string, options?: HttpParams): Observable<BaseApiResponse<IRigaOrdine>> {
        return this.getRigaOrdineByCriteria(this.addFilter(options!, 'theOrdine', key));
    }

    public addRigaOrdine(rigaOrdine: IRigaOrdine): Observable<IRigaOrdine> {
        return this.addEntityInstance(rigaOrdine, this.url);
    }

    public getRigaOrdineById(id: string): Observable<IRigaOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateRigaOrdine(rigaOrdine: IRigaOrdine): Observable<IRigaOrdine> {
        return this.updateEntityInstance(rigaOrdine, this.url);
    }

    public deleteRigaOrdine(id: string): Observable<IRigaOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

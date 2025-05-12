import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class ProdottoApiService extends BaseApiService<IProdotto> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/prodotto';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getProdottoByCriteria(options?: HttpParams): Observable<BaseApiResponse<IProdotto>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addProdotto(prodotto: IProdotto): Observable<IProdotto> {
        return this.addEntityInstance(prodotto, this.url);
    }

    public getProdottoById(id: string): Observable<IProdotto> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateProdotto(prodotto: IProdotto): Observable<IProdotto> {
        return this.updateEntityInstance(prodotto, this.url);
    }

    public deleteProdotto(id: string): Observable<IProdotto> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

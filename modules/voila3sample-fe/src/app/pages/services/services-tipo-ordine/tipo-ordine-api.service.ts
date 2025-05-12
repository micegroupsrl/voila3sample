import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class TipoOrdineApiService extends BaseApiService<ITipoOrdine> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/tipo-ordine';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getTipoOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<ITipoOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getTipoOrdineByCategoriaOrdine(key: string, options?: HttpParams): Observable<BaseApiResponse<ITipoOrdine>> {
        return this.getTipoOrdineByCriteria(this.addFilter(options!, 'theCategoriaOrdine', key));
    }

    public addTipoOrdine(tipoOrdine: ITipoOrdine): Observable<ITipoOrdine> {
        return this.addEntityInstance(tipoOrdine, this.url);
    }

    public getTipoOrdineById(id: string): Observable<ITipoOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateTipoOrdine(tipoOrdine: ITipoOrdine): Observable<ITipoOrdine> {
        return this.updateEntityInstance(tipoOrdine, this.url);
    }

    public deleteTipoOrdine(id: string): Observable<ITipoOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

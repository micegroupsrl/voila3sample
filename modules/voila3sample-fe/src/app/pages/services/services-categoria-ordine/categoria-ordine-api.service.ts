import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class CategoriaOrdineApiService extends BaseApiService<ICategoriaOrdine> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/categoria-ordine';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getCategoriaOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<ICategoriaOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addCategoriaOrdine(categoriaOrdine: ICategoriaOrdine): Observable<ICategoriaOrdine> {
        return this.addEntityInstance(categoriaOrdine, this.url);
    }

    public getCategoriaOrdineById(id: string): Observable<ICategoriaOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateCategoriaOrdine(categoriaOrdine: ICategoriaOrdine): Observable<ICategoriaOrdine> {
        return this.updateEntityInstance(categoriaOrdine, this.url);
    }

    public deleteCategoriaOrdine(id: string): Observable<ICategoriaOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

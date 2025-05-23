import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class FornitoreApiService extends BaseApiService<IFornitore> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/fornitore';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getFornitoreByCriteria(options?: HttpParams): Observable<BaseApiResponse<IFornitore>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addFornitore(fornitore: IFornitore): Observable<IFornitore> {
        return this.addEntityInstance(fornitore, this.url);
    }

    public getFornitoreById(id: string): Observable<IFornitore> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateFornitore(fornitore: IFornitore): Observable<IFornitore> {
        return this.updateEntityInstance(fornitore, this.url);
    }

    public deleteFornitore(id: string): Observable<IFornitore> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

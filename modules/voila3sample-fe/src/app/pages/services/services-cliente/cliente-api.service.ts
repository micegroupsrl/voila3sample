import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { Voila3sampleEnvironment } from '../../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
@Injectable({
    providedIn: 'root'
})
export class ClienteApiService extends BaseApiService<ICliente> {
    private url: string = Voila3sampleEnvironment.contextRoot + '/cliente';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public getClienteByCriteria(options?: HttpParams): Observable<BaseApiResponse<ICliente>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addCliente(cliente: ICliente): Observable<ICliente> {
        return this.addEntityInstance(cliente, this.url);
    }

    public getClienteById(id: string): Observable<ICliente> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateCliente(cliente: ICliente): Observable<ICliente> {
        return this.updateEntityInstance(cliente, this.url);
    }

    public deleteCliente(id: string): Observable<ICliente> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}

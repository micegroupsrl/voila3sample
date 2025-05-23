import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BaseApiResponse } from 'src/app/shared/base/base.response';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { IPersona } from 'src/app/pages/interfaces/persona.interface';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { environment } from 'src/environments/environment';
import { Voila3sampleEnvironment } from '../environment';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    constructor(private http: HttpClient) {}
    getUser(options?: HttpParams): Observable<BaseApiResponse<IUser>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/user/search', { params: options });
    }
    getRole(options?: HttpParams): Observable<BaseApiResponse<IRole>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/role/search', { params: options });
    }
    getPrivilege(options?: HttpParams): Observable<BaseApiResponse<IPrivilege>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/privilege/search', { params: options });
    }
    getRolePerUser(options?: HttpParams): Observable<BaseApiResponse<IRolePerUser>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/role-per-user/search', { params: options });
    }
    getPrivilegePerRole(options?: HttpParams): Observable<BaseApiResponse<IPrivilegePerRole>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/privilege-per-role/search', { params: options });
    }
    getCategoriaOrdine(options?: HttpParams): Observable<BaseApiResponse<ICategoriaOrdine>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/categoria-ordine/search', { params: options });
    }
    getStatoOrdine(options?: HttpParams): Observable<BaseApiResponse<IStatoOrdine>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/stato-ordine/search', { params: options });
    }
    getOrdine(options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/ordine/search', { params: options });
    }
    getCliente(options?: HttpParams): Observable<BaseApiResponse<ICliente>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/cliente/search', { params: options });
    }
    getPersona(options?: HttpParams): Observable<BaseApiResponse<IPersona>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/persona/search', { params: options });
    }
    getRigaOrdine(options?: HttpParams): Observable<BaseApiResponse<IRigaOrdine>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/riga-ordine/search', { params: options });
    }
    getProdotto(options?: HttpParams): Observable<BaseApiResponse<IProdotto>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/prodotto/search', { params: options });
    }
    getTipoOrdine(options?: HttpParams): Observable<BaseApiResponse<ITipoOrdine>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/tipo-ordine/search', { params: options });
    }
    getFornitore(options?: HttpParams): Observable<BaseApiResponse<IFornitore>> {
        return this.http.get<any>(environment.baseUrl + '/' + Voila3sampleEnvironment.contextRoot + '/fornitore/search', { params: options });
    }
}

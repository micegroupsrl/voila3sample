import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../response.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseApiService<T> {
    public baseUrl: string = environment.baseUrl;

    constructor(protected httpClient: HttpClient) {}

    protected getEntityListByCriteria(url: string, options?: HttpParams): Observable<ApiResponse<T>> {
        return this.httpClient.get<any>(this.baseUrl + '/' + url + '/search', { params: options, withCredentials: environment.securityOn });
    }

    protected addEntityInstance(entity: T, url: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + '/' + url, entity, { withCredentials: environment.securityOn });
    }

    protected getEntityInstanceById(id: string, url: string): Observable<T> {
        return this.httpClient.get<T>(this.baseUrl + '/' + url + '/' + id, { withCredentials: environment.securityOn });
    }

    protected updateEntityInstance(entity: T, url: string): Observable<T> {
        return this.httpClient.put<T>(this.baseUrl + '/' + url, entity, { withCredentials: environment.securityOn });
    }

    protected deleteEntityInstance(id: string, url: string): Observable<T> {
        return this.httpClient.delete<T>(this.baseUrl + '/' + url + '/' + id, { withCredentials: environment.securityOn });
    }

    public getEntityListByLink(link: string, options?: HttpParams): Observable<ApiResponse<T>> {
        return this.httpClient.get<any>(link, { params: options, withCredentials: environment.securityOn });
    }

    protected addFilter(options: HttpParams, the: string, key: string): HttpParams {
        if (!options) {
            options = new HttpParams();
        }
        return options.append('filter', the + " : '" + key + "'");
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/shared/base/base-api.service';
import { Voila3sampleEnvironment } from 'src/app/pages/environment';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class RegistrationApiService extends BaseApiService<IUser> {
    private url: string = Voila3sampleEnvironment.contextRoot;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    //all the calls to Back End
    //add more calls here

    public doRegistration(regis: IUser): Observable<IUser> {
        return this.addEntityInstance(regis, this.url + '/api/auth/signup');
    }
}

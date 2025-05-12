import { Injectable, Injector } from '@angular/core';
import { LoginApiService } from './login-api.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGroupApiService {
    private loginApiService!: LoginApiService;

    constructor(private injector: Injector) {}

    get login(): LoginApiService {
        if (!this.loginApiService) this.loginApiService = this.injector.get(LoginApiService);
        return this.loginApiService;
    }
}

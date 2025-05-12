import { Injectable, Injector } from '@angular/core';
import { RegistrationApiService } from './registration-api.service';

@Injectable({
    providedIn: 'root'
})
export class RegistrationGroupApiService {
    private registrationApiService!: RegistrationApiService;

    constructor(private injector: Injector) {}

    get registration(): RegistrationApiService {
        if (!this.registrationApiService) this.registrationApiService = this.injector.get(RegistrationApiService);
        return this.registrationApiService;
    }
}

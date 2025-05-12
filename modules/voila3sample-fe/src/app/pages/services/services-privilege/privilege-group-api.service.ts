import { Injectable, Injector } from '@angular/core';
import { PrivilegeApiService } from './privilege-api.service';

@Injectable({
    providedIn: 'root'
})
export class PrivilegeGroupApiService {
    private privilegeApiService!: PrivilegeApiService;

    constructor(private injector: Injector) {}

    get privilege(): PrivilegeApiService {
        if (!this.privilegeApiService) this.privilegeApiService = this.injector.get(PrivilegeApiService);
        return this.privilegeApiService;
    }
}

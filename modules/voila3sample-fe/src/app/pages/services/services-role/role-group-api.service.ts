import { Injectable, Injector } from '@angular/core';
import { RoleApiService } from './role-api.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGroupApiService {
    private roleApiService!: RoleApiService;

    constructor(private injector: Injector) {}

    get role(): RoleApiService {
        if (!this.roleApiService) this.roleApiService = this.injector.get(RoleApiService);
        return this.roleApiService;
    }
}

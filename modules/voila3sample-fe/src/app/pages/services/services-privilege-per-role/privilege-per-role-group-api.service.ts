import { Injectable, Injector } from '@angular/core';
import { PrivilegePerRoleApiService } from './privilege-per-role-api.service';

import { RoleApiService } from 'src/app/pages/services/services-role/role-api.service';

import { PrivilegeApiService } from 'src/app/pages/services/services-privilege/privilege-api.service';

@Injectable({
    providedIn: 'root'
})
export class PrivilegePerRoleGroupApiService {
    private privilegePerRoleApiService!: PrivilegePerRoleApiService;

    private roleApiService!: RoleApiService;

    private privilegeApiService!: PrivilegeApiService;

    constructor(private injector: Injector) {}

    get privilegePerRole(): PrivilegePerRoleApiService {
        if (!this.privilegePerRoleApiService) this.privilegePerRoleApiService = this.injector.get(PrivilegePerRoleApiService);
        return this.privilegePerRoleApiService;
    }

    get role(): RoleApiService {
        if (!this.roleApiService) this.roleApiService = this.injector.get(RoleApiService);
        return this.roleApiService;
    }

    get privilege(): PrivilegeApiService {
        if (!this.privilegeApiService) this.privilegeApiService = this.injector.get(PrivilegeApiService);
        return this.privilegeApiService;
    }
}

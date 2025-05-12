import { Injectable, Injector } from '@angular/core';
import { RolePerUserApiService } from './role-per-user-api.service';

import { RoleApiService } from 'src/app/pages/services/services-role/role-api.service';

import { UserApiService } from 'src/app/pages/services/services-user/user-api.service';

@Injectable({
    providedIn: 'root'
})
export class RolePerUserGroupApiService {
    private rolePerUserApiService!: RolePerUserApiService;

    private roleApiService!: RoleApiService;

    private userApiService!: UserApiService;

    constructor(private injector: Injector) {}

    get rolePerUser(): RolePerUserApiService {
        if (!this.rolePerUserApiService) this.rolePerUserApiService = this.injector.get(RolePerUserApiService);
        return this.rolePerUserApiService;
    }

    get role(): RoleApiService {
        if (!this.roleApiService) this.roleApiService = this.injector.get(RoleApiService);
        return this.roleApiService;
    }

    get user(): UserApiService {
        if (!this.userApiService) this.userApiService = this.injector.get(UserApiService);
        return this.userApiService;
    }
}

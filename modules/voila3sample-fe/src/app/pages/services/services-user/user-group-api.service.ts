import { Injectable, Injector } from '@angular/core';
import { UserApiService } from './user-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserGroupApiService {
    private userApiService!: UserApiService;

    constructor(private injector: Injector) {}

    get user(): UserApiService {
        if (!this.userApiService) this.userApiService = this.injector.get(UserApiService);
        return this.userApiService;
    }
}

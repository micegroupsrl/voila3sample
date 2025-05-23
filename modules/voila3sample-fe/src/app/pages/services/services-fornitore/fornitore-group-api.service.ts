import { Injectable, Injector } from '@angular/core';
import { FornitoreApiService } from './fornitore-api.service';

@Injectable({
    providedIn: 'root'
})
export class FornitoreGroupApiService {
    private fornitoreApiService!: FornitoreApiService;

    constructor(private injector: Injector) {}

    get fornitore(): FornitoreApiService {
        if (!this.fornitoreApiService) this.fornitoreApiService = this.injector.get(FornitoreApiService);
        return this.fornitoreApiService;
    }
}

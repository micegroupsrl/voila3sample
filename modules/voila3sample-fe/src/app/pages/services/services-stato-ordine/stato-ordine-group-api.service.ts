import { Injectable, Injector } from '@angular/core';
import { StatoOrdineApiService } from './stato-ordine-api.service';

@Injectable({
    providedIn: 'root'
})
export class StatoOrdineGroupApiService {
    private statoOrdineApiService!: StatoOrdineApiService;

    constructor(private injector: Injector) {}

    get statoOrdine(): StatoOrdineApiService {
        if (!this.statoOrdineApiService) this.statoOrdineApiService = this.injector.get(StatoOrdineApiService);
        return this.statoOrdineApiService;
    }
}

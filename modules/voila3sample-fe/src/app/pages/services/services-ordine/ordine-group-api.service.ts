import { Injectable, Injector } from '@angular/core';
import { OrdineApiService } from './ordine-api.service';

import { StatoOrdineApiService } from 'src/app/pages/services/services-stato-ordine/stato-ordine-api.service';

import { TipoOrdineApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-api.service';

import { ClienteApiService } from 'src/app/pages/services/services-cliente/cliente-api.service';

@Injectable({
    providedIn: 'root'
})
export class OrdineGroupApiService {
    private ordineApiService!: OrdineApiService;

    private statoOrdineApiService!: StatoOrdineApiService;

    private tipoOrdineApiService!: TipoOrdineApiService;

    private clienteApiService!: ClienteApiService;

    constructor(private injector: Injector) {}

    get ordine(): OrdineApiService {
        if (!this.ordineApiService) this.ordineApiService = this.injector.get(OrdineApiService);
        return this.ordineApiService;
    }

    get statoOrdine(): StatoOrdineApiService {
        if (!this.statoOrdineApiService) this.statoOrdineApiService = this.injector.get(StatoOrdineApiService);
        return this.statoOrdineApiService;
    }

    get tipoOrdine(): TipoOrdineApiService {
        if (!this.tipoOrdineApiService) this.tipoOrdineApiService = this.injector.get(TipoOrdineApiService);
        return this.tipoOrdineApiService;
    }

    get cliente(): ClienteApiService {
        if (!this.clienteApiService) this.clienteApiService = this.injector.get(ClienteApiService);
        return this.clienteApiService;
    }
}

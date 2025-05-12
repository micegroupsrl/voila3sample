import { Injectable, Injector } from '@angular/core';
import { OrdineApiService } from './ordine-api.service';

import { ClienteApiService } from 'src/app/pages/services/services-cliente/cliente-api.service';

import { TipoOrdineApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-api.service';

@Injectable({
    providedIn: 'root'
})
export class OrdineGroupApiService {
    private ordineApiService!: OrdineApiService;

    private clienteApiService!: ClienteApiService;

    private tipoOrdineApiService!: TipoOrdineApiService;

    constructor(private injector: Injector) {}

    get ordine(): OrdineApiService {
        if (!this.ordineApiService) this.ordineApiService = this.injector.get(OrdineApiService);
        return this.ordineApiService;
    }

    get cliente(): ClienteApiService {
        if (!this.clienteApiService) this.clienteApiService = this.injector.get(ClienteApiService);
        return this.clienteApiService;
    }

    get tipoOrdine(): TipoOrdineApiService {
        if (!this.tipoOrdineApiService) this.tipoOrdineApiService = this.injector.get(TipoOrdineApiService);
        return this.tipoOrdineApiService;
    }
}

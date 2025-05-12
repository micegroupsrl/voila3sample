import { Injectable, Injector } from '@angular/core';
import { TipoOrdineApiService } from './tipo-ordine-api.service';

import { CategoriaOrdineApiService } from 'src/app/pages/services/services-categoria-ordine/categoria-ordine-api.service';

@Injectable({
    providedIn: 'root'
})
export class TipoOrdineGroupApiService {
    private tipoOrdineApiService!: TipoOrdineApiService;

    private categoriaOrdineApiService!: CategoriaOrdineApiService;

    constructor(private injector: Injector) {}

    get tipoOrdine(): TipoOrdineApiService {
        if (!this.tipoOrdineApiService) this.tipoOrdineApiService = this.injector.get(TipoOrdineApiService);
        return this.tipoOrdineApiService;
    }

    get categoriaOrdine(): CategoriaOrdineApiService {
        if (!this.categoriaOrdineApiService) this.categoriaOrdineApiService = this.injector.get(CategoriaOrdineApiService);
        return this.categoriaOrdineApiService;
    }
}

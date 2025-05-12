import { Injectable, Injector } from '@angular/core';
import { CategoriaOrdineApiService } from './categoria-ordine-api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriaOrdineGroupApiService {
    private categoriaOrdineApiService!: CategoriaOrdineApiService;

    constructor(private injector: Injector) {}

    get categoriaOrdine(): CategoriaOrdineApiService {
        if (!this.categoriaOrdineApiService) this.categoriaOrdineApiService = this.injector.get(CategoriaOrdineApiService);
        return this.categoriaOrdineApiService;
    }
}

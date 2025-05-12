import { Injectable, Injector } from '@angular/core';
import { ProdottoApiService } from './prodotto-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProdottoGroupApiService {
    private prodottoApiService!: ProdottoApiService;

    constructor(private injector: Injector) {}

    get prodotto(): ProdottoApiService {
        if (!this.prodottoApiService) this.prodottoApiService = this.injector.get(ProdottoApiService);
        return this.prodottoApiService;
    }
}

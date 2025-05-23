import { Injectable, Injector } from '@angular/core';
import { ProdottoApiService } from './prodotto-api.service';

import { FornitoreApiService } from 'src/app/pages/services/services-fornitore/fornitore-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProdottoGroupApiService {
    private prodottoApiService!: ProdottoApiService;

    private fornitoreApiService!: FornitoreApiService;

    constructor(private injector: Injector) {}

    get prodotto(): ProdottoApiService {
        if (!this.prodottoApiService) this.prodottoApiService = this.injector.get(ProdottoApiService);
        return this.prodottoApiService;
    }

    get fornitore(): FornitoreApiService {
        if (!this.fornitoreApiService) this.fornitoreApiService = this.injector.get(FornitoreApiService);
        return this.fornitoreApiService;
    }
}

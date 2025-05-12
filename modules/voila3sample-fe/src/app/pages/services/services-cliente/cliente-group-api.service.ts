import { Injectable, Injector } from '@angular/core';
import { ClienteApiService } from './cliente-api.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteGroupApiService {
    private clienteApiService!: ClienteApiService;

    constructor(private injector: Injector) {}

    get cliente(): ClienteApiService {
        if (!this.clienteApiService) this.clienteApiService = this.injector.get(ClienteApiService);
        return this.clienteApiService;
    }
}

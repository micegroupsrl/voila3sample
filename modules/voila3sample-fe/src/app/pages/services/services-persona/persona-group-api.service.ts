import { Injectable, Injector } from '@angular/core';
import { PersonaApiService } from './persona-api.service';

@Injectable({
    providedIn: 'root'
})
export class PersonaGroupApiService {
    private personaApiService!: PersonaApiService;

    constructor(private injector: Injector) {}

    get persona(): PersonaApiService {
        if (!this.personaApiService) this.personaApiService = this.injector.get(PersonaApiService);
        return this.personaApiService;
    }
}

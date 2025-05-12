import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function personaForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idPersona: [null, Validators.required],
        codiceFiscale: [null, Validators.compose([Validators.maxLength(80), Validators.required])]
    });
}

import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function clienteForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idPersona: [null, Validators.required],
        codiceFiscale: [null, Validators.compose([Validators.maxLength(80), Validators.required])],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        telefono: [null, Validators.maxLength(80)],
        indirizzo: [null, Validators.maxLength(80)],
        createdBy: [null, Validators.maxLength(80)],
        lastModifiedBy: [null, Validators.maxLength(80)],
        createdDate: [null],
        lastModifiedDate: [null],
        theOrdine: [[]]
    });
}

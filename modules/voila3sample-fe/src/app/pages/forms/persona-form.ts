import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function personaForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idPersona: [null, Validators.required],
        cf: [null, Validators.compose([Validators.maxLength(80), Validators.required])],
        nome: [null, Validators.maxLength(80)],
        cognome: [null, Validators.maxLength(80)],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        telefono: [null, Validators.maxLength(80)],
        createdBy: [null, Validators.maxLength(80)],
        lastModifiedBy: [null, Validators.maxLength(80)],
        createdDate: [null],
        lastModifiedDate: [null]
    });
}

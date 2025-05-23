import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function fornitoreForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idPersona: [null, Validators.required],
        cf: [null, Validators.compose([Validators.maxLength(80), Validators.required])],
        piva: [null, Validators.maxLength(80)],
        nome: [null, Validators.maxLength(80)],
        cognome: [null, Validators.maxLength(80)],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        telefono: [null, Validators.maxLength(80)],
        theProdotto: [[]]
    });
}

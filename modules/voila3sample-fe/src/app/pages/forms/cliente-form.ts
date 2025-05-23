import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function clienteForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idPersona: [null, Validators.required],
        cf: [null, Validators.compose([Validators.maxLength(80), Validators.required])],
        punti: [null, Validators.maxLength(11)],
        nome: [null, Validators.maxLength(80)],
        cognome: [null, Validators.maxLength(80)],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        telefono: [null, Validators.maxLength(80)],
        theOrdine: [[]]
    });
}

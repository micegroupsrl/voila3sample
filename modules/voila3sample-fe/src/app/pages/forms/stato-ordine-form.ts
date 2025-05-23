import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function statoOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idStatoOrdine: [null, Validators.required],
        descrizione: [null, Validators.maxLength(80)],
        theOrdine: [[]]
    });
}

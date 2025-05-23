import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function categoriaOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idCatOrdine: [null, Validators.required],
        theTipoOrdine: [[]]
    });
}

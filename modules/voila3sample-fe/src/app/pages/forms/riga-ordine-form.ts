import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function rigaOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idOrdine: [null],
        theOrdineObjectKey: [null, Validators.required],
        theOrdineObjectTitle: [null],
        idProdotto: [null],
        theProdottoObjectKey: [null, Validators.required],
        theProdottoObjectTitle: [null],
        qta: [null, Validators.maxLength(12)]
    });
}

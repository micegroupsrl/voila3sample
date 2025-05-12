import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function rigaOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idProdotto: [null],
        theProdottoObjectKey: [null, Validators.required],
        theProdottoObjectTitle: [null],
        idOrdine: [null],
        theOrdineObjectKey: [null, Validators.required],
        theOrdineObjectTitle: [null],
        quantita: [null, Validators.maxLength(12)]
    });
}

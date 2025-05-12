import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function prodottoForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idProdotto: [null],
        nomeProdotto: [null, Validators.maxLength(80)],
        theRigaOrdine: [[]]
    });
}

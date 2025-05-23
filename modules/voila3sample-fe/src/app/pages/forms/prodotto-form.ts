import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function prodottoForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idProdotto: [null, Validators.required],
        descrizione: [null, Validators.maxLength(80)],
        createdBy: [null, Validators.maxLength(80)],
        lastModifiedBy: [null, Validators.maxLength(80)],
        createdDate: [null],
        lastModifiedDate: [null],
        theFornitoreObjectKey: [null],
        theFornitoreObjectTitle: [null],
        theRigaOrdine: [[]]
    });
}

import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function ordineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idOrdine: [null, Validators.required],
        descrizione: [null, Validators.maxLength(80)],
        datetime: [null],
        date: [null],
        time: [null],
        createdBy: [null, Validators.maxLength(80)],
        lastModifiedBy: [null, Validators.maxLength(80)],
        createdDate: [null],
        lastModifiedDate: [null],
        theStatoOrdineObjectKey: [null],
        theStatoOrdineObjectTitle: [null],
        theTipoOrdineObjectKey: [null],
        theTipoOrdineObjectTitle: [null],
        theClienteObjectKey: [null],
        theClienteObjectTitle: [null],
        theOrdineAggregatoObjectKey: [null],
        theOrdineAggregatoObjectTitle: [null],
        theRigaOrdine: [[]],
        theOrdineFiglio: [[]]
    });
}

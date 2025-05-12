import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function ordineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idOrdine: [null, Validators.required],
        dataOrdine: [null, Validators.required],
        tempoOrdine: [null],
        createdBy: [null, Validators.maxLength(80)],
        lastModifiedBy: [null, Validators.maxLength(80)],
        createdDate: [null],
        lastModifiedDate: [null],
        theClienteObjectKey: [null, Validators.required],
        theClienteObjectTitle: [null],
        theTipoOrdineObjectKey: [null],
        theTipoOrdineObjectTitle: [null],
        theOrdineAggregatoObjectKey: [null],
        theOrdineAggregatoObjectTitle: [null],
        theRigaOrdine: [[]],
        theOrdineFiglio: [[]]
    });
}

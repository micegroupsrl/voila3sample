import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function tipoOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        anno: [null, Validators.compose([Validators.maxLength(11), Validators.required])],
        idTipoOrdine: [null, Validators.required],
        idCatOrdine: [null],
        theCategoriaOrdineObjectKey: [null, Validators.required],
        theCategoriaOrdineObjectTitle: [null],
        theOrdine: [[]]
    });
}

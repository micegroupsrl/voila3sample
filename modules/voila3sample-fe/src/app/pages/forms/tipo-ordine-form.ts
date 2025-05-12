import { FormBuilder, Validators } from '@angular/forms';

/**
 * Define Form Here.
 */

export function tipoOrdineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        idTipoOrdine: [null, Validators.required],
        annoTipologia: [null, Validators.required],
        idCategoriaOrdine: [null],
        theCategoriaOrdineObjectKey: [null, Validators.required],
        theCategoriaOrdineObjectTitle: [null],
        nomeOrdine: [null, Validators.maxLength(80)],
        theOrdine: [[]]
    });
}

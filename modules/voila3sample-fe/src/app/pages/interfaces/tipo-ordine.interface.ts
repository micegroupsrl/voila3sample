import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IOrdine } from '../interfaces/ordine.interface';

/**
 * ITipoOrdine's Interface.
 */

export interface ITipoOrdine extends BaseEntity {
    idTipoOrdine: number;
    annoTipologia: number;
    idCategoriaOrdine: number;

    nomeOrdine: string;

    theCategoriaOrdineObjectKey: string;
    theCategoriaOrdineObjectTitle: string;
    theOrdine: IOrdine[];
}

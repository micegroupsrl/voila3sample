import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IOrdine } from '../interfaces/ordine.interface';

/**
 * ITipoOrdine's Interface.
 */

export interface ITipoOrdine extends BaseEntity {
    anno: number;
    idTipoOrdine: number;
    idCatOrdine: number;
    theCategoriaOrdineObjectKey: string;
    theCategoriaOrdineObjectTitle: string;
    theOrdine: IOrdine[];
}

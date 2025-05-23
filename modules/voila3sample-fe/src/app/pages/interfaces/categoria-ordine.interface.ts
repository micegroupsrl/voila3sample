import { BaseEntity } from 'src/app/shared/base/base.interface';
import { ITipoOrdine } from '../interfaces/tipo-ordine.interface';

/**
 * ICategoriaOrdine's Interface.
 */

export interface ICategoriaOrdine extends BaseEntity {
    idCatOrdine: number;
    theTipoOrdine: ITipoOrdine[];
}

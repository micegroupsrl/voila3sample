import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IOrdine } from '../interfaces/ordine.interface';

/**
 * IStatoOrdine's Interface.
 */

export interface IStatoOrdine extends BaseEntity {
    idStatoOrdine: number;

    descrizione: string;

    theOrdine: IOrdine[];
}

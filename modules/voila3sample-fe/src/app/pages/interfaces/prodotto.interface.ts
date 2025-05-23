import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IRigaOrdine } from '../interfaces/riga-ordine.interface';

/**
 * IProdotto's Interface.
 */

export interface IProdotto extends BaseEntity {
    idProdotto: number;

    descrizione: string;

    createdBy: string;

    lastModifiedBy: string;

    createdDate: Date;

    lastModifiedDate: Date;

    theFornitoreObjectKey: string;
    theFornitoreObjectTitle: string;
    theRigaOrdine: IRigaOrdine[];
}

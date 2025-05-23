import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IRigaOrdine } from '../interfaces/riga-ordine.interface';

/**
 * IOrdine's Interface.
 */

export interface IOrdine extends BaseEntity {
    idOrdine: number;

    descrizione: string;

    datetime: Date;

    date: Date;

    time: Date;

    createdBy: string;

    lastModifiedBy: string;

    createdDate: Date;

    lastModifiedDate: Date;

    theStatoOrdineObjectKey: string;
    theStatoOrdineObjectTitle: string;
    theTipoOrdineObjectKey: string;
    theTipoOrdineObjectTitle: string;
    theClienteObjectKey: string;
    theClienteObjectTitle: string;
    theOrdineAggregatoObjectKey: string;
    theOrdineAggregatoObjectTitle: string;
    theRigaOrdine: IRigaOrdine[];
    theOrdineFiglio: IOrdine[];
}

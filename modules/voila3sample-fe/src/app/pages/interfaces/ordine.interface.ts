import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IRigaOrdine } from '../interfaces/riga-ordine.interface';

/**
 * IOrdine's Interface.
 */

export interface IOrdine extends BaseEntity {
    idOrdine: number;

    dataOrdine: Date;

    tempoOrdine: Date;

    createdBy: string;

    lastModifiedBy: string;

    createdDate: Date;

    lastModifiedDate: Date;

    theClienteObjectKey: string;
    theClienteObjectTitle: string;
    theTipoOrdineObjectKey: string;
    theTipoOrdineObjectTitle: string;
    theOrdineAggregatoObjectKey: string;
    theOrdineAggregatoObjectTitle: string;
    theRigaOrdine: IRigaOrdine[];
    theOrdineFiglio: IOrdine[];
}

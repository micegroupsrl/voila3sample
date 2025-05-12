import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IRigaOrdine's Interface.
 */

export interface IRigaOrdine extends BaseEntity {
    idProdotto: number;
    idOrdine: number;

    quantita: number;

    theProdottoObjectKey: string;
    theProdottoObjectTitle: string;
    theOrdineObjectKey: string;
    theOrdineObjectTitle: string;
}

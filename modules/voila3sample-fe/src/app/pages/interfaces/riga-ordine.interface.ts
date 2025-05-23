import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IRigaOrdine's Interface.
 */

export interface IRigaOrdine extends BaseEntity {
    idOrdine: number;
    idProdotto: number;

    qta: number;

    theOrdineObjectKey: string;
    theOrdineObjectTitle: string;
    theProdottoObjectKey: string;
    theProdottoObjectTitle: string;
}

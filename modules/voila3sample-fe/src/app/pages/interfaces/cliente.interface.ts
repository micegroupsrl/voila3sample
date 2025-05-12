import { IOrdine } from '../interfaces/ordine.interface';
import { IPersona } from '../interfaces/persona.interface';

/**
 * ICliente's Interface.
 */

export interface ICliente extends IPersona {
    idPersona: number;
    codiceFiscale: string;

    email: string;

    telefono: string;

    indirizzo: string;

    createdBy: string;

    lastModifiedBy: string;

    createdDate: Date;

    lastModifiedDate: Date;

    theOrdine: IOrdine[];
}

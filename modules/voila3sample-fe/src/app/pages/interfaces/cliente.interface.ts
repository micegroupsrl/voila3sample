import { IOrdine } from '../interfaces/ordine.interface';
import { IPersona } from '../interfaces/persona.interface';

/**
 * ICliente's Interface.
 */

export interface ICliente extends IPersona {
    idPersona: number;
    cf: string;

    punti: number;

    nome: string;

    cognome: string;

    email: string;

    telefono: string;

    theOrdine: IOrdine[];
}

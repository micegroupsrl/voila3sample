import { IProdotto } from '../interfaces/prodotto.interface';
import { IPersona } from '../interfaces/persona.interface';

/**
 * IFornitore's Interface.
 */

export interface IFornitore extends IPersona {
    idPersona: number;
    cf: string;

    piva: string;

    nome: string;

    cognome: string;

    email: string;

    telefono: string;

    theProdotto: IProdotto[];
}

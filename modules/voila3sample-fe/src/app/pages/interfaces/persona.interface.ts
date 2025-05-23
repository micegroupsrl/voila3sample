import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IPersona's Interface.
 */

export interface IPersona extends BaseEntity {
    idPersona: number;
    cf: string;

    nome: string;

    cognome: string;

    email: string;

    telefono: string;

    createdBy: string;

    lastModifiedBy: string;

    createdDate: Date;

    lastModifiedDate: Date;
}

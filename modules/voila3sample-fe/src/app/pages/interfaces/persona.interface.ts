import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IPersona's Interface.
 */

export interface IPersona extends BaseEntity {
    idPersona: number;
    codiceFiscale: string;
}

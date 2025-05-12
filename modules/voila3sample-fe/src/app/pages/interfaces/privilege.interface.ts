import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IPrivilegePerRole } from '../interfaces/privilege-per-role.interface';

/**
 * IPrivilege's Interface.
 */

export interface IPrivilege extends BaseEntity {
    privilegeId: number;

    name: string;

    description: string;

    thePrivilegePerRole: IPrivilegePerRole[];
}

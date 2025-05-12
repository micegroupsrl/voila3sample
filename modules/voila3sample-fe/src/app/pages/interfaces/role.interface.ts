import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IPrivilegePerRole } from '../interfaces/privilege-per-role.interface';
import { IRolePerUser } from '../interfaces/role-per-user.interface';

/**
 * IRole's Interface.
 */

export interface IRole extends BaseEntity {
    roleId: string;

    name: string;

    theRoleRoleGroupObjectKey: string;
    theRoleRoleGroupObjectTitle: string;
    thePrivilegePerRole: IPrivilegePerRole[];
    theRolePerUser: IRolePerUser[];
    theRoleRoleChild: IRole[];
}

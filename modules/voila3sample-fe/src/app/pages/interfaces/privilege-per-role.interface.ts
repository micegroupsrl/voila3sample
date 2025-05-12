import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IPrivilegePerRole's Interface.
 */

export interface IPrivilegePerRole extends BaseEntity {
    roleId: string;
    privilegeId: number;
    theRoleObjectKey: string;
    theRoleObjectTitle: string;
    thePrivilegeObjectKey: string;
    thePrivilegeObjectTitle: string;
}

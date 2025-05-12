import { BaseEntity } from 'src/app/shared/base/base.interface';

/**
 * IRolePerUser's Interface.
 */

export interface IRolePerUser extends BaseEntity {
    roleId: string;
    userId: number;
    theRoleObjectKey: string;
    theRoleObjectTitle: string;
    theUserObjectKey: string;
    theUserObjectTitle: string;
}

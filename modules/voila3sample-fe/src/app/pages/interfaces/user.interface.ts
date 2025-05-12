import { BaseEntity } from 'src/app/shared/base/base.interface';
import { IRolePerUser } from '../interfaces/role-per-user.interface';

/**
 * IUser's Interface.
 */

export interface IUser extends BaseEntity {
    userId: number;

    email: string;

    password: string;

    username: string;

    theRolePerUser: IRolePerUser[];
}

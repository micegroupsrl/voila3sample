import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailRolePerUserComponent } from './detail-role-per-user/detail-role-per-user.component';
import { RolePerUserComponent } from './role-per-user.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-role-per-user',
                component: RolePerUserComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ROLE_PER_USER_SEARCH] }
            },
            {
                path: 'detail-role-per-user/new',
                component: DetailRolePerUserComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.ROLE_PER_USER_CREATE] }
            },
            {
                path: 'detail-role-per-user/:id/view',
                component: DetailRolePerUserComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ROLE_PER_USER_READ] }
            },
            {
                path: 'detail-role-per-user/:id/edit',
                component: DetailRolePerUserComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.ROLE_PER_USER_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolePerUserRoutingModule {}

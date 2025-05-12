import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailPrivilegePerRoleComponent } from './detail-privilege-per-role/detail-privilege-per-role.component';
import { PrivilegePerRoleComponent } from './privilege-per-role.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-privilege-per-role',
                component: PrivilegePerRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRIVILEGE_PER_ROLE_SEARCH] }
            },
            {
                path: 'detail-privilege-per-role/new',
                component: DetailPrivilegePerRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.PRIVILEGE_PER_ROLE_CREATE] }
            },
            {
                path: 'detail-privilege-per-role/:id/view',
                component: DetailPrivilegePerRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRIVILEGE_PER_ROLE_READ] }
            },
            {
                path: 'detail-privilege-per-role/:id/edit',
                component: DetailPrivilegePerRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.PRIVILEGE_PER_ROLE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivilegePerRoleRoutingModule {}

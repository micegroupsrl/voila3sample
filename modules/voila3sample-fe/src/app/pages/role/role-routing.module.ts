import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { RoleComponent } from './role.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-role',
                component: RoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ROLE_SEARCH] }
            },
            {
                path: 'detail-role/new',
                component: DetailRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.ROLE_CREATE] }
            },
            {
                path: 'detail-role/:id/view',
                component: DetailRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ROLE_READ] }
            },
            {
                path: 'detail-role/:id/edit',
                component: DetailRoleComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.ROLE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailPrivilegeComponent } from './detail-privilege/detail-privilege.component';
import { PrivilegeComponent } from './privilege.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-privilege',
                component: PrivilegeComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRIVILEGE_SEARCH] }
            },
            {
                path: 'detail-privilege/new',
                component: DetailPrivilegeComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.PRIVILEGE_CREATE] }
            },
            {
                path: 'detail-privilege/:id/view',
                component: DetailPrivilegeComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRIVILEGE_READ] }
            },
            {
                path: 'detail-privilege/:id/edit',
                component: DetailPrivilegeComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.PRIVILEGE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivilegeRoutingModule {}

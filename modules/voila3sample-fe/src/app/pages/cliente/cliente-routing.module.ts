import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailClienteComponent } from './detail-cliente/detail-cliente.component';
import { ClienteComponent } from './cliente.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-cliente',
                component: ClienteComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.CLIENTE_SEARCH] }
            },
            {
                path: 'detail-cliente/new',
                component: DetailClienteComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.CLIENTE_CREATE] }
            },
            {
                path: 'detail-cliente/:id/view',
                component: DetailClienteComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.CLIENTE_READ] }
            },
            {
                path: 'detail-cliente/:id/edit',
                component: DetailClienteComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.CLIENTE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { OrdineComponent } from './ordine.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-ordine',
                component: OrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ORDINE_SEARCH] }
            },
            {
                path: 'detail-ordine/new',
                component: DetailOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.ORDINE_CREATE] }
            },
            {
                path: 'detail-ordine/:id/view',
                component: DetailOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.ORDINE_READ] }
            },
            {
                path: 'detail-ordine/:id/edit',
                component: DetailOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.ORDINE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdineRoutingModule {}

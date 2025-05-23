import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailStatoOrdineComponent } from './detail-stato-ordine/detail-stato-ordine.component';
import { StatoOrdineComponent } from './stato-ordine.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-stato-ordine',
                component: StatoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.STATO_ORDINE_SEARCH] }
            },
            {
                path: 'detail-stato-ordine/new',
                component: DetailStatoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.STATO_ORDINE_CREATE] }
            },
            {
                path: 'detail-stato-ordine/:id/view',
                component: DetailStatoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.STATO_ORDINE_READ] }
            },
            {
                path: 'detail-stato-ordine/:id/edit',
                component: DetailStatoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.STATO_ORDINE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatoOrdineRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailTipoOrdineComponent } from './detail-tipo-ordine/detail-tipo-ordine.component';
import { TipoOrdineComponent } from './tipo-ordine.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-tipo-ordine',
                component: TipoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.TIPO_ORDINE_SEARCH] }
            },
            {
                path: 'detail-tipo-ordine/new',
                component: DetailTipoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.TIPO_ORDINE_CREATE] }
            },
            {
                path: 'detail-tipo-ordine/:id/view',
                component: DetailTipoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.TIPO_ORDINE_READ] }
            },
            {
                path: 'detail-tipo-ordine/:id/edit',
                component: DetailTipoOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.TIPO_ORDINE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoOrdineRoutingModule {}

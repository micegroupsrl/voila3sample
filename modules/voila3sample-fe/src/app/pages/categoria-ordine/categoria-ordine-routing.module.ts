import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailCategoriaOrdineComponent } from './detail-categoria-ordine/detail-categoria-ordine.component';
import { CategoriaOrdineComponent } from './categoria-ordine.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-categoria-ordine',
                component: CategoriaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.CATEGORIA_ORDINE_SEARCH] }
            },
            {
                path: 'detail-categoria-ordine/new',
                component: DetailCategoriaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.CATEGORIA_ORDINE_CREATE] }
            },
            {
                path: 'detail-categoria-ordine/:id/view',
                component: DetailCategoriaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.CATEGORIA_ORDINE_READ] }
            },
            {
                path: 'detail-categoria-ordine/:id/edit',
                component: DetailCategoriaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.CATEGORIA_ORDINE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaOrdineRoutingModule {}

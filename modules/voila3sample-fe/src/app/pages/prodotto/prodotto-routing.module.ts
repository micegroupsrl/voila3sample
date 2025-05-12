import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailProdottoComponent } from './detail-prodotto/detail-prodotto.component';
import { ProdottoComponent } from './prodotto.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-prodotto',
                component: ProdottoComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRODOTTO_SEARCH] }
            },
            {
                path: 'detail-prodotto/new',
                component: DetailProdottoComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.PRODOTTO_CREATE] }
            },
            {
                path: 'detail-prodotto/:id/view',
                component: DetailProdottoComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.PRODOTTO_READ] }
            },
            {
                path: 'detail-prodotto/:id/edit',
                component: DetailProdottoComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.PRODOTTO_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdottoRoutingModule {}

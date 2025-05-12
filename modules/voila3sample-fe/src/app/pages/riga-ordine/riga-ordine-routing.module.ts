import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailRigaOrdineComponent } from './detail-riga-ordine/detail-riga-ordine.component';
import { RigaOrdineComponent } from './riga-ordine.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-riga-ordine',
                component: RigaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.RIGA_ORDINE_SEARCH] }
            },
            {
                path: 'detail-riga-ordine/new',
                component: DetailRigaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.RIGA_ORDINE_CREATE] }
            },
            {
                path: 'detail-riga-ordine/:id/view',
                component: DetailRigaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.RIGA_ORDINE_READ] }
            },
            {
                path: 'detail-riga-ordine/:id/edit',
                component: DetailRigaOrdineComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.RIGA_ORDINE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RigaOrdineRoutingModule {}

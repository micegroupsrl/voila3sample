import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { AppAuthGuard } from 'src/app/app.authguard';
import { DetailFornitoreComponent } from './detail-fornitore/detail-fornitore.component';
import { FornitoreComponent } from './fornitore.component';

const Privileges = getPrivilegesEnum();

/**
 * You can put here all the paths related to this entity.
 */

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-fornitore',
                component: FornitoreComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.FORNITORE_SEARCH] }
            },
            {
                path: 'detail-fornitore/new',
                component: DetailFornitoreComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'new', privileges: [Privileges?.FORNITORE_CREATE] }
            },
            {
                path: 'detail-fornitore/:id/view',
                component: DetailFornitoreComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'view', privileges: [Privileges?.FORNITORE_READ] }
            },
            {
                path: 'detail-fornitore/:id/edit',
                component: DetailFornitoreComponent,
                canActivate: [AppAuthGuard],
                data: { pageStatus: 'edit', privileges: [Privileges?.FORNITORE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FornitoreRoutingModule {}

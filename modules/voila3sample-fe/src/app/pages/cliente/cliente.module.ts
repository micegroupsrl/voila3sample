import { NgModule } from '@angular/core';
import { SearchClienteResidComponent } from 'src/app/pages/search/search-cliente-resid/search-cliente-resid.component';
import { SearchClienteResidAdvancedComponent } from 'src/app/pages/search/search-cliente-resid-advanced/search-cliente-resid-advanced.component';
import { DetailClienteComponent, DeleteClienteDialog } from './detail-cliente/detail-cliente.component';
import { TabsClienteComponent } from './detail-cliente/tabs-cliente/tabs-cliente.component';
import { TabOrdineEditFeComponent } from './detail-cliente/tabs-cliente/tab-ordine-edit-fe/tab-ordine-edit-fe.component';
import { TabOrdineViewComponent } from './detail-cliente/tabs-cliente/tab-ordine-view/tab-ordine-view.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { DialogListClienteComponent } from '../dialog/dialog-list-cliente/dialog-list-cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailClienteEditComponent } from './detail-cliente/detail-cliente-edit/detail-cliente-edit.component';
import { DetailClienteViewComponent } from './detail-cliente/detail-cliente-view/detail-cliente-view.component';
import { ClienteComponent } from './cliente.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchClienteResidComponent,
    SearchClienteResidAdvancedComponent,
    //detail component
    DetailClienteComponent,
    DetailClienteEditComponent,
    DetailClienteViewComponent,
    //tabs component
    TabsClienteComponent,
    DialogListClienteComponent,
    TabOrdineEditFeComponent,
    TabOrdineViewComponent,
    //delete component
    DeleteClienteDialog,
    //entity component
    ClienteComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        ClienteRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class ClienteModule {}

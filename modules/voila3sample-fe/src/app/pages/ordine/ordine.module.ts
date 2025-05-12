import { NgModule } from '@angular/core';
import { SearchOrdineResidComponent } from 'src/app/pages/search/search-ordine-resid/search-ordine-resid.component';
import { SearchOrdineResidAdvancedComponent } from 'src/app/pages/search/search-ordine-resid-advanced/search-ordine-resid-advanced.component';
import { DetailOrdineComponent, DeleteOrdineDialog } from './detail-ordine/detail-ordine.component';
import { TabsOrdineComponent } from './detail-ordine/tabs-ordine/tabs-ordine.component';
import { TabRigaOrdineEditFeComponent } from './detail-ordine/tabs-ordine/tab-riga-ordine-edit-fe/tab-riga-ordine-edit-fe.component';
import { TabRigaOrdineViewComponent } from './detail-ordine/tabs-ordine/tab-riga-ordine-view/tab-riga-ordine-view.component';
import { TabOrdineFiglioEditFeComponent } from './detail-ordine/tabs-ordine/tab-ordine-figlio-edit-fe/tab-ordine-figlio-edit-fe.component';
import { TabOrdineFiglioViewComponent } from './detail-ordine/tabs-ordine/tab-ordine-figlio-view/tab-ordine-figlio-view.component';
import { OrdineRoutingModule } from './ordine-routing.module';
import { DialogListOrdineComponent } from '../dialog/dialog-list-ordine/dialog-list-ordine.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailOrdineEditComponent } from './detail-ordine/detail-ordine-edit/detail-ordine-edit.component';
import { DetailOrdineViewComponent } from './detail-ordine/detail-ordine-view/detail-ordine-view.component';
import { OrdineComponent } from './ordine.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchOrdineResidComponent,
    SearchOrdineResidAdvancedComponent,
    //detail component
    DetailOrdineComponent,
    DetailOrdineEditComponent,
    DetailOrdineViewComponent,
    //tabs component
    TabsOrdineComponent,
    DialogListOrdineComponent,
    TabRigaOrdineEditFeComponent,
    TabRigaOrdineViewComponent,
    TabOrdineFiglioEditFeComponent,
    TabOrdineFiglioViewComponent,
    //delete component
    DeleteOrdineDialog,
    //entity component
    OrdineComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        OrdineRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class OrdineModule {}

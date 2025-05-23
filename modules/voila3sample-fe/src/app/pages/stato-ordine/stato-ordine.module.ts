import { NgModule } from '@angular/core';
import { SearchStatoOrdineResidComponent } from 'src/app/pages/search/search-stato-ordine-resid/search-stato-ordine-resid.component';
import { SearchStatoOrdineResidAdvancedComponent } from 'src/app/pages/search/search-stato-ordine-resid-advanced/search-stato-ordine-resid-advanced.component';
import { DetailStatoOrdineComponent, DeleteStatoOrdineDialog } from './detail-stato-ordine/detail-stato-ordine.component';
import { TabsStatoOrdineComponent } from './detail-stato-ordine/tabs-stato-ordine/tabs-stato-ordine.component';
import { TabOrdineEditFeComponent } from './detail-stato-ordine/tabs-stato-ordine/tab-ordine-edit-fe/tab-ordine-edit-fe.component';
import { TabOrdineViewComponent } from './detail-stato-ordine/tabs-stato-ordine/tab-ordine-view/tab-ordine-view.component';
import { StatoOrdineRoutingModule } from './stato-ordine-routing.module';
import { DialogListStatoOrdineComponent } from '../dialog/dialog-list-stato-ordine/dialog-list-stato-ordine.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailStatoOrdineEditComponent } from './detail-stato-ordine/detail-stato-ordine-edit/detail-stato-ordine-edit.component';
import { DetailStatoOrdineViewComponent } from './detail-stato-ordine/detail-stato-ordine-view/detail-stato-ordine-view.component';
import { StatoOrdineComponent } from './stato-ordine.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchStatoOrdineResidComponent,
    SearchStatoOrdineResidAdvancedComponent,
    //detail component
    DetailStatoOrdineComponent,
    DetailStatoOrdineEditComponent,
    DetailStatoOrdineViewComponent,
    //tabs component
    TabsStatoOrdineComponent,
    DialogListStatoOrdineComponent,
    TabOrdineEditFeComponent,
    TabOrdineViewComponent,
    //delete component
    DeleteStatoOrdineDialog,
    //entity component
    StatoOrdineComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        StatoOrdineRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class StatoOrdineModule {}

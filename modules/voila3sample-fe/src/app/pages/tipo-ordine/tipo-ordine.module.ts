import { NgModule } from '@angular/core';
import { SearchTipoOrdineResidComponent } from 'src/app/pages/search/search-tipo-ordine-resid/search-tipo-ordine-resid.component';
import { SearchTipoOrdineResidAdvancedComponent } from 'src/app/pages/search/search-tipo-ordine-resid-advanced/search-tipo-ordine-resid-advanced.component';
import { DetailTipoOrdineComponent, DeleteTipoOrdineDialog } from './detail-tipo-ordine/detail-tipo-ordine.component';
import { TabsTipoOrdineComponent } from './detail-tipo-ordine/tabs-tipo-ordine/tabs-tipo-ordine.component';
import { TabOrdineEditFeComponent } from './detail-tipo-ordine/tabs-tipo-ordine/tab-ordine-edit-fe/tab-ordine-edit-fe.component';
import { TabOrdineViewComponent } from './detail-tipo-ordine/tabs-tipo-ordine/tab-ordine-view/tab-ordine-view.component';
import { TipoOrdineRoutingModule } from './tipo-ordine-routing.module';
import { DialogListTipoOrdineComponent } from '../dialog/dialog-list-tipo-ordine/dialog-list-tipo-ordine.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailTipoOrdineEditComponent } from './detail-tipo-ordine/detail-tipo-ordine-edit/detail-tipo-ordine-edit.component';
import { DetailTipoOrdineViewComponent } from './detail-tipo-ordine/detail-tipo-ordine-view/detail-tipo-ordine-view.component';
import { TipoOrdineComponent } from './tipo-ordine.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchTipoOrdineResidComponent,
    SearchTipoOrdineResidAdvancedComponent,
    //detail component
    DetailTipoOrdineComponent,
    DetailTipoOrdineEditComponent,
    DetailTipoOrdineViewComponent,
    //tabs component
    TabsTipoOrdineComponent,
    DialogListTipoOrdineComponent,
    TabOrdineEditFeComponent,
    TabOrdineViewComponent,
    //delete component
    DeleteTipoOrdineDialog,
    //entity component
    TipoOrdineComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        TipoOrdineRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class TipoOrdineModule {}

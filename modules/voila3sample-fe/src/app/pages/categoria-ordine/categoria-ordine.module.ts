import { NgModule } from '@angular/core';
import { SearchCategoriaOrdineResidComponent } from 'src/app/pages/search/search-categoria-ordine-resid/search-categoria-ordine-resid.component';
import { SearchCategoriaOrdineResidAdvancedComponent } from 'src/app/pages/search/search-categoria-ordine-resid-advanced/search-categoria-ordine-resid-advanced.component';
import { DetailCategoriaOrdineComponent, DeleteCategoriaOrdineDialog } from './detail-categoria-ordine/detail-categoria-ordine.component';
import { TabsCategoriaOrdineComponent } from './detail-categoria-ordine/tabs-categoria-ordine/tabs-categoria-ordine.component';
import { TabTipoOrdineEditFeComponent } from './detail-categoria-ordine/tabs-categoria-ordine/tab-tipo-ordine-edit-fe/tab-tipo-ordine-edit-fe.component';
import { TabTipoOrdineViewComponent } from './detail-categoria-ordine/tabs-categoria-ordine/tab-tipo-ordine-view/tab-tipo-ordine-view.component';
import { CategoriaOrdineRoutingModule } from './categoria-ordine-routing.module';
import { DialogListCategoriaOrdineComponent } from '../dialog/dialog-list-categoria-ordine/dialog-list-categoria-ordine.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailCategoriaOrdineEditComponent } from './detail-categoria-ordine/detail-categoria-ordine-edit/detail-categoria-ordine-edit.component';
import { DetailCategoriaOrdineViewComponent } from './detail-categoria-ordine/detail-categoria-ordine-view/detail-categoria-ordine-view.component';
import { CategoriaOrdineComponent } from './categoria-ordine.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchCategoriaOrdineResidComponent,
    SearchCategoriaOrdineResidAdvancedComponent,
    //detail component
    DetailCategoriaOrdineComponent,
    DetailCategoriaOrdineEditComponent,
    DetailCategoriaOrdineViewComponent,
    //tabs component
    TabsCategoriaOrdineComponent,
    DialogListCategoriaOrdineComponent,
    TabTipoOrdineEditFeComponent,
    TabTipoOrdineViewComponent,
    //delete component
    DeleteCategoriaOrdineDialog,
    //entity component
    CategoriaOrdineComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CategoriaOrdineRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class CategoriaOrdineModule {}

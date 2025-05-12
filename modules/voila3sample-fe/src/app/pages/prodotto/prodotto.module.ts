import { NgModule } from '@angular/core';
import { SearchProdottoResidComponent } from 'src/app/pages/search/search-prodotto-resid/search-prodotto-resid.component';
import { SearchProdottoResidAdvancedComponent } from 'src/app/pages/search/search-prodotto-resid-advanced/search-prodotto-resid-advanced.component';
import { DetailProdottoComponent, DeleteProdottoDialog } from './detail-prodotto/detail-prodotto.component';
import { TabsProdottoComponent } from './detail-prodotto/tabs-prodotto/tabs-prodotto.component';
import { TabRigaOrdineEditFeComponent } from './detail-prodotto/tabs-prodotto/tab-riga-ordine-edit-fe/tab-riga-ordine-edit-fe.component';
import { TabRigaOrdineViewComponent } from './detail-prodotto/tabs-prodotto/tab-riga-ordine-view/tab-riga-ordine-view.component';
import { ProdottoRoutingModule } from './prodotto-routing.module';
import { DialogListProdottoComponent } from '../dialog/dialog-list-prodotto/dialog-list-prodotto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailProdottoEditComponent } from './detail-prodotto/detail-prodotto-edit/detail-prodotto-edit.component';
import { DetailProdottoViewComponent } from './detail-prodotto/detail-prodotto-view/detail-prodotto-view.component';
import { ProdottoComponent } from './prodotto.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchProdottoResidComponent,
    SearchProdottoResidAdvancedComponent,
    //detail component
    DetailProdottoComponent,
    DetailProdottoEditComponent,
    DetailProdottoViewComponent,
    //tabs component
    TabsProdottoComponent,
    DialogListProdottoComponent,
    TabRigaOrdineEditFeComponent,
    TabRigaOrdineViewComponent,
    //delete component
    DeleteProdottoDialog,
    //entity component
    ProdottoComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        ProdottoRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class ProdottoModule {}

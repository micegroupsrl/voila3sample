import { NgModule } from '@angular/core';
import { SearchFornitoreResidComponent } from 'src/app/pages/search/search-fornitore-resid/search-fornitore-resid.component';
import { SearchFornitoreResidAdvancedComponent } from 'src/app/pages/search/search-fornitore-resid-advanced/search-fornitore-resid-advanced.component';
import { DetailFornitoreComponent, DeleteFornitoreDialog } from './detail-fornitore/detail-fornitore.component';
import { TabsFornitoreComponent } from './detail-fornitore/tabs-fornitore/tabs-fornitore.component';
import { TabProdottoEditFeComponent } from './detail-fornitore/tabs-fornitore/tab-prodotto-edit-fe/tab-prodotto-edit-fe.component';
import { TabProdottoViewComponent } from './detail-fornitore/tabs-fornitore/tab-prodotto-view/tab-prodotto-view.component';
import { FornitoreRoutingModule } from './fornitore-routing.module';
import { DialogListFornitoreComponent } from '../dialog/dialog-list-fornitore/dialog-list-fornitore.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailFornitoreEditComponent } from './detail-fornitore/detail-fornitore-edit/detail-fornitore-edit.component';
import { DetailFornitoreViewComponent } from './detail-fornitore/detail-fornitore-view/detail-fornitore-view.component';
import { FornitoreComponent } from './fornitore.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchFornitoreResidComponent,
    SearchFornitoreResidAdvancedComponent,
    //detail component
    DetailFornitoreComponent,
    DetailFornitoreEditComponent,
    DetailFornitoreViewComponent,
    //tabs component
    TabsFornitoreComponent,
    DialogListFornitoreComponent,
    TabProdottoEditFeComponent,
    TabProdottoViewComponent,
    //delete component
    DeleteFornitoreDialog,
    //entity component
    FornitoreComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        FornitoreRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class FornitoreModule {}

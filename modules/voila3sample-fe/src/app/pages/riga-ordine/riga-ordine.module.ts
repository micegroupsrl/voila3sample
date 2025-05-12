import { NgModule } from '@angular/core';
import { SearchRigaOrdineResidComponent } from 'src/app/pages/search/search-riga-ordine-resid/search-riga-ordine-resid.component';
import { SearchRigaOrdineResidAdvancedComponent } from 'src/app/pages/search/search-riga-ordine-resid-advanced/search-riga-ordine-resid-advanced.component';
import { DetailRigaOrdineComponent, DeleteRigaOrdineDialog } from './detail-riga-ordine/detail-riga-ordine.component';
import { TabsRigaOrdineComponent } from './detail-riga-ordine/tabs-riga-ordine/tabs-riga-ordine.component';
import { RigaOrdineRoutingModule } from './riga-ordine-routing.module';
import { DialogListRigaOrdineComponent } from '../dialog/dialog-list-riga-ordine/dialog-list-riga-ordine.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailRigaOrdineEditComponent } from './detail-riga-ordine/detail-riga-ordine-edit/detail-riga-ordine-edit.component';
import { DetailRigaOrdineViewComponent } from './detail-riga-ordine/detail-riga-ordine-view/detail-riga-ordine-view.component';
import { RigaOrdineComponent } from './riga-ordine.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchRigaOrdineResidComponent,
    SearchRigaOrdineResidAdvancedComponent,
    //detail component
    DetailRigaOrdineComponent,
    DetailRigaOrdineEditComponent,
    DetailRigaOrdineViewComponent,
    //tabs component
    TabsRigaOrdineComponent,
    DialogListRigaOrdineComponent,
    //delete component
    DeleteRigaOrdineDialog,
    //entity component
    RigaOrdineComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        RigaOrdineRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class RigaOrdineModule {}

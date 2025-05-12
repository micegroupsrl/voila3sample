import { NgModule } from '@angular/core';
import { SearchPrivilegeResidComponent } from 'src/app/pages/search/search-privilege-resid/search-privilege-resid.component';
import { SearchPrivilegeResidAdvancedComponent } from 'src/app/pages/search/search-privilege-resid-advanced/search-privilege-resid-advanced.component';
import { DetailPrivilegeComponent, DeletePrivilegeDialog } from './detail-privilege/detail-privilege.component';
import { TabsPrivilegeComponent } from './detail-privilege/tabs-privilege/tabs-privilege.component';
import { TabPrivilegePerRoleEditFeComponent } from './detail-privilege/tabs-privilege/tab-privilege-per-role-edit-fe/tab-privilege-per-role-edit-fe.component';
import { TabPrivilegePerRoleViewComponent } from './detail-privilege/tabs-privilege/tab-privilege-per-role-view/tab-privilege-per-role-view.component';
import { PrivilegeRoutingModule } from './privilege-routing.module';
import { DialogListPrivilegeComponent } from '../dialog/dialog-list-privilege/dialog-list-privilege.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailPrivilegeEditComponent } from './detail-privilege/detail-privilege-edit/detail-privilege-edit.component';
import { DetailPrivilegeViewComponent } from './detail-privilege/detail-privilege-view/detail-privilege-view.component';
import { PrivilegeComponent } from './privilege.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchPrivilegeResidComponent,
    SearchPrivilegeResidAdvancedComponent,
    //detail component
    DetailPrivilegeComponent,
    DetailPrivilegeEditComponent,
    DetailPrivilegeViewComponent,
    //tabs component
    TabsPrivilegeComponent,
    DialogListPrivilegeComponent,
    TabPrivilegePerRoleEditFeComponent,
    TabPrivilegePerRoleViewComponent,
    //delete component
    DeletePrivilegeDialog,
    //entity component
    PrivilegeComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        PrivilegeRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class PrivilegeModule {}

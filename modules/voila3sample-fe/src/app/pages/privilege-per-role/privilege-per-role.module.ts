import { NgModule } from '@angular/core';
import { SearchPrivilegePerRoleResidComponent } from 'src/app/pages/search/search-privilege-per-role-resid/search-privilege-per-role-resid.component';
import { SearchPrivilegePerRoleResidAdvancedComponent } from 'src/app/pages/search/search-privilege-per-role-resid-advanced/search-privilege-per-role-resid-advanced.component';
import { DetailPrivilegePerRoleComponent, DeletePrivilegePerRoleDialog } from './detail-privilege-per-role/detail-privilege-per-role.component';
import { TabsPrivilegePerRoleComponent } from './detail-privilege-per-role/tabs-privilege-per-role/tabs-privilege-per-role.component';
import { PrivilegePerRoleRoutingModule } from './privilege-per-role-routing.module';
import { DialogListPrivilegePerRoleComponent } from '../dialog/dialog-list-privilege-per-role/dialog-list-privilege-per-role.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailPrivilegePerRoleEditComponent } from './detail-privilege-per-role/detail-privilege-per-role-edit/detail-privilege-per-role-edit.component';
import { DetailPrivilegePerRoleViewComponent } from './detail-privilege-per-role/detail-privilege-per-role-view/detail-privilege-per-role-view.component';
import { PrivilegePerRoleComponent } from './privilege-per-role.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchPrivilegePerRoleResidComponent,
    SearchPrivilegePerRoleResidAdvancedComponent,
    //detail component
    DetailPrivilegePerRoleComponent,
    DetailPrivilegePerRoleEditComponent,
    DetailPrivilegePerRoleViewComponent,
    //tabs component
    TabsPrivilegePerRoleComponent,
    DialogListPrivilegePerRoleComponent,
    //delete component
    DeletePrivilegePerRoleDialog,
    //entity component
    PrivilegePerRoleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        PrivilegePerRoleRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class PrivilegePerRoleModule {}

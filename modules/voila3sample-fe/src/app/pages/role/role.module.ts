import { NgModule } from '@angular/core';
import { SearchRoleResidComponent } from 'src/app/pages/search/search-role-resid/search-role-resid.component';
import { SearchRoleResidAdvancedComponent } from 'src/app/pages/search/search-role-resid-advanced/search-role-resid-advanced.component';
import { DetailRoleComponent, DeleteRoleDialog } from './detail-role/detail-role.component';
import { TabsRoleComponent } from './detail-role/tabs-role/tabs-role.component';
import { TabPrivilegePerRoleEditFeComponent } from './detail-role/tabs-role/tab-privilege-per-role-edit-fe/tab-privilege-per-role-edit-fe.component';
import { TabPrivilegePerRoleViewComponent } from './detail-role/tabs-role/tab-privilege-per-role-view/tab-privilege-per-role-view.component';
import { TabRolePerUserEditFeComponent } from './detail-role/tabs-role/tab-role-per-user-edit-fe/tab-role-per-user-edit-fe.component';
import { TabRolePerUserViewComponent } from './detail-role/tabs-role/tab-role-per-user-view/tab-role-per-user-view.component';
import { TabRoleRoleChildEditFeComponent } from './detail-role/tabs-role/tab-role-role-child-edit-fe/tab-role-role-child-edit-fe.component';
import { TabRoleRoleChildViewComponent } from './detail-role/tabs-role/tab-role-role-child-view/tab-role-role-child-view.component';
import { RoleRoutingModule } from './role-routing.module';
import { DialogListRoleComponent } from '../dialog/dialog-list-role/dialog-list-role.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailRoleEditComponent } from './detail-role/detail-role-edit/detail-role-edit.component';
import { DetailRoleViewComponent } from './detail-role/detail-role-view/detail-role-view.component';
import { RoleComponent } from './role.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchRoleResidComponent,
    SearchRoleResidAdvancedComponent,
    //detail component
    DetailRoleComponent,
    DetailRoleEditComponent,
    DetailRoleViewComponent,
    //tabs component
    TabsRoleComponent,
    DialogListRoleComponent,
    TabPrivilegePerRoleEditFeComponent,
    TabPrivilegePerRoleViewComponent,
    TabRolePerUserEditFeComponent,
    TabRolePerUserViewComponent,
    TabRoleRoleChildEditFeComponent,
    TabRoleRoleChildViewComponent,
    //delete component
    DeleteRoleDialog,
    //entity component
    RoleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        RoleRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class RoleModule {}

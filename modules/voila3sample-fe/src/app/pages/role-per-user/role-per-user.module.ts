import { NgModule } from '@angular/core';
import { SearchRolePerUserResidComponent } from 'src/app/pages/search/search-role-per-user-resid/search-role-per-user-resid.component';
import { SearchRolePerUserResidAdvancedComponent } from 'src/app/pages/search/search-role-per-user-resid-advanced/search-role-per-user-resid-advanced.component';
import { DetailRolePerUserComponent, DeleteRolePerUserDialog } from './detail-role-per-user/detail-role-per-user.component';
import { TabsRolePerUserComponent } from './detail-role-per-user/tabs-role-per-user/tabs-role-per-user.component';
import { RolePerUserRoutingModule } from './role-per-user-routing.module';
import { DialogListRolePerUserComponent } from '../dialog/dialog-list-role-per-user/dialog-list-role-per-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailRolePerUserEditComponent } from './detail-role-per-user/detail-role-per-user-edit/detail-role-per-user-edit.component';
import { DetailRolePerUserViewComponent } from './detail-role-per-user/detail-role-per-user-view/detail-role-per-user-view.component';
import { RolePerUserComponent } from './role-per-user.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchRolePerUserResidComponent,
    SearchRolePerUserResidAdvancedComponent,
    //detail component
    DetailRolePerUserComponent,
    DetailRolePerUserEditComponent,
    DetailRolePerUserViewComponent,
    //tabs component
    TabsRolePerUserComponent,
    DialogListRolePerUserComponent,
    //delete component
    DeleteRolePerUserDialog,
    //entity component
    RolePerUserComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        RolePerUserRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class RolePerUserModule {}

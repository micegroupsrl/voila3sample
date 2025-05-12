import { NgModule } from '@angular/core';
import { SearchUserResidComponent } from 'src/app/pages/search/search-user-resid/search-user-resid.component';
import { SearchUserResidAdvancedComponent } from 'src/app/pages/search/search-user-resid-advanced/search-user-resid-advanced.component';
import { DetailUserComponent, DeleteUserDialog } from './detail-user/detail-user.component';
import { TabsUserComponent } from './detail-user/tabs-user/tabs-user.component';
import { TabRolePerUserEditFeComponent } from './detail-user/tabs-user/tab-role-per-user-edit-fe/tab-role-per-user-edit-fe.component';
import { TabRolePerUserViewComponent } from './detail-user/tabs-user/tab-role-per-user-view/tab-role-per-user-view.component';
import { UserRoutingModule } from './user-routing.module';
import { DialogListUserComponent } from '../dialog/dialog-list-user/dialog-list-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailUserEditComponent } from './detail-user/detail-user-edit/detail-user-edit.component';
import { DetailUserViewComponent } from './detail-user/detail-user-view/detail-user-view.component';
import { UserComponent } from './user.component';

/**
 * You can put here all the components related to this entity.
 */

const COMPONENTS = [
    //search component
    SearchUserResidComponent,
    SearchUserResidAdvancedComponent,
    //detail component
    DetailUserComponent,
    DetailUserEditComponent,
    DetailUserViewComponent,
    //tabs component
    TabsUserComponent,
    DialogListUserComponent,
    TabRolePerUserEditFeComponent,
    TabRolePerUserViewComponent,
    //delete component
    DeleteUserDialog,
    //entity component
    UserComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        UserRoutingModule,
        //shared moudule for use all the shared component
        SharedModule
    ]
})
export class UserModule {}

import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { TabsRolePerUserComponent } from '../tabs-role-per-user/tabs-role-per-user.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { RolePerUserGroupApiService } from '../../../services/services-role-per-user/role-per-user-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-role-per-user-edit',
    templateUrl: './detail-role-per-user-edit.component.html',
    styleUrls: ['./detail-role-per-user-edit.component.scss']
})
export class DetailRolePerUserEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsRolePerUserComponent) tabsRolePerUser!: TabsRolePerUserComponent;

    @Input()
    public rolePerUserForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public rolePerUser!: IRolePerUser;

    public roleList!: IRole[];
    public userList!: IUser[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private rolePerUserGroupApiService: RolePerUserGroupApiService
    ) {
        super();
    }

    ngOnInit() {
        this.getParentsList();
    }

    /**
     * Open Dialog.
     */
    /**
     * Get the list of parents.
     */
    private getParentsList(): void {
        this.getRoleList();
        this.getUserList();
    }

    public getRoleList(): void {
        if (!this.roleList) {
            this.rolePerUserGroupApiService.role.getRoleByCriteria().subscribe(data => {
                this.roleList = getListForDropdowns(data);
            });
        }
    }
    public getUserList(): void {
        if (!this.userList) {
            this.rolePerUserGroupApiService.user.getUserByCriteria().subscribe(data => {
                this.userList = getListForDropdowns(data);
            });
        }
    }
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    /**
     * Return the tabs value for the current entity.
     */
    public getTabsValue() {
        return this.tabsRolePerUser.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['rolePerUser'];
        if (entityChanges?.currentValue) {
            this.rolePerUser = entityChanges.currentValue;
            this.patchValueForm(this.rolePerUser);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.rolePerUserForm.getRawValue();
    }

    public patchValueForm(rolePerUser: IRolePerUser) {
        this.rolePerUserForm.patchValue({
            theRoleObjectKey: rolePerUser.theRoleObjectKey,
            theRoleObjectTitle: rolePerUser.theRoleObjectTitle,
            theUserObjectKey: rolePerUser.theUserObjectKey,
            theUserObjectTitle: rolePerUser.theUserObjectTitle
        });
    }
}

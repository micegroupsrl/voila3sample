import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { TabsPrivilegePerRoleComponent } from '../tabs-privilege-per-role/tabs-privilege-per-role.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { PrivilegePerRoleGroupApiService } from '../../../services/services-privilege-per-role/privilege-per-role-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-privilege-per-role-edit',
    templateUrl: './detail-privilege-per-role-edit.component.html',
    styleUrls: ['./detail-privilege-per-role-edit.component.scss']
})
export class DetailPrivilegePerRoleEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsPrivilegePerRoleComponent) tabsPrivilegePerRole!: TabsPrivilegePerRoleComponent;

    @Input()
    public privilegePerRoleForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public privilegePerRole!: IPrivilegePerRole;

    public roleList!: IRole[];
    public privilegeList!: IPrivilege[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private privilegePerRoleGroupApiService: PrivilegePerRoleGroupApiService
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
        this.getPrivilegeList();
    }

    public getRoleList(): void {
        if (!this.roleList) {
            this.privilegePerRoleGroupApiService.role.getRoleByCriteria().subscribe(data => {
                this.roleList = getListForDropdowns(data);
            });
        }
    }
    public getPrivilegeList(): void {
        if (!this.privilegeList) {
            this.privilegePerRoleGroupApiService.privilege.getPrivilegeByCriteria().subscribe(data => {
                this.privilegeList = getListForDropdowns(data);
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
        return this.tabsPrivilegePerRole.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['privilegePerRole'];
        if (entityChanges?.currentValue) {
            this.privilegePerRole = entityChanges.currentValue;
            this.patchValueForm(this.privilegePerRole);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.privilegePerRoleForm.getRawValue();
    }

    public patchValueForm(privilegePerRole: IPrivilegePerRole) {
        this.privilegePerRoleForm.patchValue({
            theRoleObjectKey: privilegePerRole.theRoleObjectKey,
            theRoleObjectTitle: privilegePerRole.theRoleObjectTitle,
            thePrivilegeObjectKey: privilegePerRole.thePrivilegeObjectKey,
            thePrivilegeObjectTitle: privilegePerRole.thePrivilegeObjectTitle
        });
    }
}

import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { TabsRoleComponent } from '../tabs-role/tabs-role.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { RoleGroupApiService } from '../../../services/services-role/role-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-role-edit',
    templateUrl: './detail-role-edit.component.html',
    styleUrls: ['./detail-role-edit.component.scss']
})
export class DetailRoleEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsRoleComponent) tabsRole!: TabsRoleComponent;

    @Input()
    public roleForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public role!: IRole;

    public roleRoleGroupList!: IRole[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private roleGroupApiService: RoleGroupApiService
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
        this.getRoleRoleGroupList();
    }

    public getRoleRoleGroupList(): void {
        if (!this.roleRoleGroupList) {
            this.roleGroupApiService.role.getRoleByCriteria().subscribe(data => {
                this.roleRoleGroupList = getListForDropdowns(data);
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
        return this.tabsRole.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['role'];
        if (entityChanges?.currentValue) {
            this.role = entityChanges.currentValue;
            this.patchValueForm(this.role);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.roleForm.getRawValue();
    }

    public patchValueForm(role: IRole) {
        this.roleForm.patchValue({
            roleId: role.roleId,
            name: role.name,

            theRoleRoleGroupObjectKey: role.theRoleRoleGroupObjectKey,
            theRoleRoleGroupObjectTitle: role.theRoleRoleGroupObjectTitle
        });
        this.roleForm.get('roleId')?.disable();
    }
}

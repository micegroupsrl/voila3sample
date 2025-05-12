import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { PrivilegePerRoleGroupApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-group-api.service';

import { IRole } from 'src/app/pages/interfaces/role.interface';

import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-privilege-per-role-resid',
    templateUrl: './search-privilege-per-role-resid.component.html',
    styleUrls: ['./search-privilege-per-role-resid.component.scss']
})
export class SearchPrivilegePerRoleResidComponent extends BaseSearchComponent implements OnInit {
    searchPrivilegePerRoleForm!: FormGroup;

    public roleList: IRole[] = [];
    public privilegeList: IPrivilege[] = [];
    constructor(
        public dialogRef: MatDialogRef<SearchPrivilegePerRoleResidComponent>,
        private privilegePerRoleGroupApiService: PrivilegePerRoleGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchPrivilegePerRoleForm = this.fb.group({
            roleId: [],
            privilegeIdDa: [],
            privilegeIdA: [],

            idRole: [],
            idPrivilege: []
        });
        this.getParentsList();

        const formValues = {
            roleId: this.data.roleId,
            privilegeIdDa: this.data.privilegeIdDa,
            privilegeIdA: this.data.privilegeIdA,
            idRole: this.data.idRole,
            idPrivilege: this.data.idPrivilege
        };

        this.searchPrivilegePerRoleForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchPrivilegePerRole = this.searchPrivilegePerRoleForm.value;

        if (searchPrivilegePerRole) {
            filterBuild = filterBuild

                .andLike('privilegePerRoleKey.roleId', searchPrivilegePerRole.roleId)
                .andBetween('privilegePerRoleKey.privilegeId', searchPrivilegePerRole.privilegeIdDa, searchPrivilegePerRole.privilegeIdA)
                .andEquals('theRole.roleId', searchPrivilegePerRole.idRole)
                .andEquals('thePrivilege.privilegeId', searchPrivilegePerRole.idPrivilege);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchPrivilegePerRoleForm.reset();
    }
    /**
     * Close the filter dialog.
     */
    close(): void {
        this.dialogRef.close();
    }
    /**
     * Sumbit the filter value for the search.
     */
    onSubmit() {
        this.data = this.searchPrivilegePerRoleForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getRoleList(): void {
        this.privilegePerRoleGroupApiService.role.getRoleByCriteria().subscribe(data => {
            this.roleList = getListForDropdowns(data);
        });
    }
    public getPrivilegeList(): void {
        this.privilegePerRoleGroupApiService.privilege.getPrivilegeByCriteria().subscribe(data => {
            this.privilegeList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getRoleList();

        this.getPrivilegeList();
    }
}

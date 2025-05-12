import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RoleGroupApiService } from 'src/app/pages/services/services-role/role-group-api.service';
import { IRole } from 'src/app/pages/interfaces/role.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-role-resid',
    templateUrl: './search-role-resid.component.html',
    styleUrls: ['./search-role-resid.component.scss']
})
export class SearchRoleResidComponent extends BaseSearchComponent implements OnInit {
    searchRoleForm!: FormGroup;

    public roleList: IRole[] = [];
    constructor(
        public dialogRef: MatDialogRef<SearchRoleResidComponent>,
        private roleGroupApiService: RoleGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchRoleForm = this.fb.group({
            roleId: [],
            name: [],

            theRoleRoleGroup: []
        });
        this.getParentsList();

        const formValues = {
            roleId: this.data.roleId,

            name: this.data.name,
            theRoleRoleGroup: this.data.theRoleRoleGroup
        };

        this.searchRoleForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchRole = this.searchRoleForm.value;

        if (searchRole) {
            filterBuild = filterBuild
                .andLike('roleId.roleId', searchRole.roleId)

                .andLike('name', searchRole.name)
                .andEquals('theRoleRoleGroup', searchRole.theRoleRoleGroup);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchRoleForm.reset();
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
        this.data = this.searchRoleForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getRoleList(): void {
        this.roleGroupApiService.role.getRoleByCriteria().subscribe(data => {
            this.roleList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getRoleList();
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RolePerUserGroupApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-group-api.service';

import { IRole } from 'src/app/pages/interfaces/role.interface';

import { IUser } from 'src/app/pages/interfaces/user.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-role-per-user-resid',
    templateUrl: './search-role-per-user-resid.component.html',
    styleUrls: ['./search-role-per-user-resid.component.scss']
})
export class SearchRolePerUserResidComponent extends BaseSearchComponent implements OnInit {
    searchRolePerUserForm!: FormGroup;

    public roleList: IRole[] = [];
    public userList: IUser[] = [];
    constructor(
        public dialogRef: MatDialogRef<SearchRolePerUserResidComponent>,
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchRolePerUserForm = this.fb.group({
            roleId: [],
            userIdDa: [],
            userIdA: [],

            idRole: [],
            idUser: []
        });
        this.getParentsList();

        const formValues = {
            roleId: this.data.roleId,
            userIdDa: this.data.userIdDa,
            userIdA: this.data.userIdA,
            idRole: this.data.idRole,
            idUser: this.data.idUser
        };

        this.searchRolePerUserForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchRolePerUser = this.searchRolePerUserForm.value;

        if (searchRolePerUser) {
            filterBuild = filterBuild

                .andLike('rolePerUserKey.roleId', searchRolePerUser.roleId)
                .andBetween('rolePerUserKey.userId', searchRolePerUser.userIdDa, searchRolePerUser.userIdA)
                .andEquals('theRole.roleId', searchRolePerUser.idRole)
                .andEquals('theUser.userId', searchRolePerUser.idUser);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchRolePerUserForm.reset();
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
        this.data = this.searchRolePerUserForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getRoleList(): void {
        this.rolePerUserGroupApiService.role.getRoleByCriteria().subscribe(data => {
            this.roleList = getListForDropdowns(data);
        });
    }
    public getUserList(): void {
        this.rolePerUserGroupApiService.user.getUserByCriteria().subscribe(data => {
            this.userList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getRoleList();

        this.getUserList();
    }
}

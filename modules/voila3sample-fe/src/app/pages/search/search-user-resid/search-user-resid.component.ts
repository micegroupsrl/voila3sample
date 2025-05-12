import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-user-resid',
    templateUrl: './search-user-resid.component.html',
    styleUrls: ['./search-user-resid.component.scss']
})
export class SearchUserResidComponent extends BaseSearchComponent implements OnInit {
    searchUserForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchUserResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchUserForm = this.fb.group({
            userIdDa: [],
            userIdA: [],
            email: [],
            password: [],
            username: []
        });

        const formValues = {
            userIdDa: this.data.userIdDa,
            userIdA: this.data.userIdA,

            email: this.data.email,
            password: this.data.password,
            username: this.data.username
        };

        this.searchUserForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchUser = this.searchUserForm.value;

        if (searchUser) {
            filterBuild = filterBuild
                .andBetween('userId', searchUser.userIdDa, searchUser.userIdA)

                .andLike('email', searchUser.email)
                .andLike('password', searchUser.password)
                .andLike('username', searchUser.username);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchUserForm.reset();
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
        this.data = this.searchUserForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

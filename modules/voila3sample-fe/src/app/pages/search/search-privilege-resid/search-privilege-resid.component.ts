import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-privilege-resid',
    templateUrl: './search-privilege-resid.component.html',
    styleUrls: ['./search-privilege-resid.component.scss']
})
export class SearchPrivilegeResidComponent extends BaseSearchComponent implements OnInit {
    searchPrivilegeForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchPrivilegeResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchPrivilegeForm = this.fb.group({
            privilegeIdDa: [],
            privilegeIdA: [],
            name: [],
            description: []
        });

        const formValues = {
            privilegeIdDa: this.data.privilegeIdDa,
            privilegeIdA: this.data.privilegeIdA,

            name: this.data.name,
            description: this.data.description
        };

        this.searchPrivilegeForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchPrivilege = this.searchPrivilegeForm.value;

        if (searchPrivilege) {
            filterBuild = filterBuild
                .andBetween('privilegeId', searchPrivilege.privilegeIdDa, searchPrivilege.privilegeIdA)

                .andLike('name', searchPrivilege.name)
                .andLike('description', searchPrivilege.description);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchPrivilegeForm.reset();
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
        this.data = this.searchPrivilegeForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

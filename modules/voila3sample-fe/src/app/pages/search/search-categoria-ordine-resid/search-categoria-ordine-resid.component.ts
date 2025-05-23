import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-categoria-ordine-resid',
    templateUrl: './search-categoria-ordine-resid.component.html',
    styleUrls: ['./search-categoria-ordine-resid.component.scss']
})
export class SearchCategoriaOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchCategoriaOrdineForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchCategoriaOrdineResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchCategoriaOrdineForm = this.fb.group({
            idCatOrdineDa: [],
            idCatOrdineA: []
        });

        const formValues = {
            idCatOrdineDa: this.data.idCatOrdineDa,
            idCatOrdineA: this.data.idCatOrdineA
        };

        this.searchCategoriaOrdineForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchCategoriaOrdine = this.searchCategoriaOrdineForm.value;

        if (searchCategoriaOrdine) {
            filterBuild = filterBuild.andBetween('idCatOrdine', searchCategoriaOrdine.idCatOrdineDa, searchCategoriaOrdine.idCatOrdineA);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchCategoriaOrdineForm.reset();
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
        this.data = this.searchCategoriaOrdineForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

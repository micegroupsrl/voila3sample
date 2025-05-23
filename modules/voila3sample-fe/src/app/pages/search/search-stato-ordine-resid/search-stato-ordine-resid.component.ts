import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-stato-ordine-resid',
    templateUrl: './search-stato-ordine-resid.component.html',
    styleUrls: ['./search-stato-ordine-resid.component.scss']
})
export class SearchStatoOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchStatoOrdineForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchStatoOrdineResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchStatoOrdineForm = this.fb.group({
            idStatoOrdineDa: [],
            idStatoOrdineA: [],
            descrizione: []
        });

        const formValues = {
            idStatoOrdineDa: this.data.idStatoOrdineDa,
            idStatoOrdineA: this.data.idStatoOrdineA,

            descrizione: this.data.descrizione
        };

        this.searchStatoOrdineForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchStatoOrdine = this.searchStatoOrdineForm.value;

        if (searchStatoOrdine) {
            filterBuild = filterBuild
                .andBetween('idStatoOrdine', searchStatoOrdine.idStatoOrdineDa, searchStatoOrdine.idStatoOrdineA)

                .andLike('descrizione', searchStatoOrdine.descrizione);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchStatoOrdineForm.reset();
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
        this.data = this.searchStatoOrdineForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

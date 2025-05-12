import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-prodotto-resid',
    templateUrl: './search-prodotto-resid.component.html',
    styleUrls: ['./search-prodotto-resid.component.scss']
})
export class SearchProdottoResidComponent extends BaseSearchComponent implements OnInit {
    searchProdottoForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchProdottoResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchProdottoForm = this.fb.group({
            idProdottoDa: [],
            idProdottoA: [],
            nomeProdotto: []
        });

        const formValues = {
            idProdottoDa: this.data.idProdottoDa,
            idProdottoA: this.data.idProdottoA,

            nomeProdotto: this.data.nomeProdotto
        };

        this.searchProdottoForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchProdotto = this.searchProdottoForm.value;

        if (searchProdotto) {
            filterBuild = filterBuild
                .andBetween('idProdotto', searchProdotto.idProdottoDa, searchProdotto.idProdottoA)

                .andLike('nomeProdotto', searchProdotto.nomeProdotto);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchProdottoForm.reset();
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
        this.data = this.searchProdottoForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

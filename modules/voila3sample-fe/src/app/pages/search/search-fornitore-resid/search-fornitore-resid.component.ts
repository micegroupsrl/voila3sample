import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-fornitore-resid',
    templateUrl: './search-fornitore-resid.component.html',
    styleUrls: ['./search-fornitore-resid.component.scss']
})
export class SearchFornitoreResidComponent extends BaseSearchComponent implements OnInit {
    searchFornitoreForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchFornitoreResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchFornitoreForm = this.fb.group({
            idPersonaDa: [],
            idPersonaA: [],
            cf: [],
            piva: [],
            nome: [],
            cognome: [],
            email: [],
            telefono: []
        });

        const formValues = {
            idPersonaDa: this.data.idPersonaDa,
            idPersonaA: this.data.idPersonaA,
            cf: this.data.cf,

            piva: this.data.piva,
            nome: this.data.nome,
            cognome: this.data.cognome,
            email: this.data.email,
            telefono: this.data.telefono
        };

        this.searchFornitoreForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchFornitore = this.searchFornitoreForm.value;

        if (searchFornitore) {
            filterBuild = filterBuild
                .andBetween('idPersona.idPersona', searchFornitore.idPersonaDa, searchFornitore.idPersonaA)
                .andLike('idPersona.cf', searchFornitore.cf)

                .andLike('piva', searchFornitore.piva)
                .andLike('nome', searchFornitore.nome)
                .andLike('cognome', searchFornitore.cognome)
                .andLike('email', searchFornitore.email)
                .andLike('telefono', searchFornitore.telefono);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchFornitoreForm.reset();
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
        this.data = this.searchFornitoreForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

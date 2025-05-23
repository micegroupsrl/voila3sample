import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-cliente-resid',
    templateUrl: './search-cliente-resid.component.html',
    styleUrls: ['./search-cliente-resid.component.scss']
})
export class SearchClienteResidComponent extends BaseSearchComponent implements OnInit {
    searchClienteForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SearchClienteResidComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchClienteForm = this.fb.group({
            idPersonaDa: [],
            idPersonaA: [],
            cf: [],
            puntiDa: [],
            puntiA: [],
            nome: [],
            cognome: [],
            email: [],
            telefono: []
        });

        const formValues = {
            idPersonaDa: this.data.idPersonaDa,
            idPersonaA: this.data.idPersonaA,
            cf: this.data.cf,

            puntiDa: this.data.puntiDa,
            puntiA: this.data.puntiA,
            nome: this.data.nome,
            cognome: this.data.cognome,
            email: this.data.email,
            telefono: this.data.telefono
        };

        this.searchClienteForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchCliente = this.searchClienteForm.value;

        if (searchCliente) {
            filterBuild = filterBuild
                .andBetween('idPersona.idPersona', searchCliente.idPersonaDa, searchCliente.idPersonaA)
                .andLike('idPersona.cf', searchCliente.cf)

                .andBetween('punti', searchCliente.puntiDa, searchCliente.puntiA)
                .andLike('nome', searchCliente.nome)
                .andLike('cognome', searchCliente.cognome)
                .andLike('email', searchCliente.email)
                .andLike('telefono', searchCliente.telefono);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchClienteForm.reset();
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
        this.data = this.searchClienteForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
}

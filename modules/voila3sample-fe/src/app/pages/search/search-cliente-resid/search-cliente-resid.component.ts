import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
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

    // Variabili per abilitare/disabilitare l'ora
    public createdDateDaDisabled: boolean = true;
    public createdDateADisabled: boolean = true;
    public lastModifiedDateDaDisabled: boolean = true;
    public lastModifiedDateADisabled: boolean = true;
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
            codiceFiscale: [],
            email: [],
            telefono: [],
            indirizzo: [],
            createdBy: [],
            lastModifiedBy: [],
            createdDateDa: [],
            createdDateA: [],
            lastModifiedDateDa: [],
            lastModifiedDateA: []
        });

        const formValues = {
            idPersonaDa: this.data.idPersonaDa,
            idPersonaA: this.data.idPersonaA,
            codiceFiscale: this.data.codiceFiscale,

            email: this.data.email,
            telefono: this.data.telefono,
            indirizzo: this.data.indirizzo,
            createdBy: this.data.createdBy,
            lastModifiedBy: this.data.lastModifiedBy,
            createdDateDa: this.data.createdDateDa,
            createdDateA: this.data.createdDateA,
            lastModifiedDateDa: this.data.lastModifiedDateDa,
            lastModifiedDateA: this.data.lastModifiedDateA
        };
        this.changeTimeCreatedDateDa(this.searchClienteForm.get('createdDateDa'));
        this.changeTimeCreatedDateA(this.searchClienteForm.get('createdDateA'));
        this.changeTimeLastModifiedDateDa(this.searchClienteForm.get('lastModifiedDateDa'));
        this.changeTimeLastModifiedDateA(this.searchClienteForm.get('lastModifiedDateA'));

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
                .andLike('idPersona.codiceFiscale', searchCliente.codiceFiscale)

                .andLike('email', searchCliente.email)
                .andLike('telefono', searchCliente.telefono)
                .andLike('indirizzo', searchCliente.indirizzo)
                .andLike('createdBy', searchCliente.createdBy)
                .andLike('lastModifiedBy', searchCliente.lastModifiedBy)
                .andBetween('createdDate', searchCliente.createdDateDa, searchCliente.createdDateA)
                .andBetween('lastModifiedDate', searchCliente.lastModifiedDateDa, searchCliente.lastModifiedDateA);
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

    // Metodi che abilitano/disabilitano il toggle dell'ora
    changeTimeCreatedDateDa(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.createdDateDaDisabled = this.onDateChange(result, date);
        });
    }

    changeTimeCreatedDateA(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.createdDateADisabled = this.onDateChange(result, date);
        });
    }
    changeTimeLastModifiedDateDa(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.lastModifiedDateDaDisabled = this.onDateChange(result, date);
        });
    }

    changeTimeLastModifiedDateA(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.lastModifiedDateADisabled = this.onDateChange(result, date);
        });
    }
    // Metodo che controlla lo stato della form data
    onDateChange(result: string, fullDate: AbstractControl<any, any> | null): boolean {
        if (result == 'VALID' && fullDate?.get('date')?.value != null) {
            fullDate?.get('time')?.enable({ emitEvent: false });
            return false;
        } else {
            fullDate?.get('time')?.disable({ emitEvent: false });
            return true;
        }
    }
}

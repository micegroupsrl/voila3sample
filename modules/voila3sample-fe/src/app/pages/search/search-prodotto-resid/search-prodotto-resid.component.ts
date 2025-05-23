import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { ProdottoGroupApiService } from 'src/app/pages/services/services-prodotto/prodotto-group-api.service';

import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-prodotto-resid',
    templateUrl: './search-prodotto-resid.component.html',
    styleUrls: ['./search-prodotto-resid.component.scss']
})
export class SearchProdottoResidComponent extends BaseSearchComponent implements OnInit {
    searchProdottoForm!: FormGroup;

    public fornitoreList: IFornitore[] = [];
    // Variabili per abilitare/disabilitare l'ora
    public createdDateDaDisabled: boolean = true;
    public createdDateADisabled: boolean = true;
    public lastModifiedDateDaDisabled: boolean = true;
    public lastModifiedDateADisabled: boolean = true;
    constructor(
        public dialogRef: MatDialogRef<SearchProdottoResidComponent>,
        private prodottoGroupApiService: ProdottoGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchProdottoForm = this.fb.group({
            idProdottoDa: [],
            idProdottoA: [],
            descrizione: [],
            createdBy: [],
            lastModifiedBy: [],
            createdDateDa: [],
            createdDateA: [],
            lastModifiedDateDa: [],
            lastModifiedDateA: [],

            theFornitore: []
        });
        this.getParentsList();

        const formValues = {
            idProdottoDa: this.data.idProdottoDa,
            idProdottoA: this.data.idProdottoA,

            descrizione: this.data.descrizione,
            createdBy: this.data.createdBy,
            lastModifiedBy: this.data.lastModifiedBy,
            createdDateDa: this.data.createdDateDa,
            createdDateA: this.data.createdDateA,
            lastModifiedDateDa: this.data.lastModifiedDateDa,
            lastModifiedDateA: this.data.lastModifiedDateA,
            theFornitore: this.data.theFornitore
        };
        this.changeTimeCreatedDateDa(this.searchProdottoForm.get('createdDateDa'));
        this.changeTimeCreatedDateA(this.searchProdottoForm.get('createdDateA'));
        this.changeTimeLastModifiedDateDa(this.searchProdottoForm.get('lastModifiedDateDa'));
        this.changeTimeLastModifiedDateA(this.searchProdottoForm.get('lastModifiedDateA'));

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

                .andLike('descrizione', searchProdotto.descrizione)
                .andLike('createdBy', searchProdotto.createdBy)
                .andLike('lastModifiedBy', searchProdotto.lastModifiedBy)
                .andBetween('createdDate', searchProdotto.createdDateDa, searchProdotto.createdDateA)
                .andBetween('lastModifiedDate', searchProdotto.lastModifiedDateDa, searchProdotto.lastModifiedDateA)
                .andEquals('theFornitore', searchProdotto.theFornitore);
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
    public getFornitoreList(): void {
        this.prodottoGroupApiService.fornitore.getFornitoreByCriteria().subscribe(data => {
            this.fornitoreList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getFornitoreList();
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

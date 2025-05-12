import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';

import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';

import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-riga-ordine-resid',
    templateUrl: './search-riga-ordine-resid.component.html',
    styleUrls: ['./search-riga-ordine-resid.component.scss']
})
export class SearchRigaOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchRigaOrdineForm!: FormGroup;

    public prodottoList: IProdotto[] = [];
    public ordineList: IOrdine[] = [];
    constructor(
        public dialogRef: MatDialogRef<SearchRigaOrdineResidComponent>,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchRigaOrdineForm = this.fb.group({
            idProdottoDa: [],
            idProdottoA: [],
            idOrdineDa: [],
            idOrdineA: [],
            quantitaDa: [],
            quantitaA: [],

            idProdotto: [],
            idOrdine: []
        });
        this.getParentsList();

        const formValues = {
            idProdottoDa: this.data.idProdottoDa,
            idProdottoA: this.data.idProdottoA,
            idOrdineDa: this.data.idOrdineDa,
            idOrdineA: this.data.idOrdineA,
            quantitaDa: this.data.quantitaDa,
            quantitaA: this.data.quantitaA,
            idProdotto: this.data.idProdotto,
            idOrdine: this.data.idOrdine
        };

        this.searchRigaOrdineForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchRigaOrdine = this.searchRigaOrdineForm.value;

        if (searchRigaOrdine) {
            filterBuild = filterBuild

                .andBetween('rigaOrdineKey.idProdotto', searchRigaOrdine.idProdottoDa, searchRigaOrdine.idProdottoA)
                .andBetween('rigaOrdineKey.idOrdine', searchRigaOrdine.idOrdineDa, searchRigaOrdine.idOrdineA)
                .andBetween('quantita', searchRigaOrdine.quantitaDa, searchRigaOrdine.quantitaA)
                .andEquals('theProdotto.idProdotto', searchRigaOrdine.idProdotto)
                .andEquals('theOrdine.idOrdine', searchRigaOrdine.idOrdine);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchRigaOrdineForm.reset();
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
        this.data = this.searchRigaOrdineForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getProdottoList(): void {
        this.rigaOrdineGroupApiService.prodotto.getProdottoByCriteria().subscribe(data => {
            this.prodottoList = getListForDropdowns(data);
        });
    }
    public getOrdineList(): void {
        this.rigaOrdineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getProdottoList();

        this.getOrdineList();
    }
}

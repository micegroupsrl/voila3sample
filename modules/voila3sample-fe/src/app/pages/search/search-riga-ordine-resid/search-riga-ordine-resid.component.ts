import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';

import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';

import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-riga-ordine-resid',
    templateUrl: './search-riga-ordine-resid.component.html',
    styleUrls: ['./search-riga-ordine-resid.component.scss']
})
export class SearchRigaOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchRigaOrdineForm!: FormGroup;

    public ordineList: IOrdine[] = [];
    public prodottoList: IProdotto[] = [];
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
            idOrdineDa: [],
            idOrdineA: [],
            idProdottoDa: [],
            idProdottoA: [],
            qtaDa: [],
            qtaA: [],

            idOrdine: [],
            idProdotto: []
        });
        this.getParentsList();

        const formValues = {
            idOrdineDa: this.data.idOrdineDa,
            idOrdineA: this.data.idOrdineA,
            idProdottoDa: this.data.idProdottoDa,
            idProdottoA: this.data.idProdottoA,
            qtaDa: this.data.qtaDa,
            qtaA: this.data.qtaA,
            idOrdine: this.data.idOrdine,
            idProdotto: this.data.idProdotto
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

                .andBetween('rigaOrdineKey.idOrdine', searchRigaOrdine.idOrdineDa, searchRigaOrdine.idOrdineA)
                .andBetween('rigaOrdineKey.idProdotto', searchRigaOrdine.idProdottoDa, searchRigaOrdine.idProdottoA)
                .andBetween('qta', searchRigaOrdine.qtaDa, searchRigaOrdine.qtaA)
                .andEquals('theOrdine.idOrdine', searchRigaOrdine.idOrdine)
                .andEquals('theProdotto.idProdotto', searchRigaOrdine.idProdotto);
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
    public getOrdineList(): void {
        this.rigaOrdineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
        });
    }
    public getProdottoList(): void {
        this.rigaOrdineGroupApiService.prodotto.getProdottoByCriteria().subscribe(data => {
            this.prodottoList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getOrdineList();

        this.getProdottoList();
    }
}

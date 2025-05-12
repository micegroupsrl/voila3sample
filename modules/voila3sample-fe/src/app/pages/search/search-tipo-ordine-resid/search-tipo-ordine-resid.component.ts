import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { TipoOrdineGroupApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-group-api.service';

import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-tipo-ordine-resid',
    templateUrl: './search-tipo-ordine-resid.component.html',
    styleUrls: ['./search-tipo-ordine-resid.component.scss']
})
export class SearchTipoOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchTipoOrdineForm!: FormGroup;

    public categoriaOrdineList: ICategoriaOrdine[] = [];
    constructor(
        public dialogRef: MatDialogRef<SearchTipoOrdineResidComponent>,
        private tipoOrdineGroupApiService: TipoOrdineGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchTipoOrdineForm = this.fb.group({
            idTipoOrdineDa: [],
            idTipoOrdineA: [],
            annoTipologiaDa: [],
            annoTipologiaA: [],
            idCategoriaOrdineDa: [],
            idCategoriaOrdineA: [],
            nomeOrdine: [],

            idCategoriaOrdine: []
        });
        this.getParentsList();

        const formValues = {
            idTipoOrdineDa: this.data.idTipoOrdineDa,
            idTipoOrdineA: this.data.idTipoOrdineA,
            annoTipologiaDa: this.data.annoTipologiaDa,
            annoTipologiaA: this.data.annoTipologiaA,

            idCategoriaOrdineDa: this.data.idCategoriaOrdineDa,
            idCategoriaOrdineA: this.data.idCategoriaOrdineA,
            nomeOrdine: this.data.nomeOrdine,
            idCategoriaOrdine: this.data.idCategoriaOrdine
        };

        this.searchTipoOrdineForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchTipoOrdine = this.searchTipoOrdineForm.value;

        if (searchTipoOrdine) {
            filterBuild = filterBuild
                .andBetween('idTipoOrdine', searchTipoOrdine.idTipoOrdineDa, searchTipoOrdine.idTipoOrdineA)
                .andBetween('annoTipologia', searchTipoOrdine.annoTipologiaDa, searchTipoOrdine.annoTipologiaA)

                .andBetween('tipoOrdineKey.idCategoriaOrdine', searchTipoOrdine.idCategoriaOrdineDa, searchTipoOrdine.idCategoriaOrdineA)
                .andLike('nomeOrdine', searchTipoOrdine.nomeOrdine)
                .andEquals('theCategoriaOrdine.idCategoriaOrdine', searchTipoOrdine.idCategoriaOrdine);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchTipoOrdineForm.reset();
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
        this.data = this.searchTipoOrdineForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getCategoriaOrdineList(): void {
        this.tipoOrdineGroupApiService.categoriaOrdine.getCategoriaOrdineByCriteria().subscribe(data => {
            this.categoriaOrdineList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getCategoriaOrdineList();
    }
}

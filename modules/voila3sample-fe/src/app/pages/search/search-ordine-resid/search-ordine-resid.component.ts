import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';

import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-ordine-resid',
    templateUrl: './search-ordine-resid.component.html',
    styleUrls: ['./search-ordine-resid.component.scss']
})
export class SearchOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchOrdineForm!: FormGroup;

    public clienteList: ICliente[] = [];
    public tipoOrdineList: ITipoOrdine[] = [];
    public ordineList: IOrdine[] = [];
    // Variabili per abilitare/disabilitare l'ora
    public createdDateDaDisabled: boolean = true;
    public createdDateADisabled: boolean = true;
    public lastModifiedDateDaDisabled: boolean = true;
    public lastModifiedDateADisabled: boolean = true;
    constructor(
        public dialogRef: MatDialogRef<SearchOrdineResidComponent>,
        private ordineGroupApiService: OrdineGroupApiService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }

    ngOnInit(): void {
        this.searchOrdineForm = this.fb.group({
            idOrdineDa: [],
            idOrdineA: [],
            dataOrdineDa: [],
            dataOrdineA: [],
            tempoOrdineDa: [],
            tempoOrdineA: [],
            createdBy: [],
            lastModifiedBy: [],
            createdDateDa: [],
            createdDateA: [],
            lastModifiedDateDa: [],
            lastModifiedDateA: [],

            theCliente: [],
            theTipoOrdine: [],
            theOrdineAggregato: []
        });
        this.getParentsList();

        const formValues = {
            idOrdineDa: this.data.idOrdineDa,
            idOrdineA: this.data.idOrdineA,

            dataOrdineDa: this.data.dataOrdineDa,
            dataOrdineA: this.data.dataOrdineA,
            tempoOrdineDa: this.data.tempoOrdineDa,
            tempoOrdineA: this.data.tempoOrdineA,
            createdBy: this.data.createdBy,
            lastModifiedBy: this.data.lastModifiedBy,
            createdDateDa: this.data.createdDateDa,
            createdDateA: this.data.createdDateA,
            lastModifiedDateDa: this.data.lastModifiedDateDa,
            lastModifiedDateA: this.data.lastModifiedDateA,
            theCliente: this.data.theCliente,
            theTipoOrdine: this.data.theTipoOrdine,
            theOrdineAggregato: this.data.theOrdineAggregato
        };
        this.changeTimeCreatedDateDa(this.searchOrdineForm.get('createdDateDa'));
        this.changeTimeCreatedDateA(this.searchOrdineForm.get('createdDateA'));
        this.changeTimeLastModifiedDateDa(this.searchOrdineForm.get('lastModifiedDateDa'));
        this.changeTimeLastModifiedDateA(this.searchOrdineForm.get('lastModifiedDateA'));

        this.searchOrdineForm.patchValue(formValues);
    }

    /**
     * Build the filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchOrdine = this.searchOrdineForm.value;

        if (searchOrdine) {
            filterBuild = filterBuild
                .andBetween('idOrdine', searchOrdine.idOrdineDa, searchOrdine.idOrdineA)

                .andBetween('dataOrdine', searchOrdine.dataOrdineDa, searchOrdine.dataOrdineA)
                .andBetween('tempoOrdine', searchOrdine.tempoOrdineDa, searchOrdine.tempoOrdineA)
                .andLike('createdBy', searchOrdine.createdBy)
                .andLike('lastModifiedBy', searchOrdine.lastModifiedBy)
                .andBetween('createdDate', searchOrdine.createdDateDa, searchOrdine.createdDateA)
                .andBetween('lastModifiedDate', searchOrdine.lastModifiedDateDa, searchOrdine.lastModifiedDateA)
                .andEquals('theCliente', searchOrdine.theCliente)
                .andEquals('theTipoOrdine', searchOrdine.theTipoOrdine)
                .andEquals('theOrdineAggregato', searchOrdine.theOrdineAggregato);
        }
        return filterBuild.value();
    }
    /**
     * Clear all the filter fields.
     */
    clear(): void {
        this.searchOrdineForm.reset();
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
        this.data = this.searchOrdineForm.value;

        let result = {
            data: this.data,
            filter: this.getFilter()
        };

        this.dialogRef.close(result);
    }
    public getClienteList(): void {
        this.ordineGroupApiService.cliente.getClienteByCriteria().subscribe(data => {
            this.clienteList = getListForDropdowns(data);
        });
    }
    public getTipoOrdineList(): void {
        this.ordineGroupApiService.tipoOrdine.getTipoOrdineByCriteria().subscribe(data => {
            this.tipoOrdineList = getListForDropdowns(data);
        });
    }
    public getOrdineList(): void {
        this.ordineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getClienteList();

        this.getTipoOrdineList();

        this.getOrdineList();
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

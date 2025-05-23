import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';

import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';

import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { BaseSearchComponent } from 'src/app/shared/base/base-search.component';

@Component({
    selector: 'app-search-ordine-resid',
    templateUrl: './search-ordine-resid.component.html',
    styleUrls: ['./search-ordine-resid.component.scss']
})
export class SearchOrdineResidComponent extends BaseSearchComponent implements OnInit {
    searchOrdineForm!: FormGroup;

    public statoOrdineList: IStatoOrdine[] = [];
    public tipoOrdineList: ITipoOrdine[] = [];
    public clienteList: ICliente[] = [];
    public ordineList: IOrdine[] = [];
    // Variabili per abilitare/disabilitare l'ora
    public datetimeDaDisabled: boolean = true;
    public datetimeADisabled: boolean = true;
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
            descrizione: [],
            datetimeDa: [],
            datetimeA: [],
            dateDa: [],
            dateA: [],
            timeDa: [],
            timeA: [],
            createdBy: [],
            lastModifiedBy: [],
            createdDateDa: [],
            createdDateA: [],
            lastModifiedDateDa: [],
            lastModifiedDateA: [],

            idStatoOrdine: [],
            theTipoOrdine: [],
            theCliente: [],
            theOrdineAggregato: []
        });
        this.getParentsList();

        const formValues = {
            idOrdineDa: this.data.idOrdineDa,
            idOrdineA: this.data.idOrdineA,

            descrizione: this.data.descrizione,
            datetimeDa: this.data.datetimeDa,
            datetimeA: this.data.datetimeA,
            dateDa: this.data.dateDa,
            dateA: this.data.dateA,
            timeDa: this.data.timeDa,
            timeA: this.data.timeA,
            createdBy: this.data.createdBy,
            lastModifiedBy: this.data.lastModifiedBy,
            createdDateDa: this.data.createdDateDa,
            createdDateA: this.data.createdDateA,
            lastModifiedDateDa: this.data.lastModifiedDateDa,
            lastModifiedDateA: this.data.lastModifiedDateA,
            idStatoOrdine: this.data.idStatoOrdine,
            theTipoOrdine: this.data.theTipoOrdine,
            theCliente: this.data.theCliente,
            theOrdineAggregato: this.data.theOrdineAggregato
        };
        this.changeTimeDatetimeDa(this.searchOrdineForm.get('datetimeDa'));
        this.changeTimeDatetimeA(this.searchOrdineForm.get('datetimeA'));
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

                .andLike('descrizione', searchOrdine.descrizione)
                .andBetween('datetime', searchOrdine.datetimeDa, searchOrdine.datetimeA)
                .andBetween('date', searchOrdine.dateDa, searchOrdine.dateA)
                .andBetween('time', searchOrdine.timeDa, searchOrdine.timeA)
                .andLike('createdBy', searchOrdine.createdBy)
                .andLike('lastModifiedBy', searchOrdine.lastModifiedBy)
                .andBetween('createdDate', searchOrdine.createdDateDa, searchOrdine.createdDateA)
                .andBetween('lastModifiedDate', searchOrdine.lastModifiedDateDa, searchOrdine.lastModifiedDateA)
                .andEquals('theStatoOrdine.idStatoOrdine', searchOrdine.idStatoOrdine)
                .andEquals('theTipoOrdine', searchOrdine.theTipoOrdine)
                .andEquals('theCliente', searchOrdine.theCliente)
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
    public getStatoOrdineList(): void {
        this.ordineGroupApiService.statoOrdine.getStatoOrdineByCriteria().subscribe(data => {
            this.statoOrdineList = getListForDropdowns(data);
        });
    }
    public getTipoOrdineList(): void {
        this.ordineGroupApiService.tipoOrdine.getTipoOrdineByCriteria().subscribe(data => {
            this.tipoOrdineList = getListForDropdowns(data);
        });
    }
    public getClienteList(): void {
        this.ordineGroupApiService.cliente.getClienteByCriteria().subscribe(data => {
            this.clienteList = getListForDropdowns(data);
        });
    }
    public getOrdineList(): void {
        this.ordineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getStatoOrdineList();

        this.getTipoOrdineList();

        this.getClienteList();

        this.getOrdineList();
    }

    // Metodi che abilitano/disabilitano il toggle dell'ora
    changeTimeDatetimeDa(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.datetimeDaDisabled = this.onDateChange(result, date);
        });
    }

    changeTimeDatetimeA(date: AbstractControl<any, any> | null) {
        date?.statusChanges.subscribe(result => {
            this.datetimeADisabled = this.onDateChange(result, date);
        });
    }
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

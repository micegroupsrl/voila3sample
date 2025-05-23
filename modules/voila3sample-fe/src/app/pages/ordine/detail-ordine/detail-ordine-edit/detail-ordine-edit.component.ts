import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { TabsOrdineComponent } from '../tabs-ordine/tabs-ordine.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { OrdineGroupApiService } from '../../../services/services-ordine/ordine-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-ordine-edit',
    templateUrl: './detail-ordine-edit.component.html',
    styleUrls: ['./detail-ordine-edit.component.scss']
})
export class DetailOrdineEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsOrdineComponent) tabsOrdine!: TabsOrdineComponent;

    @Input()
    public ordineForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public ordine!: IOrdine;

    public statoOrdineList!: IStatoOrdine[];
    public tipoOrdineList!: ITipoOrdine[];
    public clienteList!: ICliente[];
    public ordineAggregatoList!: IOrdine[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private ordineGroupApiService: OrdineGroupApiService
    ) {
        super();
    }

    ngOnInit() {
        this.getParentsList();
    }

    /**
     * Open Dialog.
     */
    /**
     * Get the list of parents.
     */
    private getParentsList(): void {
        this.getStatoOrdineList();
        this.getTipoOrdineList();
        this.getClienteList();
        this.getOrdineAggregatoList();
    }

    public getStatoOrdineList(): void {
        if (!this.statoOrdineList) {
            this.ordineGroupApiService.statoOrdine.getStatoOrdineByCriteria().subscribe(data => {
                this.statoOrdineList = getListForDropdowns(data);
            });
        }
    }
    public getTipoOrdineList(): void {
        if (!this.tipoOrdineList) {
            this.ordineGroupApiService.tipoOrdine.getTipoOrdineByCriteria().subscribe(data => {
                this.tipoOrdineList = getListForDropdowns(data);
            });
        }
    }
    public getClienteList(): void {
        if (!this.clienteList) {
            this.ordineGroupApiService.cliente.getClienteByCriteria().subscribe(data => {
                this.clienteList = getListForDropdowns(data);
            });
        }
    }
    public getOrdineAggregatoList(): void {
        if (!this.ordineAggregatoList) {
            this.ordineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
                this.ordineAggregatoList = getListForDropdowns(data);
            });
        }
    }
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    /**
     * Return the tabs value for the current entity.
     */
    public getTabsValue() {
        return this.tabsOrdine.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['ordine'];
        if (entityChanges?.currentValue) {
            this.ordine = entityChanges.currentValue;
            this.patchValueForm(this.ordine);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.ordineForm.getRawValue();
    }

    public patchValueForm(ordine: IOrdine) {
        this.ordineForm.patchValue({
            idOrdine: ordine.idOrdine,
            descrizione: ordine.descrizione,
            datetime: ordine.datetime,
            date: ordine.date,
            time: ordine.time,

            theStatoOrdineObjectKey: ordine.theStatoOrdineObjectKey,
            theStatoOrdineObjectTitle: ordine.theStatoOrdineObjectTitle,
            theTipoOrdineObjectKey: ordine.theTipoOrdineObjectKey,
            theTipoOrdineObjectTitle: ordine.theTipoOrdineObjectTitle,
            theClienteObjectKey: ordine.theClienteObjectKey,
            theClienteObjectTitle: ordine.theClienteObjectTitle,
            theOrdineAggregatoObjectKey: ordine.theOrdineAggregatoObjectKey,
            theOrdineAggregatoObjectTitle: ordine.theOrdineAggregatoObjectTitle
        });
        this.ordineForm.get('idOrdine')?.disable();
    }
}

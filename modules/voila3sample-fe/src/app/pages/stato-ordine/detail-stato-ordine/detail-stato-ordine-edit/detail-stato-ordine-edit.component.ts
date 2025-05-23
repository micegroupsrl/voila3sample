import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { TabsStatoOrdineComponent } from '../tabs-stato-ordine/tabs-stato-ordine.component';
import { StatoOrdineGroupApiService } from '../../../services/services-stato-ordine/stato-ordine-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-stato-ordine-edit',
    templateUrl: './detail-stato-ordine-edit.component.html',
    styleUrls: ['./detail-stato-ordine-edit.component.scss']
})
export class DetailStatoOrdineEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsStatoOrdineComponent) tabsStatoOrdine!: TabsStatoOrdineComponent;

    @Input()
    public statoOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public statoOrdine!: IStatoOrdine;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private statoOrdineGroupApiService: StatoOrdineGroupApiService
    ) {
        super();
    }

    /**
     * Open Dialog.
     */
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
        return this.tabsStatoOrdine.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['statoOrdine'];
        if (entityChanges?.currentValue) {
            this.statoOrdine = entityChanges.currentValue;
            this.patchValueForm(this.statoOrdine);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.statoOrdineForm.getRawValue();
    }

    public patchValueForm(statoOrdine: IStatoOrdine) {
        this.statoOrdineForm.patchValue({
            idStatoOrdine: statoOrdine.idStatoOrdine,
            descrizione: statoOrdine.descrizione
        });
        this.statoOrdineForm.get('idStatoOrdine')?.disable();
    }
}

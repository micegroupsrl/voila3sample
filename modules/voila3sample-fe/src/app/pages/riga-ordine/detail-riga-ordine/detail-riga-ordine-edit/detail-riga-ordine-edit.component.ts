import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { TabsRigaOrdineComponent } from '../tabs-riga-ordine/tabs-riga-ordine.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { RigaOrdineGroupApiService } from '../../../services/services-riga-ordine/riga-ordine-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-riga-ordine-edit',
    templateUrl: './detail-riga-ordine-edit.component.html',
    styleUrls: ['./detail-riga-ordine-edit.component.scss']
})
export class DetailRigaOrdineEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsRigaOrdineComponent) tabsRigaOrdine!: TabsRigaOrdineComponent;

    @Input()
    public rigaOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public rigaOrdine!: IRigaOrdine;

    public ordineList!: IOrdine[];
    public prodottoList!: IProdotto[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService
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
        this.getOrdineList();
        this.getProdottoList();
    }

    public getOrdineList(): void {
        if (!this.ordineList) {
            this.rigaOrdineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
                this.ordineList = getListForDropdowns(data);
            });
        }
    }
    public getProdottoList(): void {
        if (!this.prodottoList) {
            this.rigaOrdineGroupApiService.prodotto.getProdottoByCriteria().subscribe(data => {
                this.prodottoList = getListForDropdowns(data);
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
        return this.tabsRigaOrdine.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['rigaOrdine'];
        if (entityChanges?.currentValue) {
            this.rigaOrdine = entityChanges.currentValue;
            this.patchValueForm(this.rigaOrdine);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.rigaOrdineForm.getRawValue();
    }

    public patchValueForm(rigaOrdine: IRigaOrdine) {
        this.rigaOrdineForm.patchValue({
            qta: rigaOrdine.qta,

            theOrdineObjectKey: rigaOrdine.theOrdineObjectKey,
            theOrdineObjectTitle: rigaOrdine.theOrdineObjectTitle,
            theProdottoObjectKey: rigaOrdine.theProdottoObjectKey,
            theProdottoObjectTitle: rigaOrdine.theProdottoObjectTitle
        });
    }
}

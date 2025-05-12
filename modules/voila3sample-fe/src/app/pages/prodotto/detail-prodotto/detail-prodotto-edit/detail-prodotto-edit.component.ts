import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { TabsProdottoComponent } from '../tabs-prodotto/tabs-prodotto.component';
import { ProdottoGroupApiService } from '../../../services/services-prodotto/prodotto-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-prodotto-edit',
    templateUrl: './detail-prodotto-edit.component.html',
    styleUrls: ['./detail-prodotto-edit.component.scss']
})
export class DetailProdottoEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsProdottoComponent) tabsProdotto!: TabsProdottoComponent;

    @Input()
    public prodottoForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public prodotto!: IProdotto;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private prodottoGroupApiService: ProdottoGroupApiService
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
        return this.tabsProdotto.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['prodotto'];
        if (entityChanges?.currentValue) {
            this.prodotto = entityChanges.currentValue;
            this.patchValueForm(this.prodotto);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.prodottoForm.getRawValue();
    }

    public patchValueForm(prodotto: IProdotto) {
        this.prodottoForm.patchValue({
            idProdotto: prodotto.idProdotto,
            nomeProdotto: prodotto.nomeProdotto
        });
        this.prodottoForm.get('idProdotto')?.disable();
    }
}

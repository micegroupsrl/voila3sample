import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { TabsCategoriaOrdineComponent } from '../tabs-categoria-ordine/tabs-categoria-ordine.component';
import { CategoriaOrdineGroupApiService } from '../../../services/services-categoria-ordine/categoria-ordine-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-categoria-ordine-edit',
    templateUrl: './detail-categoria-ordine-edit.component.html',
    styleUrls: ['./detail-categoria-ordine-edit.component.scss']
})
export class DetailCategoriaOrdineEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsCategoriaOrdineComponent) tabsCategoriaOrdine!: TabsCategoriaOrdineComponent;

    @Input()
    public categoriaOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public categoriaOrdine!: ICategoriaOrdine;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private categoriaOrdineGroupApiService: CategoriaOrdineGroupApiService
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
        return this.tabsCategoriaOrdine.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['categoriaOrdine'];
        if (entityChanges?.currentValue) {
            this.categoriaOrdine = entityChanges.currentValue;
            this.patchValueForm(this.categoriaOrdine);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.categoriaOrdineForm.getRawValue();
    }

    public patchValueForm(categoriaOrdine: ICategoriaOrdine) {
        this.categoriaOrdineForm.patchValue({
            idCatOrdine: categoriaOrdine.idCatOrdine
        });
        this.categoriaOrdineForm.get('idCatOrdine')?.disable();
    }
}

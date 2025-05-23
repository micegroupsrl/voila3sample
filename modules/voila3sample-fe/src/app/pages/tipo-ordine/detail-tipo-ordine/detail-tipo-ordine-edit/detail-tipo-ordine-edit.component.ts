import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { TabsTipoOrdineComponent } from '../tabs-tipo-ordine/tabs-tipo-ordine.component';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { TipoOrdineGroupApiService } from '../../../services/services-tipo-ordine/tipo-ordine-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-tipo-ordine-edit',
    templateUrl: './detail-tipo-ordine-edit.component.html',
    styleUrls: ['./detail-tipo-ordine-edit.component.scss']
})
export class DetailTipoOrdineEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsTipoOrdineComponent) tabsTipoOrdine!: TabsTipoOrdineComponent;

    @Input()
    public tipoOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public tipoOrdine!: ITipoOrdine;

    public categoriaOrdineList!: ICategoriaOrdine[];

    constructor(
        private changeDetector: ChangeDetectorRef,
        private tipoOrdineGroupApiService: TipoOrdineGroupApiService
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
        this.getCategoriaOrdineList();
    }

    public getCategoriaOrdineList(): void {
        if (!this.categoriaOrdineList) {
            this.tipoOrdineGroupApiService.categoriaOrdine.getCategoriaOrdineByCriteria().subscribe(data => {
                this.categoriaOrdineList = getListForDropdowns(data);
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
        return this.tabsTipoOrdine.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['tipoOrdine'];
        if (entityChanges?.currentValue) {
            this.tipoOrdine = entityChanges.currentValue;
            this.patchValueForm(this.tipoOrdine);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.tipoOrdineForm.getRawValue();
    }

    public patchValueForm(tipoOrdine: ITipoOrdine) {
        this.tipoOrdineForm.patchValue({
            anno: tipoOrdine.anno,
            idTipoOrdine: tipoOrdine.idTipoOrdine,

            theCategoriaOrdineObjectKey: tipoOrdine.theCategoriaOrdineObjectKey,
            theCategoriaOrdineObjectTitle: tipoOrdine.theCategoriaOrdineObjectTitle
        });
        this.tipoOrdineForm.get('anno')?.disable();
        this.tipoOrdineForm.get('idTipoOrdine')?.disable();
    }
}

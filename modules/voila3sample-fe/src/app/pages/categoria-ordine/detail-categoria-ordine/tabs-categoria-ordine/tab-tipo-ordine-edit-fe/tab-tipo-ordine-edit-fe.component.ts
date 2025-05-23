import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TipoOrdineApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-api.service';
import { TipoOrdineGroupApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-tipo-ordine-edit-fe',
    templateUrl: './tab-tipo-ordine-edit-fe.component.html',
    styleUrls: ['./tab-tipo-ordine-edit-fe.component.scss']
})
export class TabTipoOrdineEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    displayedColumns: string[] = ['anno', 'idTipoOrdine', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theTipoOrdine!: FormArray;
    public form!: FormGroup;
    public formNewEntities!: FormGroup;
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /** Quando faccio loadData(object)
  in object.page so a che pagina sono e in object.pageSize so quanti oggetti ho per una pagina
  quindi, controllo prima se in itemPerPageMap.get(object.page) ho qualcosa, poi 
  */
    constructor(
        private fb: FormBuilder,
        private tipoOrdineApiService: TipoOrdineApiService,
        private tipoOrdineGroupApiService: TipoOrdineGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theTipoOrdine: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theTipoOrdine: this.fb.array([])
        });
        this.getParentsList();
        const object: PageObject = { page: 0, pageSize: this.pageSize };
        this.loadData(object);
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe(data => this.onSortChange(data));
    }
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageStatusChanges(changes);
    }

    onSortChange(data: Sort) {
        this.currentPage = 0;
        this.object.page = 0;
        this.getTheTipoOrdine.patchValue(sortFormArray(this.getTheTipoOrdine, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheTipoOrdine(): FormArray {
        return this.form.get('theTipoOrdine') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheTipoOrdine(): FormArray<FormGroup> {
        return this.formNewEntities.get('theTipoOrdine') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            anno: new FormControl(null),
            idTipoOrdine: new FormControl(null),
            theCategoriaOrdineObjectKey: new FormControl(this.entity?.objectKey!),
            theCategoriaOrdineObjectTitle: new FormControl(null),
            theOrdine: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: ITipoOrdine): FormGroup {
        return new FormGroup({
            anno: new FormControl({ value: data.anno, disabled: true }),
            idTipoOrdine: new FormControl({ value: data.idTipoOrdine, disabled: true }),
            theCategoriaOrdineObjectKey: new FormControl(data.theCategoriaOrdineObjectKey),
            theCategoriaOrdineObjectTitle: new FormControl(data.theCategoriaOrdineObjectTitle),
            theOrdine: new FormControl(data.theOrdine),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.tipoOrdineApiService.getTipoOrdineByCategoriaOrdine(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theTipoOrdine => {
                        this.form.setControl('theTipoOrdine', theTipoOrdine);
                    });
                    setTimeout(() => {
                        this.paginator.pageIndex = this.currentPage;
                        this.paginator.length = data.totalElements;
                    });
                    this.totalElements = data.totalElements;
                    this.isLoading = false;
                },
                () => {},
                () => {
                    this.isLoading = false;
                }
            );
        }
    }

    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
    }
    private managePageStatusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges?.currentValue) {
            this.getParentsList();
        }
    }

    /**
     * Manage entity changes.
     */
    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['entity'];
        const entity = this.setEntityChanged(entityChanges, this.entity);
        if (entity) {
            this.entity = entity;
            const object: PageObject = { page: 0 };
            this.loadData(object);
        }
    }
    /**
     * Set entity changes.
     */
    private setEntityChanged(entityChanges: SimpleChange, entity: any): any {
        if (entityChanges) {
            if (entityChanges.previousValue != undefined) {
                if (entityChanges.previousValue.objectKey != entityChanges.currentValue.objectKey) {
                    entity = entityChanges.currentValue;
                }
            }
        }
        return entity;
    }

    /**
     * Cotrollo Dialog.
     */

    /**
     * Parent List.
     */
    private getParentsList(): void {}

    public eliminaTipoOrdine(tipoOrdineForm: FormGroup) {
        tipoOrdineForm.disable();
        tipoOrdineForm.patchValue({ entityState: 'D' });
        console.log('entitystate tipoOrdine in elimina \n', tipoOrdineForm.get('entityState')?.value);
    }

    public ripristinaTipoOrdine(tipoOrdineForm: FormGroup) {
        tipoOrdineForm.enable();
        tipoOrdineForm.get('tipoOrdineKey')?.disable();
        tipoOrdineForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoTipoOrdine(tipoOrdineForm: FormGroup) {
        this.newTheTipoOrdine.controls = this.newTheTipoOrdine.controls.filter(u => u.get('tipoOrdineKey') !== tipoOrdineForm.get('tipoOrdineKey'));
    }

    public aggiungiTipoOrdine() {
        let tipoOrdineForm = this.createNewFormGroup();
        this.newTheTipoOrdine.controls = [...this.newTheTipoOrdine.controls, tipoOrdineForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): ITipoOrdine[] {
        let valueForm: ITipoOrdine[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const tipoOrdine of this.getTheTipoOrdine.controls) {
                const index = this.getTheTipoOrdine.controls.indexOf(tipoOrdine);
                if (tipoOrdine.dirty) {
                    if (!this.getTheTipoOrdine.at(index).get('entityState')?.value) {
                        this.getTheTipoOrdine.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theTipoOrdine);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theTipoOrdine);
        }
        return valueForm;
    }
}

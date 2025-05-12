import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrdineApiService } from 'src/app/pages/services/services-ordine/ordine-api.service';
import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-ordine-edit-fe',
    templateUrl: './tab-ordine-edit-fe.component.html',
    styleUrls: ['./tab-ordine-edit-fe.component.scss']
})
export class TabOrdineEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];

    displayedColumns: string[] = ['idOrdine', 'dataOrdine', 'tempoOrdine', 'theTipoOrdineObjectKey', 'theOrdineAggregatoObjectKey', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theOrdine!: FormArray;
    public tipoOrdineList!: ITipoOrdine[];
    public ordineAggregatoList!: ICliente[];
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
        private ordineApiService: OrdineApiService,
        private ordineGroupApiService: OrdineGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theOrdine: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theOrdine: this.fb.array([])
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
        this.getTheOrdine.patchValue(sortFormArray(this.getTheOrdine, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheOrdine(): FormArray {
        return this.form.get('theOrdine') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheOrdine(): FormArray<FormGroup> {
        return this.formNewEntities.get('theOrdine') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            idOrdine: new FormControl(null),
            dataOrdine: new FormControl(null),
            tempoOrdine: new FormControl(null),
            theClienteObjectKey: new FormControl(this.entity?.objectKey!),
            theClienteObjectTitle: new FormControl(null),
            theTipoOrdineObjectKey: new FormControl(null),
            theTipoOrdineObjectTitle: new FormControl(null),
            theOrdineAggregatoObjectKey: new FormControl(null),
            theOrdineAggregatoObjectTitle: new FormControl(null),
            theRigaOrdine: new FormControl(null),
            theOrdineFiglio: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IOrdine): FormGroup {
        return new FormGroup({
            idOrdine: new FormControl({ value: data.idOrdine, disabled: true }),
            dataOrdine: new FormControl(data.dataOrdine),
            tempoOrdine: new FormControl(data.tempoOrdine),
            theClienteObjectKey: new FormControl(data.theClienteObjectKey),
            theClienteObjectTitle: new FormControl(data.theClienteObjectTitle),
            theTipoOrdineObjectKey: new FormControl(data.theTipoOrdineObjectKey),
            theTipoOrdineObjectTitle: new FormControl(data.theTipoOrdineObjectTitle),
            theOrdineAggregatoObjectKey: new FormControl(data.theOrdineAggregatoObjectKey),
            theOrdineAggregatoObjectTitle: new FormControl(data.theOrdineAggregatoObjectTitle),
            theRigaOrdine: new FormControl(data.theRigaOrdine),
            theOrdineFiglio: new FormControl(data.theOrdineFiglio),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.ordineApiService.getOrdineByCliente(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theOrdine => {
                        this.form.setControl('theOrdine', theOrdine);
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

    public getTipoOrdineList(): void {
        if (!this.tipoOrdineList) {
            this.ordineGroupApiService.tipoOrdine.getTipoOrdineByCriteria().subscribe(data => {
                this.tipoOrdineList = getListForDropdowns(data);
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
    /**
     * Parent List.
     */
    private getParentsList(): void {
        this.getTipoOrdineList();
        this.getOrdineAggregatoList();
    }

    public eliminaOrdine(ordineForm: FormGroup) {
        ordineForm.disable();
        ordineForm.patchValue({ entityState: 'D' });
        console.log('entitystate ordine in elimina \n', ordineForm.get('entityState')?.value);
    }

    public ripristinaOrdine(ordineForm: FormGroup) {
        ordineForm.enable();
        ordineForm.get('idOrdine')?.disable();
        ordineForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoOrdine(ordineForm: FormGroup) {
        this.newTheOrdine.controls = this.newTheOrdine.controls.filter(u => u.get('idOrdine') !== ordineForm.get('idOrdine'));
    }

    public aggiungiOrdine() {
        let ordineForm = this.createNewFormGroup();
        this.newTheOrdine.controls = [...this.newTheOrdine.controls, ordineForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IOrdine[] {
        let valueForm: IOrdine[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const ordine of this.getTheOrdine.controls) {
                const index = this.getTheOrdine.controls.indexOf(ordine);
                if (ordine.dirty) {
                    if (!this.getTheOrdine.at(index).get('entityState')?.value) {
                        this.getTheOrdine.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theOrdine);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theOrdine);
        }
        return valueForm;
    }
}

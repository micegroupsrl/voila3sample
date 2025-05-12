import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RigaOrdineApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-api.service';
import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-riga-ordine-edit-fe',
    templateUrl: './tab-riga-ordine-edit-fe.component.html',
    styleUrls: ['./tab-riga-ordine-edit-fe.component.scss']
})
export class TabRigaOrdineEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];

    displayedColumns: string[] = ['quantita', 'theOrdineObjectKey', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theRigaOrdine!: FormArray;
    public ordineList!: IOrdine[];
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
        private rigaOrdineApiService: RigaOrdineApiService,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theRigaOrdine: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theRigaOrdine: this.fb.array([])
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
        this.getTheRigaOrdine.patchValue(sortFormArray(this.getTheRigaOrdine, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheRigaOrdine(): FormArray {
        return this.form.get('theRigaOrdine') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheRigaOrdine(): FormArray<FormGroup> {
        return this.formNewEntities.get('theRigaOrdine') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            quantita: new FormControl(null),
            theProdottoObjectKey: new FormControl(this.entity?.objectKey!),
            theProdottoObjectTitle: new FormControl(null),
            theOrdineObjectKey: new FormControl(null),
            theOrdineObjectTitle: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IRigaOrdine): FormGroup {
        return new FormGroup({
            quantita: new FormControl(data.quantita),
            theProdottoObjectKey: new FormControl(data.theProdottoObjectKey),
            theProdottoObjectTitle: new FormControl(data.theProdottoObjectTitle),
            theOrdineObjectKey: new FormControl(data.theOrdineObjectKey),
            theOrdineObjectTitle: new FormControl(data.theOrdineObjectTitle),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.rigaOrdineApiService.getRigaOrdineByProdotto(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theRigaOrdine => {
                        this.form.setControl('theRigaOrdine', theRigaOrdine);
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

    public getOrdineList(): void {
        if (!this.ordineList) {
            this.rigaOrdineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
                this.ordineList = getListForDropdowns(data);
            });
        }
    }
    /**
     * Parent List.
     */
    private getParentsList(): void {
        this.getOrdineList();
    }

    public eliminaRigaOrdine(rigaOrdineForm: FormGroup) {
        rigaOrdineForm.disable();
        rigaOrdineForm.patchValue({ entityState: 'D' });
        console.log('entitystate rigaOrdine in elimina \n', rigaOrdineForm.get('entityState')?.value);
    }

    public ripristinaRigaOrdine(rigaOrdineForm: FormGroup) {
        rigaOrdineForm.enable();
        rigaOrdineForm.get('rigaOrdineKey')?.disable();
        rigaOrdineForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoRigaOrdine(rigaOrdineForm: FormGroup) {
        this.newTheRigaOrdine.controls = this.newTheRigaOrdine.controls.filter(u => u.get('rigaOrdineKey') !== rigaOrdineForm.get('rigaOrdineKey'));
    }

    public aggiungiRigaOrdine() {
        let rigaOrdineForm = this.createNewFormGroup();
        this.newTheRigaOrdine.controls = [...this.newTheRigaOrdine.controls, rigaOrdineForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IRigaOrdine[] {
        let valueForm: IRigaOrdine[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const rigaOrdine of this.getTheRigaOrdine.controls) {
                const index = this.getTheRigaOrdine.controls.indexOf(rigaOrdine);
                if (rigaOrdine.dirty) {
                    if (!this.getTheRigaOrdine.at(index).get('entityState')?.value) {
                        this.getTheRigaOrdine.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theRigaOrdine);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theRigaOrdine);
        }
        return valueForm;
    }
}

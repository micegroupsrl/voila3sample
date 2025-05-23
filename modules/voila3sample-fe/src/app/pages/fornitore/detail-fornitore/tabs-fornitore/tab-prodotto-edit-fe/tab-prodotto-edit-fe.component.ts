import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProdottoApiService } from 'src/app/pages/services/services-prodotto/prodotto-api.service';
import { ProdottoGroupApiService } from 'src/app/pages/services/services-prodotto/prodotto-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-prodotto-edit-fe',
    templateUrl: './tab-prodotto-edit-fe.component.html',
    styleUrls: ['./tab-prodotto-edit-fe.component.scss']
})
export class TabProdottoEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    displayedColumns: string[] = ['idProdotto', 'descrizione', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theProdotto!: FormArray;
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
        private prodottoApiService: ProdottoApiService,
        private prodottoGroupApiService: ProdottoGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theProdotto: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theProdotto: this.fb.array([])
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
        this.getTheProdotto.patchValue(sortFormArray(this.getTheProdotto, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheProdotto(): FormArray {
        return this.form.get('theProdotto') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheProdotto(): FormArray<FormGroup> {
        return this.formNewEntities.get('theProdotto') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            idProdotto: new FormControl(null),
            descrizione: new FormControl(null),
            theFornitoreObjectKey: new FormControl(this.entity?.objectKey!),
            theFornitoreObjectTitle: new FormControl(null),
            theRigaOrdine: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IProdotto): FormGroup {
        return new FormGroup({
            idProdotto: new FormControl({ value: data.idProdotto, disabled: true }),
            descrizione: new FormControl(data.descrizione),
            theFornitoreObjectKey: new FormControl(data.theFornitoreObjectKey),
            theFornitoreObjectTitle: new FormControl(data.theFornitoreObjectTitle),
            theRigaOrdine: new FormControl(data.theRigaOrdine),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.prodottoApiService.getProdottoByFornitore(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theProdotto => {
                        this.form.setControl('theProdotto', theProdotto);
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

    public eliminaProdotto(prodottoForm: FormGroup) {
        prodottoForm.disable();
        prodottoForm.patchValue({ entityState: 'D' });
        console.log('entitystate prodotto in elimina \n', prodottoForm.get('entityState')?.value);
    }

    public ripristinaProdotto(prodottoForm: FormGroup) {
        prodottoForm.enable();
        prodottoForm.get('idProdotto')?.disable();
        prodottoForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoProdotto(prodottoForm: FormGroup) {
        this.newTheProdotto.controls = this.newTheProdotto.controls.filter(u => u.get('idProdotto') !== prodottoForm.get('idProdotto'));
    }

    public aggiungiProdotto() {
        let prodottoForm = this.createNewFormGroup();
        this.newTheProdotto.controls = [...this.newTheProdotto.controls, prodottoForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IProdotto[] {
        let valueForm: IProdotto[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const prodotto of this.getTheProdotto.controls) {
                const index = this.getTheProdotto.controls.indexOf(prodotto);
                if (prodotto.dirty) {
                    if (!this.getTheProdotto.at(index).get('entityState')?.value) {
                        this.getTheProdotto.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theProdotto);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theProdotto);
        }
        return valueForm;
    }
}

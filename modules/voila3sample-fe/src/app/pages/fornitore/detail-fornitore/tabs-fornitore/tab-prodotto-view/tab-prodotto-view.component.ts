import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProdottoApiService } from 'src/app/pages/services/services-prodotto/prodotto-api.service';
import { prodottoForm } from 'src/app/pages/forms/prodotto-form';
import { ProdottoGroupApiService } from 'src/app/pages/services/services-prodotto/prodotto-group-api.service';
import { PRODOTTO } from 'src/app/pages/costants/prodotto.constant';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { setOptions } from 'src/app/utilities/function/helper';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

@Component({
    selector: 'app-tab-prodotto-view',
    templateUrl: './tab-prodotto-view.component.html',
    styleUrls: ['./tab-prodotto-view.component.scss']
})
export class TabProdottoViewComponent implements OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    searchProdottoForm!: FormGroup;
    /**
     * filter intialization.
     */
    filters = '';

    /**
     * Columns displayed in the tab.
     */
    displayedColumns: string[] = [
        'idProdotto',
        'descrizione'
        /**
         * Key for Fornitore.
         */
    ];
    dataSource: MatTableDataSource<IProdotto> = new MatTableDataSource();

    @Input()
    entity!: any;

    public object: PageObject = {};

    /**
     * Create form and lists
     */
    public theProdotto!: FormArray;
    public form: FormGroup = prodottoForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private prodottoApiService: ProdottoApiService,
        private prodottoGroupApiService: ProdottoGroupApiService,
        public router: Router
    ) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(data => this.onSortChange(data));
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
    }

    /**
     * Load data.
     */
    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject, this.filters);
        if (this.entity) {
            this.prodottoApiService.getProdottoByFornitore(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    this.dataSource.data = data.content;
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
        this.object.page = this.currentPage;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
    }

    /**
     * Listen the tab sorting changes.
     */
    onSortChange(data: Sort) {
        this.currentPage = 0;
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.object.columnName = data.active;
        this.object.sortDirection = data.direction;
        this.loadData(this.object);
    }
    /**
     * Manage changes.
     */
    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['entity'];
        const entity = this.setEntityChanged(entityChanges, this.entity);
        if (entity) {
            this.entity = entity;
            const object: PageObject = { page: 0, pageSize: this.pageSize };
            this.loadData(object);
        }
        this.searchProdottoForm = this.formBuilder.group({
            descrizione: []
        });
    }
    /**
     * Set changes.
     */
    private setEntityChanged(entityChanges: SimpleChange, entity: any): any {
        if (entityChanges != undefined) {
            if (entityChanges.previousValue != undefined) {
                if (entityChanges.previousValue.objectKey != entityChanges.currentValue.objectKey) {
                    entity = entityChanges.currentValue;
                }
            }
        }
        return entity;
    }

    /**
     * Navigate to view path.
     */
    public navigateToView(id: number): void {
        const PATH_VIEW = '/view';
        let pathDetailView = PRODOTTO.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }
    /**
     * Quick Filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();
        const searchProdotto = this.searchProdottoForm.value;
        if (searchProdotto) {
            filterBuild = filterBuild.andLike('descrizione', searchProdotto.descrizione);
        }
        return filterBuild.value();
    }

    /**
     * Method for the quick search.
     */
    public onUp(): any {
        this.filters = this.getFilter();
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
    }
}

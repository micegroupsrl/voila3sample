import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdineApiService } from 'src/app/pages/services/services-ordine/ordine-api.service';
import { ordineForm } from 'src/app/pages/forms/ordine-form';
import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { ORDINE } from 'src/app/pages/costants/ordine.constant';
import { PageObject } from 'src/app/shared/page-object.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { setOptions } from 'src/app/utilities/function/helper';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

@Component({
    selector: 'app-tab-ordine-view',
    templateUrl: './tab-ordine-view.component.html',
    styleUrls: ['./tab-ordine-view.component.scss']
})
export class TabOrdineViewComponent implements OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];
    searchOrdineForm!: FormGroup;
    /**
     * filter intialization.
     */
    filters = '';

    /**
     * Columns displayed in the tab.
     */
    displayedColumns: string[] = [
        'idOrdine',
        'dataOrdine',
        'tempoOrdine',
        /**
         * Key for Cliente.
         */
        'theCliente.ThePersonaKey',

        /**
         * Key for TipoOrdine.
         */

        /**
         * Key for OrdineAggregato.
         */
        'theOrdineAggregato.idOrdine'
    ];
    dataSource: MatTableDataSource<IOrdine> = new MatTableDataSource();

    @Input()
    entity!: any;

    public object: PageObject = {};

    /**
     * Create form and lists
     */
    public theOrdine!: FormArray;
    public clienteList!: ICliente[];
    public ordineAggregatoList!: ITipoOrdine[];
    public form: FormGroup = ordineForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private ordineApiService: OrdineApiService,
        private ordineGroupApiService: OrdineGroupApiService,
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
            this.ordineApiService.getOrdineByTipoOrdine(this.entity?.objectKey!, options).subscribe(
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
        this.searchOrdineForm = this.formBuilder.group({
            createdBy: []
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
        let pathDetailView = ORDINE.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }
    /**
     * Quick Filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();
        const searchOrdine = this.searchOrdineForm.value;
        if (searchOrdine) {
            filterBuild = filterBuild.andLike('createdBy', searchOrdine.createdBy);
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

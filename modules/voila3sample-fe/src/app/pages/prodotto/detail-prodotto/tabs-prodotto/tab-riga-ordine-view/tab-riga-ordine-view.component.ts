import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RigaOrdineApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-api.service';
import { rigaOrdineForm } from 'src/app/pages/forms/riga-ordine-form';
import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';
import { RIGA_ORDINE } from 'src/app/pages/costants/riga-ordine.constant';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { setOptions } from 'src/app/utilities/function/helper';

@Component({
    selector: 'app-tab-riga-ordine-view',
    templateUrl: './tab-riga-ordine-view.component.html',
    styleUrls: ['./tab-riga-ordine-view.component.scss']
})
export class TabRigaOrdineViewComponent implements OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    /**
     * Columns displayed in the tab.
     */
    displayedColumns: string[] = [
        'qta',
        /**
         * Key for Ordine.
         */
        'theOrdine.idOrdine'

        /**
         * Key for Prodotto.
         */
    ];
    dataSource: MatTableDataSource<IRigaOrdine> = new MatTableDataSource();

    @Input()
    entity!: any;

    public object: PageObject = {};

    /**
     * Create form and lists
     */
    public theRigaOrdine!: FormArray;
    public ordineList!: IOrdine[];
    public form: FormGroup = rigaOrdineForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private rigaOrdineApiService: RigaOrdineApiService,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService,
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

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.rigaOrdineApiService.getRigaOrdineByProdotto(this.entity?.objectKey!, options).subscribe(
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
        let pathDetailView = RIGA_ORDINE.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }
}

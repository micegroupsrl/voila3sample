import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { IStatoOrdine } from '../interfaces/stato-ordine.interface';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SearchStatoOrdineResidComponent } from '../search/search-stato-ordine-resid/search-stato-ordine-resid.component';
import { SearchStatoOrdineResidAdvancedComponent } from '../search/search-stato-ordine-resid-advanced/search-stato-ordine-resid-advanced.component';
import { PageObject } from 'src/app/shared/page-object.interface';
import { setOptions } from 'src/app/utilities/function/helper';
import { STATO_ORDINE } from '../costants/stato-ordine.constant';
import { Router } from '@angular/router';
import { StatoOrdineApiService } from '../services/services-stato-ordine/stato-ordine-api.service';
import { StatoOrdineGroupApiService } from '../services/services-stato-ordine/stato-ordine-group-api.service';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { AppAuthGuard } from 'src/app/app.authguard';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { Permission } from 'src/app/utilities/pipe/utility-pipe';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-stato-ordine',
    templateUrl: './stato-ordine.component.html',
    styleUrls: ['./stato-ordine.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StatoOrdineComponent implements OnInit {
    ELEMENT_DATA: IStatoOrdine[] = [];
    searchStatoOrdineForm!: FormGroup;
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    Privileges = getPrivilegesEnum();

    public savedData: { filterType: string; apiType: string; orAnd: boolean; value: string }[] = [];

    /**
     * Displayed columns of the list.
     */

    displayedColumns: string[] = [
        'idStatoOrdine',
        'descrizione'
        /**
         * Parent.
         */
    ];
    dataSource: MatTableDataSource<IStatoOrdine> = new MatTableDataSource();
    clickedRows = new Set<IStatoOrdine>();

    public object: PageObject = {};

    //Dati della form
    public dataForm = {
        idStatoOrdine: null,
        descrizione: ''
    };

    /**
     * filter intialization.
     */
    filters = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private statoOrdineGroupApiService: StatoOrdineGroupApiService,
        public dialog: MatDialog,
        private statoOrdineApiService: StatoOrdineApiService,
        private router: Router,
        private fb: FormBuilder,
        private auth: AppAuthGuard
    ) {}

    ngOnInit() {
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);

        this.searchStatoOrdineForm = this.fb.group({
            descrizione: []
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(data => this.onSortChange(data));
    }

    /**
     * Load data list.
     */
    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject, this.filters);

        this.statoOrdineGroupApiService.statoOrdine.getStatoOrdineByCriteria(options).subscribe({
            next: (data: any) => {
                this.dataSource.data = data.content;
                setTimeout(() => {
                    this.paginator.pageIndex = this.currentPage;
                    this.paginator.length = data.totalElements;
                });

                this.isLoading = false;
            },

            error: err => {
                // Errore: gestire il caso d'errore
                console.error('Errore durante il caricamento dei dati:', err);
                this.isLoading = false;
            }
        });
    }

    /**
     * Load the list after page change.
     */
    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.object.page = this.currentPage;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
    }

    /**
     * Load the list after sorting change.
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
     * Print report method.
     */
    public printXlsxReport(): void {
        this.statoOrdineApiService.printXlsxReport();
    }

    /**
     * Search dialog.
     */
    openDialogResid() {
        let dialogRef = this.dialog.open(SearchStatoOrdineResidComponent, {
            data: this.dataForm,
            autoFocus: false,
            minWidth: '50vw'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                if (result.filter != undefined && result.data != undefined && this.filters != result.filter) {
                    this.filters = result.filter;
                    this.dataForm = result.data;
                    this.object.page = 0;
                    this.object.pageSize = this.pageSize;
                    this.loadData(this.object);
                }
            }
        });
    }

    /**
     * Advanced search dialog.
     */
    openDialogResidAdvanced() {
        let dialogRef = this.dialog.open(SearchStatoOrdineResidAdvancedComponent, {
            data: this.savedData,
            autoFocus: false,
            minWidth: '50vw'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                if (result.filter != undefined && result.data != undefined && this.filters != result.filter) {
                    this.filters = result.filter;
                    this.savedData = result.data;
                    this.object.page = 0;
                    this.object.pageSize = this.pageSize;
                    this.loadData(this.object);
                }
            }
        });
    }

    /**
     * Navigate to view page.
     */
    public navigateToView(id: number): void {
        const PATH_VIEW = '/view';
        let pathDetailView = STATO_ORDINE.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }

    /**
     * Quick Filter.
     */
    public getFilter(): any {
        let filterBuild = new FilterBuilder();

        const searchStatoOrdine = this.searchStatoOrdineForm.value;

        if (searchStatoOrdine) {
            filterBuild = filterBuild.andLike('descrizione', searchStatoOrdine.descrizione);
        }
        return filterBuild.value();
    }

    /**
     * Method for the quick search.
     */
    public onUp(): any {
        this.dataForm = this.searchStatoOrdineForm.value;
        this.filters = this.getFilter();
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
        console.log('filterBuild', this.getFilter());
    }

    public isClickable(privileges: any): any {
        if (environment.securityOn) {
            const permission = new Permission(this.auth);
            return permission.transform(privileges);
        } else return true;
    }
}

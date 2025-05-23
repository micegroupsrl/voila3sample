import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/pages/services/api-service.service';
import { PageObject } from 'src/app/shared/page-object.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { setOptions } from 'src/app/utilities/function/helper';
import { SearchTipoOrdineResidComponent } from '../../search/search-tipo-ordine-resid/search-tipo-ordine-resid.component';

@Component({
    selector: 'app-dialog-list-tipo-ordine',
    templateUrl: './dialog-list-tipo-ordine.component.html',
    styleUrls: ['./dialog-list-tipo-ordine.component.scss']
})
export class DialogListTipoOrdineComponent {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    displayedColumns: string[] = ['theTipoOrdineKey.anno', 'theTipoOrdineKey.idTipoOrdine'];
    dataSource: MatTableDataSource<ITipoOrdine> = new MatTableDataSource();
    clickedRows = new Set<ITipoOrdine>();

    public object: PageObject = {};

    public dataForm = {
        anno: null,
        idTipoOrdine: null,
        idCatOrdine: null
    };

    filters = '';

    selectedElementKey: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private apiService: ApiServiceService,
        public dialogRef: MatDialogRef<DialogListTipoOrdineComponent>,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(data => this.onSortChange(data));
    }
    /**
     * Load the data showed in the dialog.
     */
    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject, this.filters);

        this.apiService.getTipoOrdine(options).subscribe(
            (data: any) => {
                this.dataSource.data = data.content;
                setTimeout(() => {
                    this.paginator.pageIndex = this.currentPage;
                    this.paginator.length = data.totalElements;
                });
                this.isLoading = false;
            },

            () => {},

            () => {
                this.isLoading = false;
            }
        );
    }

    openDialogResid() {
        let dialogRef = this.dialog.open(SearchTipoOrdineResidComponent, {
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

    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.object.page = this.currentPage;
        this.object.pageSize = this.pageSize;
        this.loadData(this.object);
    }

    onSortChange(data: Sort) {
        this.currentPage = 0;
        this.object.page = 0;
        this.object.pageSize = this.pageSize;
        this.object.columnName = data.active;
        this.object.sortDirection = data.direction;
        this.loadData(this.object);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Set the selected element via row number.
     */
    setSelectedRow(row: any) {
        this.selectedElementKey = row;
    }
}

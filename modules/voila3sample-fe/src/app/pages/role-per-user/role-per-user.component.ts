import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { IRolePerUser } from '../interfaces/role-per-user.interface';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SearchRolePerUserResidComponent } from '../search/search-role-per-user-resid/search-role-per-user-resid.component';
import { SearchRolePerUserResidAdvancedComponent } from '../search/search-role-per-user-resid-advanced/search-role-per-user-resid-advanced.component';
import { PageObject } from 'src/app/shared/page-object.interface';
import { setOptions } from 'src/app/utilities/function/helper';
import { ROLE_PER_USER } from '../costants/role-per-user.constant';
import { Router } from '@angular/router';
import { RolePerUserApiService } from '../services/services-role-per-user/role-per-user-api.service';
import { RolePerUserGroupApiService } from '../services/services-role-per-user/role-per-user-group-api.service';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { AppAuthGuard } from 'src/app/app.authguard';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { Permission } from 'src/app/utilities/pipe/utility-pipe';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-role-per-user',
    templateUrl: './role-per-user.component.html',
    styleUrls: ['./role-per-user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RolePerUserComponent implements OnInit {
    ELEMENT_DATA: IRolePerUser[] = [];
    searchRolePerUserForm!: FormGroup;
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
        /**
         * Parent.
         */
        'theRole.idRole',

        'theUser.idUser'
    ];
    dataSource: MatTableDataSource<IRolePerUser> = new MatTableDataSource();
    clickedRows = new Set<IRolePerUser>();

    public object: PageObject = {};

    //Dati della form
    public dataForm = {
        roleId: null,
        userId: null
    };

    /**
     * filter intialization.
     */
    filters = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
        public dialog: MatDialog,
        private rolePerUserApiService: RolePerUserApiService,
        private router: Router,
        private fb: FormBuilder,
        private auth: AppAuthGuard
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
     * Load data list.
     */
    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject, this.filters);

        this.rolePerUserGroupApiService.rolePerUser.getRolePerUserByCriteria(options).subscribe({
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
        this.rolePerUserApiService.printXlsxReport();
    }

    /**
     * Search dialog.
     */
    openDialogResid() {
        let dialogRef = this.dialog.open(SearchRolePerUserResidComponent, {
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
        let dialogRef = this.dialog.open(SearchRolePerUserResidAdvancedComponent, {
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
        let pathDetailView = ROLE_PER_USER.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }

    public isClickable(privileges: any): any {
        if (environment.securityOn) {
            const permission = new Permission(this.auth);
            return permission.transform(privileges);
        } else return true;
    }
}

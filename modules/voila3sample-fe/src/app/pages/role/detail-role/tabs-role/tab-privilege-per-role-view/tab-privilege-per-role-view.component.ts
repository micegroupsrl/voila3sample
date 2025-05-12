import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PrivilegePerRoleApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-api.service';
import { privilegePerRoleForm } from 'src/app/pages/forms/privilege-per-role-form';
import { PrivilegePerRoleGroupApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-group-api.service';
import { PRIVILEGE_PER_ROLE } from 'src/app/pages/costants/privilege-per-role.constant';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { setOptions } from 'src/app/utilities/function/helper';

@Component({
    selector: 'app-tab-privilege-per-role-view',
    templateUrl: './tab-privilege-per-role-view.component.html',
    styleUrls: ['./tab-privilege-per-role-view.component.scss']
})
export class TabPrivilegePerRoleViewComponent implements OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];

    /**
     * Columns displayed in the tab.
     */
    displayedColumns: string[] = [
        /**
         * Key for Role.
         */

        /**
         * Key for Privilege.
         */
        'thePrivilege.idPrivilege'
    ];
    dataSource: MatTableDataSource<IPrivilegePerRole> = new MatTableDataSource();

    @Input()
    entity!: any;

    public object: PageObject = {};

    /**
     * Create form and lists
     */
    public thePrivilegePerRole!: FormArray;
    public privilegeList!: IPrivilege[];
    public form: FormGroup = privilegePerRoleForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private privilegePerRoleApiService: PrivilegePerRoleApiService,
        private privilegePerRoleGroupApiService: PrivilegePerRoleGroupApiService,
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
            this.privilegePerRoleApiService.getPrivilegePerRoleByRole(this.entity?.objectKey!, options).subscribe(
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
        let pathDetailView = PRIVILEGE_PER_ROLE.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }
}

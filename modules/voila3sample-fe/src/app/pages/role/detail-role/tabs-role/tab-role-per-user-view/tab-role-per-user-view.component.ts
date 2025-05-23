import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolePerUserApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-api.service';
import { rolePerUserForm } from 'src/app/pages/forms/role-per-user-form';
import { RolePerUserGroupApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-group-api.service';
import { ROLE_PER_USER } from 'src/app/pages/costants/role-per-user.constant';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { setOptions } from 'src/app/utilities/function/helper';

@Component({
    selector: 'app-tab-role-per-user-view',
    templateUrl: './tab-role-per-user-view.component.html',
    styleUrls: ['./tab-role-per-user-view.component.scss']
})
export class TabRolePerUserViewComponent implements OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    /**
     * Columns displayed in the tab.
     */
    displayedColumns: string[] = [
        /**
         * Key for Role.
         */

        /**
         * Key for User.
         */
        'theUser.idUser'
    ];
    dataSource: MatTableDataSource<IRolePerUser> = new MatTableDataSource();

    @Input()
    entity!: any;

    public object: PageObject = {};

    /**
     * Create form and lists
     */
    public theRolePerUser!: FormArray;
    public userList!: IUser[];
    public form: FormGroup = rolePerUserForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public smartValidation: boolean = true;
    public totalElements: number = 0;
    public pageStatus!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private rolePerUserApiService: RolePerUserApiService,
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
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
            this.rolePerUserApiService.getRolePerUserByRole(this.entity?.objectKey!, options).subscribe(
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
        let pathDetailView = ROLE_PER_USER.PATH.DETAIL + id + PATH_VIEW;
        this.router.navigate([pathDetailView]);
    }
}

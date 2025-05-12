import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RolePerUserApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-api.service';
import { RolePerUserGroupApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-role-per-user-edit-fe',
    templateUrl: './tab-role-per-user-edit-fe.component.html',
    styleUrls: ['./tab-role-per-user-edit-fe.component.scss']
})
export class TabRolePerUserEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];

    displayedColumns: string[] = ['theRoleObjectKey', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theRolePerUser!: FormArray;
    public roleList!: IRole[];
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
        private rolePerUserApiService: RolePerUserApiService,
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theRolePerUser: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theRolePerUser: this.fb.array([])
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
        this.getTheRolePerUser.patchValue(sortFormArray(this.getTheRolePerUser, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheRolePerUser(): FormArray {
        return this.form.get('theRolePerUser') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheRolePerUser(): FormArray<FormGroup> {
        return this.formNewEntities.get('theRolePerUser') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            theRoleObjectKey: new FormControl(null),
            theRoleObjectTitle: new FormControl(null),
            theUserObjectKey: new FormControl(this.entity?.objectKey!),
            theUserObjectTitle: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IRolePerUser): FormGroup {
        return new FormGroup({
            theRoleObjectKey: new FormControl(data.theRoleObjectKey),
            theRoleObjectTitle: new FormControl(data.theRoleObjectTitle),
            theUserObjectKey: new FormControl(data.theUserObjectKey),
            theUserObjectTitle: new FormControl(data.theUserObjectTitle),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.rolePerUserApiService.getRolePerUserByUser(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theRolePerUser => {
                        this.form.setControl('theRolePerUser', theRolePerUser);
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

    public getRoleList(): void {
        if (!this.roleList) {
            this.rolePerUserGroupApiService.role.getRoleByCriteria().subscribe(data => {
                this.roleList = getListForDropdowns(data);
            });
        }
    }

    /**
     * Parent List.
     */
    private getParentsList(): void {
        this.getRoleList();
    }

    public eliminaRolePerUser(rolePerUserForm: FormGroup) {
        rolePerUserForm.disable();
        rolePerUserForm.patchValue({ entityState: 'D' });
        console.log('entitystate rolePerUser in elimina \n', rolePerUserForm.get('entityState')?.value);
    }

    public ripristinaRolePerUser(rolePerUserForm: FormGroup) {
        rolePerUserForm.enable();
        rolePerUserForm.get('rolePerUserKey')?.disable();
        rolePerUserForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoRolePerUser(rolePerUserForm: FormGroup) {
        this.newTheRolePerUser.controls = this.newTheRolePerUser.controls.filter(u => u.get('rolePerUserKey') !== rolePerUserForm.get('rolePerUserKey'));
    }

    public aggiungiRolePerUser() {
        let rolePerUserForm = this.createNewFormGroup();
        this.newTheRolePerUser.controls = [...this.newTheRolePerUser.controls, rolePerUserForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IRolePerUser[] {
        let valueForm: IRolePerUser[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const rolePerUser of this.getTheRolePerUser.controls) {
                const index = this.getTheRolePerUser.controls.indexOf(rolePerUser);
                if (rolePerUser.dirty) {
                    if (!this.getTheRolePerUser.at(index).get('entityState')?.value) {
                        this.getTheRolePerUser.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theRolePerUser);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theRolePerUser);
        }
        return valueForm;
    }
}

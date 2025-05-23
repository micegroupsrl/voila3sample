import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoleApiService } from 'src/app/pages/services/services-role/role-api.service';
import { RoleGroupApiService } from 'src/app/pages/services/services-role/role-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-role-role-child-edit-fe',
    templateUrl: './tab-role-role-child-edit-fe.component.html',
    styleUrls: ['./tab-role-role-child-edit-fe.component.scss']
})
export class TabRoleRoleChildEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    displayedColumns: string[] = ['roleId', 'name', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public theRoleRoleChild!: FormArray;
    public roleRoleGroupList!: IRole[];
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
        private roleApiService: RoleApiService,
        private roleGroupApiService: RoleGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            theRoleRoleChild: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            theRoleRoleChild: this.fb.array([])
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
        this.getTheRoleRoleChild.patchValue(sortFormArray(this.getTheRoleRoleChild, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getTheRoleRoleChild(): FormArray {
        return this.form.get('theRoleRoleChild') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newTheRoleRoleChild(): FormArray<FormGroup> {
        return this.formNewEntities.get('theRoleRoleChild') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            roleId: new FormControl(null),
            name: new FormControl(null),
            theRoleRoleGroupObjectKey: new FormControl(null),
            theRoleRoleGroupObjectTitle: new FormControl(null),
            thePrivilegePerRole: new FormControl(null),
            theRolePerUser: new FormControl(null),
            theRoleRoleChild: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IRole): FormGroup {
        return new FormGroup({
            roleId: new FormControl({ value: data.roleId, disabled: true }),
            name: new FormControl(data.name),
            theRoleRoleGroupObjectKey: new FormControl(data.theRoleRoleGroupObjectKey),
            theRoleRoleGroupObjectTitle: new FormControl(data.theRoleRoleGroupObjectTitle),
            thePrivilegePerRole: new FormControl(data.thePrivilegePerRole),
            theRolePerUser: new FormControl(data.theRolePerUser),
            theRoleRoleChild: new FormControl(data.theRoleRoleChild),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.roleApiService.getRoleByRoleRoleGroup(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(theRoleRoleChild => {
                        this.form.setControl('theRoleRoleChild', theRoleRoleChild);
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

    public getRoleRoleGroupList(): void {
        if (!this.roleRoleGroupList) {
            this.roleGroupApiService.role.getRoleByCriteria().subscribe(data => {
                this.roleRoleGroupList = getListForDropdowns(data);
            });
        }
    }
    /**
     * Parent List.
     */
    private getParentsList(): void {
        this.getRoleRoleGroupList();
    }

    public eliminaRole(roleForm: FormGroup) {
        roleForm.disable();
        roleForm.patchValue({ entityState: 'D' });
        console.log('entitystate role in elimina \n', roleForm.get('entityState')?.value);
    }

    public ripristinaRole(roleForm: FormGroup) {
        roleForm.enable();
        roleForm.get('roleId')?.disable();
        roleForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoRole(roleForm: FormGroup) {
        this.newTheRoleRoleChild.controls = this.newTheRoleRoleChild.controls.filter(u => u.get('roleId') !== roleForm.get('roleId'));
    }

    public aggiungiRole() {
        let roleForm = this.createNewFormGroup();
        this.newTheRoleRoleChild.controls = [...this.newTheRoleRoleChild.controls, roleForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IRole[] {
        let valueForm: IRole[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const role of this.getTheRoleRoleChild.controls) {
                const index = this.getTheRoleRoleChild.controls.indexOf(role);
                if (role.dirty) {
                    if (!this.getTheRoleRoleChild.at(index).get('entityState')?.value) {
                        this.getTheRoleRoleChild.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().theRoleRoleChild);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().theRoleRoleChild);
        }
        return valueForm;
    }
}

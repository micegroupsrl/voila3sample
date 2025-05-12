import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivilegePerRoleApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-api.service';
import { PrivilegePerRoleGroupApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-group-api.service';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { PageObject } from 'src/app/shared/page-object.interface';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { setOptions, sortFormArray } from 'src/app/utilities/function/helper';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';

@Component({
    selector: 'app-tab-privilege-per-role-edit-fe',
    templateUrl: './tab-privilege-per-role-edit-fe.component.html',
    styleUrls: ['./tab-privilege-per-role-edit-fe.component.scss']
})
export class TabPrivilegePerRoleEditFeComponent extends BaseTabComponent implements OnInit, OnChanges {
    isLoading = false;
    totalRows = 0;
    pageSize = 3;
    currentPage = 0;
    pageSizeOptions: number[] = [3, 6, 15, 60];

    displayedColumns: string[] = ['thePrivilegeObjectKey', 'delete'];

    @Input()
    entity!: any;

    @Input() tab!: any;

    public object: PageObject = {};
    public thePrivilegePerRole!: FormArray;
    public privilegeList!: IPrivilege[];
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
        private privilegePerRoleApiService: PrivilegePerRoleApiService,
        private privilegePerRoleGroupApiService: PrivilegePerRoleGroupApiService,
        public router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.form = this.fb.group({
            thePrivilegePerRole: this.fb.array([])
        });

        this.formNewEntities = this.fb.group({
            thePrivilegePerRole: this.fb.array([])
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
        this.getThePrivilegePerRole.patchValue(sortFormArray(this.getThePrivilegePerRole, data.active, data.direction));
    }
    /**
     * Get form.
     */
    get getThePrivilegePerRole(): FormArray {
        return this.form.get('thePrivilegePerRole') as FormArray;
    }

    /**
     * Get form for the new entities.
     */
    get newThePrivilegePerRole(): FormArray<FormGroup> {
        return this.formNewEntities.get('thePrivilegePerRole') as FormArray<FormGroup>;
    }

    createNewFormGroup(): FormGroup {
        return new FormGroup({
            theRoleObjectKey: new FormControl(this.entity?.objectKey!),
            theRoleObjectTitle: new FormControl(null),
            thePrivilegeObjectKey: new FormControl(null),
            thePrivilegeObjectTitle: new FormControl(null),
            entityState: new FormControl('C')
        });
    }

    createFormGroup(data: IPrivilegePerRole): FormGroup {
        return new FormGroup({
            theRoleObjectKey: new FormControl(data.theRoleObjectKey),
            theRoleObjectTitle: new FormControl(data.theRoleObjectTitle),
            thePrivilegeObjectKey: new FormControl(data.thePrivilegeObjectKey),
            thePrivilegeObjectTitle: new FormControl(data.thePrivilegeObjectTitle),
            entityState: new FormControl(data.entityState)
        });
    }

    loadData(pageObject: PageObject) {
        this.isLoading = true;

        const options: HttpParams = setOptions(pageObject);
        if (this.entity) {
            this.privilegePerRoleApiService.getPrivilegePerRoleByRole(this.entity?.objectKey!, options).subscribe(
                (data: any) => {
                    const formArray = new FormArray(data.content.map(this.createFormGroup));
                    const fgs: Observable<FormArray> = of(formArray);
                    fgs.subscribe(thePrivilegePerRole => {
                        this.form.setControl('thePrivilegePerRole', thePrivilegePerRole);
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

    public getPrivilegeList(): void {
        if (!this.privilegeList) {
            this.privilegePerRoleGroupApiService.privilege.getPrivilegeByCriteria().subscribe(data => {
                this.privilegeList = getListForDropdowns(data);
            });
        }
    }
    /**
     * Parent List.
     */
    private getParentsList(): void {
        this.getPrivilegeList();
    }

    public eliminaPrivilegePerRole(privilegePerRoleForm: FormGroup) {
        privilegePerRoleForm.disable();
        privilegePerRoleForm.patchValue({ entityState: 'D' });
        console.log('entitystate privilegePerRole in elimina \n', privilegePerRoleForm.get('entityState')?.value);
    }

    public ripristinaPrivilegePerRole(privilegePerRoleForm: FormGroup) {
        privilegePerRoleForm.enable();
        privilegePerRoleForm.get('privilegePerRoleKey')?.disable();
        privilegePerRoleForm.patchValue({ entityState: 'U' });
    }

    public eliminaRigaNuovoPrivilegePerRole(privilegePerRoleForm: FormGroup) {
        this.newThePrivilegePerRole.controls = this.newThePrivilegePerRole.controls.filter(u => u.get('privilegePerRoleKey') !== privilegePerRoleForm.get('privilegePerRoleKey'));
    }

    public aggiungiPrivilegePerRole() {
        let privilegePerRoleForm = this.createNewFormGroup();
        this.newThePrivilegePerRole.controls = [...this.newThePrivilegePerRole.controls, privilegePerRoleForm];
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    public getValueForm(): IPrivilegePerRole[] {
        let valueForm: IPrivilegePerRole[] = [];
        if (this.form.valid) {
            this.form.markAsDirty(); // segna il form come dirty
            for (const privilegePerRole of this.getThePrivilegePerRole.controls) {
                const index = this.getThePrivilegePerRole.controls.indexOf(privilegePerRole);
                if (privilegePerRole.dirty) {
                    if (!this.getThePrivilegePerRole.at(index).get('entityState')?.value) {
                        this.getThePrivilegePerRole.at(index).patchValue({ entityState: 'U' }); // aggiunge entityState: 'U' al controllo corrispondente
                    }
                }
            }
            valueForm = valueForm.concat(this.form.getRawValue().thePrivilegePerRole);
        }
        if (this.formNewEntities.valid) {
            valueForm = valueForm.concat(this.formNewEntities.getRawValue().thePrivilegePerRole);
        }
        return valueForm;
    }
}

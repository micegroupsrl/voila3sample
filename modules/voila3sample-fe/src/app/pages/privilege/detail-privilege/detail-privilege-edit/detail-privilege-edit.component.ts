import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { TabsPrivilegeComponent } from '../tabs-privilege/tabs-privilege.component';
import { PrivilegeGroupApiService } from '../../../services/services-privilege/privilege-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-privilege-edit',
    templateUrl: './detail-privilege-edit.component.html',
    styleUrls: ['./detail-privilege-edit.component.scss']
})
export class DetailPrivilegeEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsPrivilegeComponent) tabsPrivilege!: TabsPrivilegeComponent;

    @Input()
    public privilegeForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public privilege!: IPrivilege;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private privilegeGroupApiService: PrivilegeGroupApiService
    ) {
        super();
    }

    /**
     * Open Dialog.
     */
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    /**
     * Return the tabs value for the current entity.
     */
    public getTabsValue() {
        return this.tabsPrivilege.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['privilege'];
        if (entityChanges?.currentValue) {
            this.privilege = entityChanges.currentValue;
            this.patchValueForm(this.privilege);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.privilegeForm.getRawValue();
    }

    public patchValueForm(privilege: IPrivilege) {
        this.privilegeForm.patchValue({
            privilegeId: privilege.privilegeId,
            name: privilege.name,
            description: privilege.description
        });
        this.privilegeForm.get('privilegeId')?.disable();
    }
}

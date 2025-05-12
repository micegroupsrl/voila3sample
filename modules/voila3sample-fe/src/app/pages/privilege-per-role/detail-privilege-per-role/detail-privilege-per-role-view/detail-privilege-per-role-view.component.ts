import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';

@Component({
    selector: 'app-detail-privilege-per-role-view',
    templateUrl: './detail-privilege-per-role-view.component.html',
    styleUrls: ['./detail-privilege-per-role-view.component.scss']
})
export class DetailPrivilegePerRoleViewComponent implements OnChanges {
    //Vengono passati al tabs-privilegePerRole
    @Input()
    public privilegePerRoleForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public privilegePerRole!: IPrivilegePerRole;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('PrivilegePerRole change: ', this.privilegePerRole);
    }
    /**
     * Page changes.
     */
    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }
    /**
     * Entity changes.
     */
    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['privilegePerRole'];
        if (entityChanges?.currentValue) {
            this.privilegePerRole = entityChanges.currentValue;
        }
    }
}

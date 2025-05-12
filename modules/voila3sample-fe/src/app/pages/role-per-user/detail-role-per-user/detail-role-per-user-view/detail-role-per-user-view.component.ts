import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';

@Component({
    selector: 'app-detail-role-per-user-view',
    templateUrl: './detail-role-per-user-view.component.html',
    styleUrls: ['./detail-role-per-user-view.component.scss']
})
export class DetailRolePerUserViewComponent implements OnChanges {
    //Vengono passati al tabs-rolePerUser
    @Input()
    public rolePerUserForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public rolePerUser!: IRolePerUser;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('RolePerUser change: ', this.rolePerUser);
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
        const entityChanges: SimpleChange = changes['rolePerUser'];
        if (entityChanges?.currentValue) {
            this.rolePerUser = entityChanges.currentValue;
        }
    }
}

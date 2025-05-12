import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRole } from 'src/app/pages/interfaces/role.interface';

@Component({
    selector: 'app-detail-role-view',
    templateUrl: './detail-role-view.component.html',
    styleUrls: ['./detail-role-view.component.scss']
})
export class DetailRoleViewComponent implements OnChanges {
    //Vengono passati al tabs-role
    @Input()
    public roleForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public role!: IRole;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Role change: ', this.role);
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
        const entityChanges: SimpleChange = changes['role'];
        if (entityChanges?.currentValue) {
            this.role = entityChanges.currentValue;
        }
    }
}

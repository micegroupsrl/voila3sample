import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';

@Component({
    selector: 'app-detail-privilege-view',
    templateUrl: './detail-privilege-view.component.html',
    styleUrls: ['./detail-privilege-view.component.scss']
})
export class DetailPrivilegeViewComponent implements OnChanges {
    //Vengono passati al tabs-privilege
    @Input()
    public privilegeForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public privilege!: IPrivilege;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Privilege change: ', this.privilege);
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
        const entityChanges: SimpleChange = changes['privilege'];
        if (entityChanges?.currentValue) {
            this.privilege = entityChanges.currentValue;
        }
    }
}

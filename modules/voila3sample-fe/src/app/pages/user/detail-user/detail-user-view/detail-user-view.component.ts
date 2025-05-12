import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from 'src/app/pages/interfaces/user.interface';

@Component({
    selector: 'app-detail-user-view',
    templateUrl: './detail-user-view.component.html',
    styleUrls: ['./detail-user-view.component.scss']
})
export class DetailUserViewComponent implements OnChanges {
    //Vengono passati al tabs-user
    @Input()
    public userForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public user!: IUser;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('User change: ', this.user);
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
        const entityChanges: SimpleChange = changes['user'];
        if (entityChanges?.currentValue) {
            this.user = entityChanges.currentValue;
        }
    }
}

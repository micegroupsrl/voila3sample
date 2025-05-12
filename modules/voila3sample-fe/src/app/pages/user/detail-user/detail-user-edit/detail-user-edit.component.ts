import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { TabsUserComponent } from '../tabs-user/tabs-user.component';
import { UserGroupApiService } from '../../../services/services-user/user-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-user-edit',
    templateUrl: './detail-user-edit.component.html',
    styleUrls: ['./detail-user-edit.component.scss']
})
export class DetailUserEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsUserComponent) tabsUser!: TabsUserComponent;

    @Input()
    public userForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public user!: IUser;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private userGroupApiService: UserGroupApiService
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
        return this.tabsUser.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['user'];
        if (entityChanges?.currentValue) {
            this.user = entityChanges.currentValue;
            this.patchValueForm(this.user);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.userForm.getRawValue();
    }

    public patchValueForm(user: IUser) {
        this.userForm.patchValue({
            userId: user.userId,
            email: user.email,
            password: user.password,
            username: user.username
        });
        this.userForm.get('userId')?.disable();
    }
}

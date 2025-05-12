import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { UserApiService } from 'src/app/pages/services/services-user/user-api.service';
import { UserGroupApiService } from 'src/app/pages/services/services-user/user-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { USER } from 'src/app/pages/costants/user.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailUserEditComponent } from './detail-user-edit/detail-user-edit.component';
import { DetailUserViewComponent } from './detail-user-view/detail-user-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { userForm } from '../../forms/user-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public userForm!: FormGroup;
    public user!: IUser;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailUserEditComponent) detailUserEditComponent!: DetailUserEditComponent;
    @ViewChild(DetailUserViewComponent) detailUserViewComponent!: DetailUserViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private userGroupApiService: UserGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.userForm = userForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getUserById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert User.
     */

    public insertUser(): void {
        this.overlaysService.loadingOn();
        const user: IUser = this.userForm.value;
        let tabs = this.detailUserEditComponent.getTabsValue();
        user.theRolePerUser = tabs.theRolePerUserEditFe;
        this.userGroupApiService.user.addUser(user).subscribe((userResult: IUser) => {
            this.user = userResult;
            if (this.user) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.User.labels', this.user.objectKey]);
                this.navigateToPath(USER.PATH.DETAIL + this.user.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getUserById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.userGroupApiService.user.getUserById(id).subscribe(
                    (userResult: IUser) => {
                        this.user = userResult;
                    },
                    () => {},
                    () => {
                        this.overlaysService.loadingOff();
                    }
                );
            }
        }
    }

    /**
     * Navigate back.
     */
    public goBack(): void {
        this.location.back();
    }
    /**
     * Go to list page.
     */
    public goList(): void {
        this.navigateToPath(USER.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editUser(): void {
        this.navigateToPath(USER.PATH.DETAIL + this.user.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update User.
     */

    public updateUser(): void {
        const user: IUser = this.detailUserEditComponent.getFormValue();
        let tabs = this.detailUserEditComponent.getTabsValue();
        user.theRolePerUser = tabs.theRolePerUserEditFe;

        this.overlaysService.loadingOn();

        this.userGroupApiService.user.updateUser(user).subscribe((userResult: IUser) => {
            this.user = userResult;

            if (this.user) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.User.labels', this.user.objectKey]);
                this.navigateToPath(USER.PATH.DETAIL + this.user.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete user by id.
     */
    public deleteUserById(): void {
        this.overlaysService.loadingOn();
        this.userGroupApiService.user.deleteUser(this.user.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.User.labels', this.user.objectKey]);
            this.navigateToPath(USER.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete user.
     */
    public confirmDeleteUser(): void {
        const dialogRef = this.dialog.open(DeleteUserDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteUserById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.userGroupApiService.user.printPdfReport(this.user.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-user-dialog',
    templateUrl: 'delete-user-dialog.html'
})
export class DeleteUserDialog {
    constructor(public dialogRef: MatDialogRef<DeleteUserDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

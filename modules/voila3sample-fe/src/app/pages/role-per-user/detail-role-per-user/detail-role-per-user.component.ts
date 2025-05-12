import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IRolePerUser } from 'src/app/pages/interfaces/role-per-user.interface';
import { RolePerUserApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-api.service';
import { RolePerUserGroupApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { ROLE_PER_USER } from 'src/app/pages/costants/role-per-user.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailRolePerUserEditComponent } from './detail-role-per-user-edit/detail-role-per-user-edit.component';
import { DetailRolePerUserViewComponent } from './detail-role-per-user-view/detail-role-per-user-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { rolePerUserForm } from '../../forms/role-per-user-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-role-per-user',
    templateUrl: './detail-role-per-user.component.html',
    styleUrls: ['./detail-role-per-user.component.scss']
})
export class DetailRolePerUserComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public rolePerUserForm!: FormGroup;
    public rolePerUser!: IRolePerUser;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailRolePerUserEditComponent) detailRolePerUserEditComponent!: DetailRolePerUserEditComponent;
    @ViewChild(DetailRolePerUserViewComponent) detailRolePerUserViewComponent!: DetailRolePerUserViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.rolePerUserForm = rolePerUserForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getRolePerUserById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert RolePerUser.
     */

    public insertRolePerUser(): void {
        this.overlaysService.loadingOn();
        const rolePerUser: IRolePerUser = this.rolePerUserForm.value;
        this.rolePerUserGroupApiService.rolePerUser.addRolePerUser(rolePerUser).subscribe((rolePerUserResult: IRolePerUser) => {
            this.rolePerUser = rolePerUserResult;
            if (this.rolePerUser) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.RolePerUser.labels', this.rolePerUser.objectKey]);
                this.navigateToPath(ROLE_PER_USER.PATH.DETAIL + this.rolePerUser.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getRolePerUserById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.rolePerUserGroupApiService.rolePerUser.getRolePerUserById(id).subscribe(
                    (rolePerUserResult: IRolePerUser) => {
                        this.rolePerUser = rolePerUserResult;
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
        this.navigateToPath(ROLE_PER_USER.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editRolePerUser(): void {
        this.navigateToPath(ROLE_PER_USER.PATH.DETAIL + this.rolePerUser.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update RolePerUser.
     */

    public updateRolePerUser(): void {
        const rolePerUser: IRolePerUser = this.detailRolePerUserEditComponent.getFormValue();
        this.overlaysService.loadingOn();

        this.rolePerUserGroupApiService.rolePerUser.updateRolePerUser(rolePerUser).subscribe((rolePerUserResult: IRolePerUser) => {
            this.rolePerUser = rolePerUserResult;

            if (this.rolePerUser) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.RolePerUser.labels', this.rolePerUser.objectKey]);
                this.navigateToPath(ROLE_PER_USER.PATH.DETAIL + this.rolePerUser.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete rolePerUser by id.
     */
    public deleteRolePerUserById(): void {
        this.overlaysService.loadingOn();
        this.rolePerUserGroupApiService.rolePerUser.deleteRolePerUser(this.rolePerUser.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.RolePerUser.labels', this.rolePerUser.objectKey]);
            this.navigateToPath(ROLE_PER_USER.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete rolePerUser.
     */
    public confirmDeleteRolePerUser(): void {
        const dialogRef = this.dialog.open(DeleteRolePerUserDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteRolePerUserById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.rolePerUserGroupApiService.rolePerUser.printPdfReport(this.rolePerUser.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-role-per-user-dialog',
    templateUrl: 'delete-role-per-user-dialog.html'
})
export class DeleteRolePerUserDialog {
    constructor(public dialogRef: MatDialogRef<DeleteRolePerUserDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

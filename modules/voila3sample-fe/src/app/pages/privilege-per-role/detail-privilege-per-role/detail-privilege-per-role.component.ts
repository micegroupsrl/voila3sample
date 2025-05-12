import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IPrivilegePerRole } from 'src/app/pages/interfaces/privilege-per-role.interface';
import { PrivilegePerRoleApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-api.service';
import { PrivilegePerRoleGroupApiService } from 'src/app/pages/services/services-privilege-per-role/privilege-per-role-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { PRIVILEGE_PER_ROLE } from 'src/app/pages/costants/privilege-per-role.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailPrivilegePerRoleEditComponent } from './detail-privilege-per-role-edit/detail-privilege-per-role-edit.component';
import { DetailPrivilegePerRoleViewComponent } from './detail-privilege-per-role-view/detail-privilege-per-role-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { privilegePerRoleForm } from '../../forms/privilege-per-role-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-privilege-per-role',
    templateUrl: './detail-privilege-per-role.component.html',
    styleUrls: ['./detail-privilege-per-role.component.scss']
})
export class DetailPrivilegePerRoleComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public privilegePerRoleForm!: FormGroup;
    public privilegePerRole!: IPrivilegePerRole;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailPrivilegePerRoleEditComponent) detailPrivilegePerRoleEditComponent!: DetailPrivilegePerRoleEditComponent;
    @ViewChild(DetailPrivilegePerRoleViewComponent) detailPrivilegePerRoleViewComponent!: DetailPrivilegePerRoleViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private privilegePerRoleGroupApiService: PrivilegePerRoleGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.privilegePerRoleForm = privilegePerRoleForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getPrivilegePerRoleById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert PrivilegePerRole.
     */

    public insertPrivilegePerRole(): void {
        this.overlaysService.loadingOn();
        const privilegePerRole: IPrivilegePerRole = this.privilegePerRoleForm.value;
        this.privilegePerRoleGroupApiService.privilegePerRole.addPrivilegePerRole(privilegePerRole).subscribe((privilegePerRoleResult: IPrivilegePerRole) => {
            this.privilegePerRole = privilegePerRoleResult;
            if (this.privilegePerRole) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.PrivilegePerRole.labels', this.privilegePerRole.objectKey]);
                this.navigateToPath(PRIVILEGE_PER_ROLE.PATH.DETAIL + this.privilegePerRole.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getPrivilegePerRoleById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.privilegePerRoleGroupApiService.privilegePerRole.getPrivilegePerRoleById(id).subscribe(
                    (privilegePerRoleResult: IPrivilegePerRole) => {
                        this.privilegePerRole = privilegePerRoleResult;
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
        this.navigateToPath(PRIVILEGE_PER_ROLE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editPrivilegePerRole(): void {
        this.navigateToPath(PRIVILEGE_PER_ROLE.PATH.DETAIL + this.privilegePerRole.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update PrivilegePerRole.
     */

    public updatePrivilegePerRole(): void {
        const privilegePerRole: IPrivilegePerRole = this.detailPrivilegePerRoleEditComponent.getFormValue();
        this.overlaysService.loadingOn();

        this.privilegePerRoleGroupApiService.privilegePerRole.updatePrivilegePerRole(privilegePerRole).subscribe((privilegePerRoleResult: IPrivilegePerRole) => {
            this.privilegePerRole = privilegePerRoleResult;

            if (this.privilegePerRole) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.PrivilegePerRole.labels', this.privilegePerRole.objectKey]);
                this.navigateToPath(PRIVILEGE_PER_ROLE.PATH.DETAIL + this.privilegePerRole.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete privilegePerRole by id.
     */
    public deletePrivilegePerRoleById(): void {
        this.overlaysService.loadingOn();
        this.privilegePerRoleGroupApiService.privilegePerRole.deletePrivilegePerRole(this.privilegePerRole.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.PrivilegePerRole.labels', this.privilegePerRole.objectKey]);
            this.navigateToPath(PRIVILEGE_PER_ROLE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete privilegePerRole.
     */
    public confirmDeletePrivilegePerRole(): void {
        const dialogRef = this.dialog.open(DeletePrivilegePerRoleDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deletePrivilegePerRoleById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.privilegePerRoleGroupApiService.privilegePerRole.printPdfReport(this.privilegePerRole.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-privilege-per-role-dialog',
    templateUrl: 'delete-privilege-per-role-dialog.html'
})
export class DeletePrivilegePerRoleDialog {
    constructor(public dialogRef: MatDialogRef<DeletePrivilegePerRoleDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

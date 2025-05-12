import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { RoleApiService } from 'src/app/pages/services/services-role/role-api.service';
import { RoleGroupApiService } from 'src/app/pages/services/services-role/role-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { ROLE } from 'src/app/pages/costants/role.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailRoleEditComponent } from './detail-role-edit/detail-role-edit.component';
import { DetailRoleViewComponent } from './detail-role-view/detail-role-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { roleForm } from '../../forms/role-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-role',
    templateUrl: './detail-role.component.html',
    styleUrls: ['./detail-role.component.scss']
})
export class DetailRoleComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public roleForm!: FormGroup;
    public role!: IRole;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailRoleEditComponent) detailRoleEditComponent!: DetailRoleEditComponent;
    @ViewChild(DetailRoleViewComponent) detailRoleViewComponent!: DetailRoleViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private roleGroupApiService: RoleGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.roleForm = roleForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getRoleById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Role.
     */

    public insertRole(): void {
        this.overlaysService.loadingOn();
        const role: IRole = this.roleForm.value;
        let tabs = this.detailRoleEditComponent.getTabsValue();
        role.thePrivilegePerRole = tabs.thePrivilegePerRoleEditFe;
        role.theRolePerUser = tabs.theRolePerUserEditFe;
        role.theRoleRoleChild = tabs.theRoleRoleChildEditFe;
        this.roleGroupApiService.role.addRole(role).subscribe((roleResult: IRole) => {
            this.role = roleResult;
            if (this.role) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Role.labels', this.role.objectKey]);
                this.navigateToPath(ROLE.PATH.DETAIL + this.role.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getRoleById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.roleGroupApiService.role.getRoleById(id).subscribe(
                    (roleResult: IRole) => {
                        this.role = roleResult;
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
        this.navigateToPath(ROLE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editRole(): void {
        this.navigateToPath(ROLE.PATH.DETAIL + this.role.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Role.
     */

    public updateRole(): void {
        const role: IRole = this.detailRoleEditComponent.getFormValue();
        let tabs = this.detailRoleEditComponent.getTabsValue();
        role.thePrivilegePerRole = tabs.thePrivilegePerRoleEditFe;
        role.theRolePerUser = tabs.theRolePerUserEditFe;
        role.theRoleRoleChild = tabs.theRoleRoleChildEditFe;

        this.overlaysService.loadingOn();

        this.roleGroupApiService.role.updateRole(role).subscribe((roleResult: IRole) => {
            this.role = roleResult;

            if (this.role) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Role.labels', this.role.objectKey]);
                this.navigateToPath(ROLE.PATH.DETAIL + this.role.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete role by id.
     */
    public deleteRoleById(): void {
        this.overlaysService.loadingOn();
        this.roleGroupApiService.role.deleteRole(this.role.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Role.labels', this.role.objectKey]);
            this.navigateToPath(ROLE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete role.
     */
    public confirmDeleteRole(): void {
        const dialogRef = this.dialog.open(DeleteRoleDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteRoleById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.roleGroupApiService.role.printPdfReport(this.role.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-role-dialog',
    templateUrl: 'delete-role-dialog.html'
})
export class DeleteRoleDialog {
    constructor(public dialogRef: MatDialogRef<DeleteRoleDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

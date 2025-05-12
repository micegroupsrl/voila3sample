import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { PrivilegeApiService } from 'src/app/pages/services/services-privilege/privilege-api.service';
import { PrivilegeGroupApiService } from 'src/app/pages/services/services-privilege/privilege-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { PRIVILEGE } from 'src/app/pages/costants/privilege.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailPrivilegeEditComponent } from './detail-privilege-edit/detail-privilege-edit.component';
import { DetailPrivilegeViewComponent } from './detail-privilege-view/detail-privilege-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { privilegeForm } from '../../forms/privilege-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-privilege',
    templateUrl: './detail-privilege.component.html',
    styleUrls: ['./detail-privilege.component.scss']
})
export class DetailPrivilegeComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public privilegeForm!: FormGroup;
    public privilege!: IPrivilege;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailPrivilegeEditComponent) detailPrivilegeEditComponent!: DetailPrivilegeEditComponent;
    @ViewChild(DetailPrivilegeViewComponent) detailPrivilegeViewComponent!: DetailPrivilegeViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private privilegeGroupApiService: PrivilegeGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.privilegeForm = privilegeForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getPrivilegeById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Privilege.
     */

    public insertPrivilege(): void {
        this.overlaysService.loadingOn();
        const privilege: IPrivilege = this.privilegeForm.value;
        let tabs = this.detailPrivilegeEditComponent.getTabsValue();
        privilege.thePrivilegePerRole = tabs.thePrivilegePerRoleEditFe;
        this.privilegeGroupApiService.privilege.addPrivilege(privilege).subscribe((privilegeResult: IPrivilege) => {
            this.privilege = privilegeResult;
            if (this.privilege) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Privilege.labels', this.privilege.objectKey]);
                this.navigateToPath(PRIVILEGE.PATH.DETAIL + this.privilege.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getPrivilegeById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.privilegeGroupApiService.privilege.getPrivilegeById(id).subscribe(
                    (privilegeResult: IPrivilege) => {
                        this.privilege = privilegeResult;
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
        this.navigateToPath(PRIVILEGE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editPrivilege(): void {
        this.navigateToPath(PRIVILEGE.PATH.DETAIL + this.privilege.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Privilege.
     */

    public updatePrivilege(): void {
        const privilege: IPrivilege = this.detailPrivilegeEditComponent.getFormValue();
        let tabs = this.detailPrivilegeEditComponent.getTabsValue();
        privilege.thePrivilegePerRole = tabs.thePrivilegePerRoleEditFe;

        this.overlaysService.loadingOn();

        this.privilegeGroupApiService.privilege.updatePrivilege(privilege).subscribe((privilegeResult: IPrivilege) => {
            this.privilege = privilegeResult;

            if (this.privilege) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Privilege.labels', this.privilege.objectKey]);
                this.navigateToPath(PRIVILEGE.PATH.DETAIL + this.privilege.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete privilege by id.
     */
    public deletePrivilegeById(): void {
        this.overlaysService.loadingOn();
        this.privilegeGroupApiService.privilege.deletePrivilege(this.privilege.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Privilege.labels', this.privilege.objectKey]);
            this.navigateToPath(PRIVILEGE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete privilege.
     */
    public confirmDeletePrivilege(): void {
        const dialogRef = this.dialog.open(DeletePrivilegeDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deletePrivilegeById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.privilegeGroupApiService.privilege.printPdfReport(this.privilege.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-privilege-dialog',
    templateUrl: 'delete-privilege-dialog.html'
})
export class DeletePrivilegeDialog {
    constructor(public dialogRef: MatDialogRef<DeletePrivilegeDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

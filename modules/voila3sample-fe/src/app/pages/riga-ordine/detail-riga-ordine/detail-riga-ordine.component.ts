import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';
import { RigaOrdineApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-api.service';
import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { RIGA_ORDINE } from 'src/app/pages/costants/riga-ordine.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailRigaOrdineEditComponent } from './detail-riga-ordine-edit/detail-riga-ordine-edit.component';
import { DetailRigaOrdineViewComponent } from './detail-riga-ordine-view/detail-riga-ordine-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { rigaOrdineForm } from '../../forms/riga-ordine-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-riga-ordine',
    templateUrl: './detail-riga-ordine.component.html',
    styleUrls: ['./detail-riga-ordine.component.scss']
})
export class DetailRigaOrdineComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public rigaOrdineForm!: FormGroup;
    public rigaOrdine!: IRigaOrdine;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailRigaOrdineEditComponent) detailRigaOrdineEditComponent!: DetailRigaOrdineEditComponent;
    @ViewChild(DetailRigaOrdineViewComponent) detailRigaOrdineViewComponent!: DetailRigaOrdineViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.rigaOrdineForm = rigaOrdineForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getRigaOrdineById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert RigaOrdine.
     */

    public insertRigaOrdine(): void {
        this.overlaysService.loadingOn();
        const rigaOrdine: IRigaOrdine = this.rigaOrdineForm.value;
        this.rigaOrdineGroupApiService.rigaOrdine.addRigaOrdine(rigaOrdine).subscribe((rigaOrdineResult: IRigaOrdine) => {
            this.rigaOrdine = rigaOrdineResult;
            if (this.rigaOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.RigaOrdine.labels', this.rigaOrdine.objectKey]);
                this.navigateToPath(RIGA_ORDINE.PATH.DETAIL + this.rigaOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getRigaOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.rigaOrdineGroupApiService.rigaOrdine.getRigaOrdineById(id).subscribe(
                    (rigaOrdineResult: IRigaOrdine) => {
                        this.rigaOrdine = rigaOrdineResult;
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
        this.navigateToPath(RIGA_ORDINE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editRigaOrdine(): void {
        this.navigateToPath(RIGA_ORDINE.PATH.DETAIL + this.rigaOrdine.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update RigaOrdine.
     */

    public updateRigaOrdine(): void {
        const rigaOrdine: IRigaOrdine = this.detailRigaOrdineEditComponent.getFormValue();
        this.overlaysService.loadingOn();

        this.rigaOrdineGroupApiService.rigaOrdine.updateRigaOrdine(rigaOrdine).subscribe((rigaOrdineResult: IRigaOrdine) => {
            this.rigaOrdine = rigaOrdineResult;

            if (this.rigaOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.RigaOrdine.labels', this.rigaOrdine.objectKey]);
                this.navigateToPath(RIGA_ORDINE.PATH.DETAIL + this.rigaOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete rigaOrdine by id.
     */
    public deleteRigaOrdineById(): void {
        this.overlaysService.loadingOn();
        this.rigaOrdineGroupApiService.rigaOrdine.deleteRigaOrdine(this.rigaOrdine.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.RigaOrdine.labels', this.rigaOrdine.objectKey]);
            this.navigateToPath(RIGA_ORDINE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete rigaOrdine.
     */
    public confirmDeleteRigaOrdine(): void {
        const dialogRef = this.dialog.open(DeleteRigaOrdineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteRigaOrdineById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.rigaOrdineGroupApiService.rigaOrdine.printPdfReport(this.rigaOrdine.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-riga-ordine-dialog',
    templateUrl: 'delete-riga-ordine-dialog.html'
})
export class DeleteRigaOrdineDialog {
    constructor(public dialogRef: MatDialogRef<DeleteRigaOrdineDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

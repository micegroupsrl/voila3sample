import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { OrdineApiService } from 'src/app/pages/services/services-ordine/ordine-api.service';
import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { ORDINE } from 'src/app/pages/costants/ordine.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailOrdineEditComponent } from './detail-ordine-edit/detail-ordine-edit.component';
import { DetailOrdineViewComponent } from './detail-ordine-view/detail-ordine-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { ordineForm } from '../../forms/ordine-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-ordine',
    templateUrl: './detail-ordine.component.html',
    styleUrls: ['./detail-ordine.component.scss']
})
export class DetailOrdineComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public ordineForm!: FormGroup;
    public ordine!: IOrdine;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailOrdineEditComponent) detailOrdineEditComponent!: DetailOrdineEditComponent;
    @ViewChild(DetailOrdineViewComponent) detailOrdineViewComponent!: DetailOrdineViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private ordineGroupApiService: OrdineGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.ordineForm = ordineForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getOrdineById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Ordine.
     */

    public insertOrdine(): void {
        this.overlaysService.loadingOn();
        const ordine: IOrdine = this.ordineForm.value;
        let tabs = this.detailOrdineEditComponent.getTabsValue();
        ordine.theRigaOrdine = tabs.theRigaOrdineEditFe;
        ordine.theOrdineFiglio = tabs.theOrdineFiglioEditFe;
        this.ordineGroupApiService.ordine.addOrdine(ordine).subscribe((ordineResult: IOrdine) => {
            this.ordine = ordineResult;
            if (this.ordine) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Ordine.labels', this.ordine.objectKey]);
                this.navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.ordineGroupApiService.ordine.getOrdineById(id).subscribe(
                    (ordineResult: IOrdine) => {
                        this.ordine = ordineResult;
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
        this.navigateToPath(ORDINE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editOrdine(): void {
        this.navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Ordine.
     */

    public updateOrdine(): void {
        const ordine: IOrdine = this.detailOrdineEditComponent.getFormValue();
        let tabs = this.detailOrdineEditComponent.getTabsValue();
        ordine.theRigaOrdine = tabs.theRigaOrdineEditFe;
        ordine.theOrdineFiglio = tabs.theOrdineFiglioEditFe;

        this.overlaysService.loadingOn();

        this.ordineGroupApiService.ordine.updateOrdine(ordine).subscribe((ordineResult: IOrdine) => {
            this.ordine = ordineResult;

            if (this.ordine) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Ordine.labels', this.ordine.objectKey]);
                this.navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete ordine by id.
     */
    public deleteOrdineById(): void {
        this.overlaysService.loadingOn();
        this.ordineGroupApiService.ordine.deleteOrdine(this.ordine.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Ordine.labels', this.ordine.objectKey]);
            this.navigateToPath(ORDINE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete ordine.
     */
    public confirmDeleteOrdine(): void {
        const dialogRef = this.dialog.open(DeleteOrdineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteOrdineById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.ordineGroupApiService.ordine.printPdfReport(this.ordine.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-ordine-dialog',
    templateUrl: 'delete-ordine-dialog.html'
})
export class DeleteOrdineDialog {
    constructor(public dialogRef: MatDialogRef<DeleteOrdineDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

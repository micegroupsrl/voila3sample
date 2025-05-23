import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';
import { StatoOrdineApiService } from 'src/app/pages/services/services-stato-ordine/stato-ordine-api.service';
import { StatoOrdineGroupApiService } from 'src/app/pages/services/services-stato-ordine/stato-ordine-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { STATO_ORDINE } from 'src/app/pages/costants/stato-ordine.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailStatoOrdineEditComponent } from './detail-stato-ordine-edit/detail-stato-ordine-edit.component';
import { DetailStatoOrdineViewComponent } from './detail-stato-ordine-view/detail-stato-ordine-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { statoOrdineForm } from '../../forms/stato-ordine-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-stato-ordine',
    templateUrl: './detail-stato-ordine.component.html',
    styleUrls: ['./detail-stato-ordine.component.scss']
})
export class DetailStatoOrdineComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public statoOrdineForm!: FormGroup;
    public statoOrdine!: IStatoOrdine;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailStatoOrdineEditComponent) detailStatoOrdineEditComponent!: DetailStatoOrdineEditComponent;
    @ViewChild(DetailStatoOrdineViewComponent) detailStatoOrdineViewComponent!: DetailStatoOrdineViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private statoOrdineGroupApiService: StatoOrdineGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.statoOrdineForm = statoOrdineForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getStatoOrdineById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert StatoOrdine.
     */

    public insertStatoOrdine(): void {
        this.overlaysService.loadingOn();
        const statoOrdine: IStatoOrdine = this.statoOrdineForm.value;
        let tabs = this.detailStatoOrdineEditComponent.getTabsValue();
        statoOrdine.theOrdine = tabs.theOrdineEditFe;
        this.statoOrdineGroupApiService.statoOrdine.addStatoOrdine(statoOrdine).subscribe((statoOrdineResult: IStatoOrdine) => {
            this.statoOrdine = statoOrdineResult;
            if (this.statoOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.StatoOrdine.labels', this.statoOrdine.objectKey]);
                this.navigateToPath(STATO_ORDINE.PATH.DETAIL + this.statoOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getStatoOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.statoOrdineGroupApiService.statoOrdine.getStatoOrdineById(id).subscribe(
                    (statoOrdineResult: IStatoOrdine) => {
                        this.statoOrdine = statoOrdineResult;
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
        this.navigateToPath(STATO_ORDINE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editStatoOrdine(): void {
        this.navigateToPath(STATO_ORDINE.PATH.DETAIL + this.statoOrdine.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update StatoOrdine.
     */

    public updateStatoOrdine(): void {
        const statoOrdine: IStatoOrdine = this.detailStatoOrdineEditComponent.getFormValue();
        let tabs = this.detailStatoOrdineEditComponent.getTabsValue();
        statoOrdine.theOrdine = tabs.theOrdineEditFe;

        this.overlaysService.loadingOn();

        this.statoOrdineGroupApiService.statoOrdine.updateStatoOrdine(statoOrdine).subscribe((statoOrdineResult: IStatoOrdine) => {
            this.statoOrdine = statoOrdineResult;

            if (this.statoOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.StatoOrdine.labels', this.statoOrdine.objectKey]);
                this.navigateToPath(STATO_ORDINE.PATH.DETAIL + this.statoOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete statoOrdine by id.
     */
    public deleteStatoOrdineById(): void {
        this.overlaysService.loadingOn();
        this.statoOrdineGroupApiService.statoOrdine.deleteStatoOrdine(this.statoOrdine.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.StatoOrdine.labels', this.statoOrdine.objectKey]);
            this.navigateToPath(STATO_ORDINE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete statoOrdine.
     */
    public confirmDeleteStatoOrdine(): void {
        const dialogRef = this.dialog.open(DeleteStatoOrdineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteStatoOrdineById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.statoOrdineGroupApiService.statoOrdine.printPdfReport(this.statoOrdine.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-stato-ordine-dialog',
    templateUrl: 'delete-stato-ordine-dialog.html'
})
export class DeleteStatoOrdineDialog {
    constructor(public dialogRef: MatDialogRef<DeleteStatoOrdineDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

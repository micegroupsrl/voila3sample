import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { FornitoreApiService } from 'src/app/pages/services/services-fornitore/fornitore-api.service';
import { FornitoreGroupApiService } from 'src/app/pages/services/services-fornitore/fornitore-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { FORNITORE } from 'src/app/pages/costants/fornitore.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailFornitoreEditComponent } from './detail-fornitore-edit/detail-fornitore-edit.component';
import { DetailFornitoreViewComponent } from './detail-fornitore-view/detail-fornitore-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { fornitoreForm } from '../../forms/fornitore-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-fornitore',
    templateUrl: './detail-fornitore.component.html',
    styleUrls: ['./detail-fornitore.component.scss']
})
export class DetailFornitoreComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public fornitoreForm!: FormGroup;
    public fornitore!: IFornitore;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailFornitoreEditComponent) detailFornitoreEditComponent!: DetailFornitoreEditComponent;
    @ViewChild(DetailFornitoreViewComponent) detailFornitoreViewComponent!: DetailFornitoreViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private fornitoreGroupApiService: FornitoreGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.fornitoreForm = fornitoreForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getFornitoreById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Fornitore.
     */

    public insertFornitore(): void {
        this.overlaysService.loadingOn();
        const fornitore: IFornitore = this.fornitoreForm.value;
        let tabs = this.detailFornitoreEditComponent.getTabsValue();
        fornitore.theProdotto = tabs.theProdottoEditFe;
        this.fornitoreGroupApiService.fornitore.addFornitore(fornitore).subscribe((fornitoreResult: IFornitore) => {
            this.fornitore = fornitoreResult;
            if (this.fornitore) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Fornitore.labels', this.fornitore.objectKey]);
                this.navigateToPath(FORNITORE.PATH.DETAIL + this.fornitore.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getFornitoreById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.fornitoreGroupApiService.fornitore.getFornitoreById(id).subscribe(
                    (fornitoreResult: IFornitore) => {
                        this.fornitore = fornitoreResult;
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
        this.navigateToPath(FORNITORE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editFornitore(): void {
        this.navigateToPath(FORNITORE.PATH.DETAIL + this.fornitore.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Fornitore.
     */

    public updateFornitore(): void {
        const fornitore: IFornitore = this.detailFornitoreEditComponent.getFormValue();
        let tabs = this.detailFornitoreEditComponent.getTabsValue();
        fornitore.theProdotto = tabs.theProdottoEditFe;

        this.overlaysService.loadingOn();

        this.fornitoreGroupApiService.fornitore.updateFornitore(fornitore).subscribe((fornitoreResult: IFornitore) => {
            this.fornitore = fornitoreResult;

            if (this.fornitore) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Fornitore.labels', this.fornitore.objectKey]);
                this.navigateToPath(FORNITORE.PATH.DETAIL + this.fornitore.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete fornitore by id.
     */
    public deleteFornitoreById(): void {
        this.overlaysService.loadingOn();
        this.fornitoreGroupApiService.fornitore.deleteFornitore(this.fornitore.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Fornitore.labels', this.fornitore.objectKey]);
            this.navigateToPath(FORNITORE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete fornitore.
     */
    public confirmDeleteFornitore(): void {
        const dialogRef = this.dialog.open(DeleteFornitoreDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteFornitoreById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.fornitoreGroupApiService.fornitore.printPdfReport(this.fornitore.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-fornitore-dialog',
    templateUrl: 'delete-fornitore-dialog.html'
})
export class DeleteFornitoreDialog {
    constructor(public dialogRef: MatDialogRef<DeleteFornitoreDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

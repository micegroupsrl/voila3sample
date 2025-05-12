import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { TipoOrdineApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-api.service';
import { TipoOrdineGroupApiService } from 'src/app/pages/services/services-tipo-ordine/tipo-ordine-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { TIPO_ORDINE } from 'src/app/pages/costants/tipo-ordine.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailTipoOrdineEditComponent } from './detail-tipo-ordine-edit/detail-tipo-ordine-edit.component';
import { DetailTipoOrdineViewComponent } from './detail-tipo-ordine-view/detail-tipo-ordine-view.component';

import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { tipoOrdineForm } from '../../forms/tipo-ordine-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-tipo-ordine',
    templateUrl: './detail-tipo-ordine.component.html',
    styleUrls: ['./detail-tipo-ordine.component.scss']
})
export class DetailTipoOrdineComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public tipoOrdineForm!: FormGroup;
    public tipoOrdine!: ITipoOrdine;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailTipoOrdineEditComponent) detailTipoOrdineEditComponent!: DetailTipoOrdineEditComponent;
    @ViewChild(DetailTipoOrdineViewComponent) detailTipoOrdineViewComponent!: DetailTipoOrdineViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private tipoOrdineGroupApiService: TipoOrdineGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.tipoOrdineForm = tipoOrdineForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getTipoOrdineById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert TipoOrdine.
     */

    public insertTipoOrdine(): void {
        this.overlaysService.loadingOn();
        const tipoOrdine: ITipoOrdine = this.tipoOrdineForm.value;
        let tabs = this.detailTipoOrdineEditComponent.getTabsValue();
        tipoOrdine.theOrdine = tabs.theOrdineEditFe;
        this.tipoOrdineGroupApiService.tipoOrdine.addTipoOrdine(tipoOrdine).subscribe((tipoOrdineResult: ITipoOrdine) => {
            this.tipoOrdine = tipoOrdineResult;
            if (this.tipoOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.TipoOrdine.labels', this.tipoOrdine.objectKey]);
                this.navigateToPath(TIPO_ORDINE.PATH.DETAIL + this.tipoOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getTipoOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.tipoOrdineGroupApiService.tipoOrdine.getTipoOrdineById(id).subscribe(
                    (tipoOrdineResult: ITipoOrdine) => {
                        this.tipoOrdine = tipoOrdineResult;
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
        this.navigateToPath(TIPO_ORDINE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editTipoOrdine(): void {
        this.navigateToPath(TIPO_ORDINE.PATH.DETAIL + this.tipoOrdine.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update TipoOrdine.
     */

    public updateTipoOrdine(): void {
        const tipoOrdine: ITipoOrdine = this.detailTipoOrdineEditComponent.getFormValue();
        let tabs = this.detailTipoOrdineEditComponent.getTabsValue();
        tipoOrdine.theOrdine = tabs.theOrdineEditFe;

        this.overlaysService.loadingOn();

        this.tipoOrdineGroupApiService.tipoOrdine.updateTipoOrdine(tipoOrdine).subscribe((tipoOrdineResult: ITipoOrdine) => {
            this.tipoOrdine = tipoOrdineResult;

            if (this.tipoOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.TipoOrdine.labels', this.tipoOrdine.objectKey]);
                this.navigateToPath(TIPO_ORDINE.PATH.DETAIL + this.tipoOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete tipoOrdine by id.
     */
    public deleteTipoOrdineById(): void {
        this.overlaysService.loadingOn();
        this.tipoOrdineGroupApiService.tipoOrdine.deleteTipoOrdine(this.tipoOrdine.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.TipoOrdine.labels', this.tipoOrdine.objectKey]);
            this.navigateToPath(TIPO_ORDINE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete tipoOrdine.
     */
    public confirmDeleteTipoOrdine(): void {
        const dialogRef = this.dialog.open(DeleteTipoOrdineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteTipoOrdineById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.tipoOrdineGroupApiService.tipoOrdine.printPdfReport(this.tipoOrdine.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-tipo-ordine-dialog',
    templateUrl: 'delete-tipo-ordine-dialog.html'
})
export class DeleteTipoOrdineDialog {
    constructor(public dialogRef: MatDialogRef<DeleteTipoOrdineDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

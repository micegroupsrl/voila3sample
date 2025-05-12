import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { CategoriaOrdineApiService } from 'src/app/pages/services/services-categoria-ordine/categoria-ordine-api.service';
import { CategoriaOrdineGroupApiService } from 'src/app/pages/services/services-categoria-ordine/categoria-ordine-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { CATEGORIA_ORDINE } from 'src/app/pages/costants/categoria-ordine.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailCategoriaOrdineEditComponent } from './detail-categoria-ordine-edit/detail-categoria-ordine-edit.component';
import { DetailCategoriaOrdineViewComponent } from './detail-categoria-ordine-view/detail-categoria-ordine-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { categoriaOrdineForm } from '../../forms/categoria-ordine-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-categoria-ordine',
    templateUrl: './detail-categoria-ordine.component.html',
    styleUrls: ['./detail-categoria-ordine.component.scss']
})
export class DetailCategoriaOrdineComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public categoriaOrdineForm!: FormGroup;
    public categoriaOrdine!: ICategoriaOrdine;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailCategoriaOrdineEditComponent) detailCategoriaOrdineEditComponent!: DetailCategoriaOrdineEditComponent;
    @ViewChild(DetailCategoriaOrdineViewComponent) detailCategoriaOrdineViewComponent!: DetailCategoriaOrdineViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private categoriaOrdineGroupApiService: CategoriaOrdineGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.categoriaOrdineForm = categoriaOrdineForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getCategoriaOrdineById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert CategoriaOrdine.
     */

    public insertCategoriaOrdine(): void {
        this.overlaysService.loadingOn();
        const categoriaOrdine: ICategoriaOrdine = this.categoriaOrdineForm.value;
        let tabs = this.detailCategoriaOrdineEditComponent.getTabsValue();
        categoriaOrdine.theTipoOrdine = tabs.theTipoOrdineEditFe;
        this.categoriaOrdineGroupApiService.categoriaOrdine.addCategoriaOrdine(categoriaOrdine).subscribe((categoriaOrdineResult: ICategoriaOrdine) => {
            this.categoriaOrdine = categoriaOrdineResult;
            if (this.categoriaOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.CategoriaOrdine.labels', this.categoriaOrdine.objectKey]);
                this.navigateToPath(CATEGORIA_ORDINE.PATH.DETAIL + this.categoriaOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getCategoriaOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.categoriaOrdineGroupApiService.categoriaOrdine.getCategoriaOrdineById(id).subscribe(
                    (categoriaOrdineResult: ICategoriaOrdine) => {
                        this.categoriaOrdine = categoriaOrdineResult;
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
        this.navigateToPath(CATEGORIA_ORDINE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editCategoriaOrdine(): void {
        this.navigateToPath(CATEGORIA_ORDINE.PATH.DETAIL + this.categoriaOrdine.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update CategoriaOrdine.
     */

    public updateCategoriaOrdine(): void {
        const categoriaOrdine: ICategoriaOrdine = this.detailCategoriaOrdineEditComponent.getFormValue();
        let tabs = this.detailCategoriaOrdineEditComponent.getTabsValue();
        categoriaOrdine.theTipoOrdine = tabs.theTipoOrdineEditFe;

        this.overlaysService.loadingOn();

        this.categoriaOrdineGroupApiService.categoriaOrdine.updateCategoriaOrdine(categoriaOrdine).subscribe((categoriaOrdineResult: ICategoriaOrdine) => {
            this.categoriaOrdine = categoriaOrdineResult;

            if (this.categoriaOrdine) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.CategoriaOrdine.labels', this.categoriaOrdine.objectKey]);
                this.navigateToPath(CATEGORIA_ORDINE.PATH.DETAIL + this.categoriaOrdine.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete categoriaOrdine by id.
     */
    public deleteCategoriaOrdineById(): void {
        this.overlaysService.loadingOn();
        this.categoriaOrdineGroupApiService.categoriaOrdine.deleteCategoriaOrdine(this.categoriaOrdine.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.CategoriaOrdine.labels', this.categoriaOrdine.objectKey]);
            this.navigateToPath(CATEGORIA_ORDINE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete categoriaOrdine.
     */
    public confirmDeleteCategoriaOrdine(): void {
        const dialogRef = this.dialog.open(DeleteCategoriaOrdineDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteCategoriaOrdineById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.categoriaOrdineGroupApiService.categoriaOrdine.printPdfReport(this.categoriaOrdine.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-categoria-ordine-dialog',
    templateUrl: 'delete-categoria-ordine-dialog.html'
})
export class DeleteCategoriaOrdineDialog {
    constructor(public dialogRef: MatDialogRef<DeleteCategoriaOrdineDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

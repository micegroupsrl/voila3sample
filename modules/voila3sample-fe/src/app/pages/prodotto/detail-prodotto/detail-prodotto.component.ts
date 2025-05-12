import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { ProdottoApiService } from 'src/app/pages/services/services-prodotto/prodotto-api.service';
import { ProdottoGroupApiService } from 'src/app/pages/services/services-prodotto/prodotto-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { PRODOTTO } from 'src/app/pages/costants/prodotto.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailProdottoEditComponent } from './detail-prodotto-edit/detail-prodotto-edit.component';
import { DetailProdottoViewComponent } from './detail-prodotto-view/detail-prodotto-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { prodottoForm } from '../../forms/prodotto-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-prodotto',
    templateUrl: './detail-prodotto.component.html',
    styleUrls: ['./detail-prodotto.component.scss']
})
export class DetailProdottoComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public prodottoForm!: FormGroup;
    public prodotto!: IProdotto;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailProdottoEditComponent) detailProdottoEditComponent!: DetailProdottoEditComponent;
    @ViewChild(DetailProdottoViewComponent) detailProdottoViewComponent!: DetailProdottoViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private prodottoGroupApiService: ProdottoGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.prodottoForm = prodottoForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getProdottoById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Prodotto.
     */

    public insertProdotto(): void {
        this.overlaysService.loadingOn();
        const prodotto: IProdotto = this.prodottoForm.value;
        let tabs = this.detailProdottoEditComponent.getTabsValue();
        prodotto.theRigaOrdine = tabs.theRigaOrdineEditFe;
        this.prodottoGroupApiService.prodotto.addProdotto(prodotto).subscribe((prodottoResult: IProdotto) => {
            this.prodotto = prodottoResult;
            if (this.prodotto) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Prodotto.labels', this.prodotto.objectKey]);
                this.navigateToPath(PRODOTTO.PATH.DETAIL + this.prodotto.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getProdottoById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.prodottoGroupApiService.prodotto.getProdottoById(id).subscribe(
                    (prodottoResult: IProdotto) => {
                        this.prodotto = prodottoResult;
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
        this.navigateToPath(PRODOTTO.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editProdotto(): void {
        this.navigateToPath(PRODOTTO.PATH.DETAIL + this.prodotto.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Prodotto.
     */

    public updateProdotto(): void {
        const prodotto: IProdotto = this.detailProdottoEditComponent.getFormValue();
        let tabs = this.detailProdottoEditComponent.getTabsValue();
        prodotto.theRigaOrdine = tabs.theRigaOrdineEditFe;

        this.overlaysService.loadingOn();

        this.prodottoGroupApiService.prodotto.updateProdotto(prodotto).subscribe((prodottoResult: IProdotto) => {
            this.prodotto = prodottoResult;

            if (this.prodotto) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Prodotto.labels', this.prodotto.objectKey]);
                this.navigateToPath(PRODOTTO.PATH.DETAIL + this.prodotto.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete prodotto by id.
     */
    public deleteProdottoById(): void {
        this.overlaysService.loadingOn();
        this.prodottoGroupApiService.prodotto.deleteProdotto(this.prodotto.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Prodotto.labels', this.prodotto.objectKey]);
            this.navigateToPath(PRODOTTO.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete prodotto.
     */
    public confirmDeleteProdotto(): void {
        const dialogRef = this.dialog.open(DeleteProdottoDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteProdottoById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.prodottoGroupApiService.prodotto.printPdfReport(this.prodotto.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-prodotto-dialog',
    templateUrl: 'delete-prodotto-dialog.html'
})
export class DeleteProdottoDialog {
    constructor(public dialogRef: MatDialogRef<DeleteProdottoDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

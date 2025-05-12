import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { ClienteApiService } from 'src/app/pages/services/services-cliente/cliente-api.service';
import { ClienteGroupApiService } from 'src/app/pages/services/services-cliente/cliente-group-api.service';
import { OverlaysService } from 'src/app/utilities/services/overlays.service';
import { CLIENTE } from 'src/app/pages/costants/cliente.constant';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailClienteEditComponent } from './detail-cliente-edit/detail-cliente-edit.component';
import { DetailClienteViewComponent } from './detail-cliente-view/detail-cliente-view.component';
import { isInNewMode, isInViewEditMode } from 'src/app/shared/base/base.helper';
import { clienteForm } from '../../forms/cliente-form';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

@Component({
    selector: 'app-detail-cliente',
    templateUrl: './detail-cliente.component.html',
    styleUrls: ['./detail-cliente.component.scss']
})
export class DetailClienteComponent implements OnInit {
    PATH_EDIT = '/edit';
    PATH_VIEW = '/view';
    MSG_INSERT: string = 'messages.success.insert';
    MSG_UPDATE: string = 'messages.success.update';
    MSG_DELETE: string = 'messages.success.delete';
    CONF_DELETE: string = 'messages.confirm.delete';

    public clienteForm!: FormGroup;
    public cliente!: ICliente;
    public smartValidation: boolean = true;

    public pageStatus!: string;
    tabPageStatus!: string;
    data!: Data;
    Privileges = getPrivilegesEnum();

    /**
     * Child component.
     */
    @ViewChild(DetailClienteEditComponent) detailClienteEditComponent!: DetailClienteEditComponent;
    @ViewChild(DetailClienteViewComponent) detailClienteViewComponent!: DetailClienteViewComponent;

    constructor(
        private fb: FormBuilder,
        private overlaysService: OverlaysService,
        private activatedRoute: ActivatedRoute,
        private clienteGroupApiService: ClienteGroupApiService,
        private router: Router,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.overlaysService.loadingOff();
        this.clienteForm = clienteForm(this.fb);

        this.data = this.activatedRoute.snapshot.data;
        this.pageStatus = this.data['pageStatus'];

        this.getClienteById();

        if (isInNewMode(this.pageStatus)) this.overlaysService.loadingOff();
    }

    /**
     * Insert Cliente.
     */

    public insertCliente(): void {
        this.overlaysService.loadingOn();
        const cliente: ICliente = this.clienteForm.value;
        let tabs = this.detailClienteEditComponent.getTabsValue();
        cliente.theOrdine = tabs.theOrdineEditFe;
        this.clienteGroupApiService.cliente.addCliente(cliente).subscribe((clienteResult: ICliente) => {
            this.cliente = clienteResult;
            if (this.cliente) {
                this.overlaysService.toast.showMessage(this.MSG_INSERT, ['voila3sample.detail.Cliente.labels', this.cliente.objectKey]);
                this.navigateToPath(CLIENTE.PATH.DETAIL + this.cliente.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    public getClienteById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id) {
                this.overlaysService.loadingOn();
                this.clienteGroupApiService.cliente.getClienteById(id).subscribe(
                    (clienteResult: ICliente) => {
                        this.cliente = clienteResult;
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
        this.navigateToPath(CLIENTE.PATH.LIST, this.router);
    }
    /**
     * Go to edit page.
     */
    public editCliente(): void {
        this.navigateToPath(CLIENTE.PATH.DETAIL + this.cliente.objectKey + this.PATH_EDIT, this.router);
    }

    /**
     * Update Cliente.
     */

    public updateCliente(): void {
        const cliente: ICliente = this.detailClienteEditComponent.getFormValue();
        let tabs = this.detailClienteEditComponent.getTabsValue();
        cliente.theOrdine = tabs.theOrdineEditFe;

        this.overlaysService.loadingOn();

        this.clienteGroupApiService.cliente.updateCliente(cliente).subscribe((clienteResult: ICliente) => {
            this.cliente = clienteResult;

            if (this.cliente) {
                this.overlaysService.toast.showMessage(this.MSG_UPDATE, ['voila3sample.detail.Cliente.labels', this.cliente.objectKey]);
                this.navigateToPath(CLIENTE.PATH.DETAIL + this.cliente.objectKey + this.PATH_VIEW, this.router);
            }
        });
    }

    /**
     * Delete cliente by id.
     */
    public deleteClienteById(): void {
        this.overlaysService.loadingOn();
        this.clienteGroupApiService.cliente.deleteCliente(this.cliente.objectKey).subscribe(() => {
            this.overlaysService.toast.showMessage(this.MSG_DELETE, ['voila3sample.detail.Cliente.labels', this.cliente.objectKey]);
            this.navigateToPath(CLIENTE.PATH.LIST, this.router);
            this.overlaysService.loadingOff();
        });
    }

    /**
     * Confirm delete cliente.
     */
    public confirmDeleteCliente(): void {
        const dialogRef = this.dialog.open(DeleteClienteDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.deleteClienteById();
        });
    }

    navigateToPath(path: string, router: Router) {
        router.navigate([path]);
    }

    public printPdfReport(): void {
        this.clienteGroupApiService.cliente.printPdfReport(this.cliente.objectKey);
    }
}

// Dialog di conferma eliminazione
@Component({
    selector: 'delete-cliente-dialog',
    templateUrl: 'delete-cliente-dialog.html'
})
export class DeleteClienteDialog {
    constructor(public dialogRef: MatDialogRef<DeleteClienteDialog>) {}

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(true);
    }
}

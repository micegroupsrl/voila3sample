import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { TabsClienteComponent } from '../tabs-cliente/tabs-cliente.component';
import { ClienteGroupApiService } from '../../../services/services-cliente/cliente-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-cliente-edit',
    templateUrl: './detail-cliente-edit.component.html',
    styleUrls: ['./detail-cliente-edit.component.scss']
})
export class DetailClienteEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsClienteComponent) tabsCliente!: TabsClienteComponent;

    @Input()
    public clienteForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public cliente!: ICliente;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private clienteGroupApiService: ClienteGroupApiService
    ) {
        super();
    }

    /**
     * Open Dialog.
     */
    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    /**
     * Return the tabs value for the current entity.
     */
    public getTabsValue() {
        return this.tabsCliente.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['cliente'];
        if (entityChanges?.currentValue) {
            this.cliente = entityChanges.currentValue;
            this.patchValueForm(this.cliente);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.clienteForm.getRawValue();
    }

    public patchValueForm(cliente: ICliente) {
        this.clienteForm.patchValue({
            idPersona: cliente.idPersona,
            codiceFiscale: cliente.codiceFiscale,
            email: cliente.email,
            telefono: cliente.telefono,
            indirizzo: cliente.indirizzo
        });
        this.clienteForm.get('idPersona')?.disable();
        this.clienteForm.get('codiceFiscale')?.disable();
    }
}

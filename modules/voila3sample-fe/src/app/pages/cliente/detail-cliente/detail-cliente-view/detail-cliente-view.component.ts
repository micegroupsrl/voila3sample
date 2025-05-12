import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';

@Component({
    selector: 'app-detail-cliente-view',
    templateUrl: './detail-cliente-view.component.html',
    styleUrls: ['./detail-cliente-view.component.scss']
})
export class DetailClienteViewComponent implements OnChanges {
    //Vengono passati al tabs-cliente
    @Input()
    public clienteForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public cliente!: ICliente;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Cliente change: ', this.cliente);
    }
    /**
     * Page changes.
     */
    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }
    /**
     * Entity changes.
     */
    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['cliente'];
        if (entityChanges?.currentValue) {
            this.cliente = entityChanges.currentValue;
        }
    }
}

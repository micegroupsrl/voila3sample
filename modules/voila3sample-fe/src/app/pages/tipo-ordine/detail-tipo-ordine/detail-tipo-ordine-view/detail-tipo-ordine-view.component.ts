import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';

@Component({
    selector: 'app-detail-tipo-ordine-view',
    templateUrl: './detail-tipo-ordine-view.component.html',
    styleUrls: ['./detail-tipo-ordine-view.component.scss']
})
export class DetailTipoOrdineViewComponent implements OnChanges {
    //Vengono passati al tabs-tipoOrdine
    @Input()
    public tipoOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public tipoOrdine!: ITipoOrdine;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('TipoOrdine change: ', this.tipoOrdine);
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
        const entityChanges: SimpleChange = changes['tipoOrdine'];
        if (entityChanges?.currentValue) {
            this.tipoOrdine = entityChanges.currentValue;
        }
    }
}

import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IStatoOrdine } from 'src/app/pages/interfaces/stato-ordine.interface';

@Component({
    selector: 'app-detail-stato-ordine-view',
    templateUrl: './detail-stato-ordine-view.component.html',
    styleUrls: ['./detail-stato-ordine-view.component.scss']
})
export class DetailStatoOrdineViewComponent implements OnChanges {
    //Vengono passati al tabs-statoOrdine
    @Input()
    public statoOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public statoOrdine!: IStatoOrdine;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('StatoOrdine change: ', this.statoOrdine);
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
        const entityChanges: SimpleChange = changes['statoOrdine'];
        if (entityChanges?.currentValue) {
            this.statoOrdine = entityChanges.currentValue;
        }
    }
}

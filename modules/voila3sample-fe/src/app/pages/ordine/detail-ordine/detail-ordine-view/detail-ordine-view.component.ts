import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';

@Component({
    selector: 'app-detail-ordine-view',
    templateUrl: './detail-ordine-view.component.html',
    styleUrls: ['./detail-ordine-view.component.scss']
})
export class DetailOrdineViewComponent implements OnChanges {
    //Vengono passati al tabs-ordine
    @Input()
    public ordineForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public ordine!: IOrdine;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Ordine change: ', this.ordine);
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
        const entityChanges: SimpleChange = changes['ordine'];
        if (entityChanges?.currentValue) {
            this.ordine = entityChanges.currentValue;
        }
    }
}

import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRigaOrdine } from 'src/app/pages/interfaces/riga-ordine.interface';

@Component({
    selector: 'app-detail-riga-ordine-view',
    templateUrl: './detail-riga-ordine-view.component.html',
    styleUrls: ['./detail-riga-ordine-view.component.scss']
})
export class DetailRigaOrdineViewComponent implements OnChanges {
    //Vengono passati al tabs-rigaOrdine
    @Input()
    public rigaOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public rigaOrdine!: IRigaOrdine;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('RigaOrdine change: ', this.rigaOrdine);
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
        const entityChanges: SimpleChange = changes['rigaOrdine'];
        if (entityChanges?.currentValue) {
            this.rigaOrdine = entityChanges.currentValue;
        }
    }
}

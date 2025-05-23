import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';

@Component({
    selector: 'app-detail-fornitore-view',
    templateUrl: './detail-fornitore-view.component.html',
    styleUrls: ['./detail-fornitore-view.component.scss']
})
export class DetailFornitoreViewComponent implements OnChanges {
    //Vengono passati al tabs-fornitore
    @Input()
    public fornitoreForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public fornitore!: IFornitore;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Fornitore change: ', this.fornitore);
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
        const entityChanges: SimpleChange = changes['fornitore'];
        if (entityChanges?.currentValue) {
            this.fornitore = entityChanges.currentValue;
        }
    }
}

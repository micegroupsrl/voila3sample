import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';

@Component({
    selector: 'app-detail-prodotto-view',
    templateUrl: './detail-prodotto-view.component.html',
    styleUrls: ['./detail-prodotto-view.component.scss']
})
export class DetailProdottoViewComponent implements OnChanges {
    //Vengono passati al tabs-prodotto
    @Input()
    public prodottoForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public prodotto!: IProdotto;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('Prodotto change: ', this.prodotto);
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
        const entityChanges: SimpleChange = changes['prodotto'];
        if (entityChanges?.currentValue) {
            this.prodotto = entityChanges.currentValue;
        }
    }
}

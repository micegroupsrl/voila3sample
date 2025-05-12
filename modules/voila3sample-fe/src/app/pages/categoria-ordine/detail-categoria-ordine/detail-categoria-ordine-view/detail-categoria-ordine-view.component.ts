import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';

@Component({
    selector: 'app-detail-categoria-ordine-view',
    templateUrl: './detail-categoria-ordine-view.component.html',
    styleUrls: ['./detail-categoria-ordine-view.component.scss']
})
export class DetailCategoriaOrdineViewComponent implements OnChanges {
    //Vengono passati al tabs-categoriaOrdine
    @Input()
    public categoriaOrdineForm!: FormGroup;

    @Input()
    public pageStatus!: string;

    //input interfaccia
    @Input()
    public categoriaOrdine!: ICategoriaOrdine;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
        console.log('CategoriaOrdine change: ', this.categoriaOrdine);
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
        const entityChanges: SimpleChange = changes['categoriaOrdine'];
        if (entityChanges?.currentValue) {
            this.categoriaOrdine = entityChanges.currentValue;
        }
    }
}

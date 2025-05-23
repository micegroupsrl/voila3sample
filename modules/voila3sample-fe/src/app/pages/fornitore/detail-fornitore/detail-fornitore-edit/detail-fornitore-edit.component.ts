import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { TabsFornitoreComponent } from '../tabs-fornitore/tabs-fornitore.component';
import { FornitoreGroupApiService } from '../../../services/services-fornitore/fornitore-group-api.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail.component';

@Component({
    selector: 'app-detail-fornitore-edit',
    templateUrl: './detail-fornitore-edit.component.html',
    styleUrls: ['./detail-fornitore-edit.component.scss']
})
export class DetailFornitoreEditComponent extends BaseDetailComponent implements OnChanges {
    @ViewChild(TabsFornitoreComponent) tabsFornitore!: TabsFornitoreComponent;

    @Input()
    public fornitoreForm!: FormGroup;

    @Input()
    public pageStatus!: string;
    @Input()
    public fornitore!: IFornitore;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private fornitoreGroupApiService: FornitoreGroupApiService
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
        return this.tabsFornitore.tabs;
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['fornitore'];
        if (entityChanges?.currentValue) {
            this.fornitore = entityChanges.currentValue;
            this.patchValueForm(this.fornitore);
        }
    }

    /**
     * Get Form.
     */
    public getFormValue() {
        return this.fornitoreForm.getRawValue();
    }

    public patchValueForm(fornitore: IFornitore) {
        this.fornitoreForm.patchValue({
            idPersona: fornitore.idPersona,
            cf: fornitore.cf,
            piva: fornitore.piva,
            nome: fornitore.nome,
            cognome: fornitore.cognome,
            email: fornitore.email,
            telefono: fornitore.telefono
        });
        this.fornitoreForm.get('idPersona')?.disable();
        this.fornitoreForm.get('cf')?.disable();
    }
}

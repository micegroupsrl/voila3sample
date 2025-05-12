import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { TabRigaOrdineEditFeComponent } from './tab-riga-ordine-edit-fe/tab-riga-ordine-edit-fe.component';
import { TabRigaOrdineViewComponent } from './tab-riga-ordine-view/tab-riga-ordine-view.component';

@Component({
    selector: 'app-tabs-prodotto',
    templateUrl: './tabs-prodotto.component.html',
    styleUrls: ['./tabs-prodotto.component.scss']
})
export class TabsProdottoComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabRigaOrdineEditFeComponent) tabeditferigaOrdine!: TabRigaOrdineEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IProdotto;

    @Input()
    public pageStatus!: string;

    readonly!: boolean;

    // private lastTabIndex: number = 0;

    // public get Privileges(): any {
    //       return getPrivilegesEnum();
    //   }

    // ngAfterViewInit() {
    //     // Seleziona il primo tab quando il componente è stato creato
    //     this.tabgroup.selectedIndex = 0;
    //     this.activeTab = this.tabgroup._tabs.first;
    // }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    /**
     * Get tabs from children.
     */

    get tabs() {
        let tabs = {
            // theRigaOrdine: this.tabeditrigaOrdine.getValueForm(),
            theRigaOrdineEditFe: this.tabeditferigaOrdine.getValueForm()
        };
        return tabs;
    }

    get theRigaOrdine() {
        return this.tabeditferigaOrdine.theRigaOrdine;
    }

    /**
     * Status changes.
     */
    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes['pageStatus'];
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    /**
     * Entity changes.
     */
    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes['entity'];
        if (entityChanges?.currentValue) {
            this.entity = entityChanges.currentValue;
        }
    }
    /**
     * Tab changes.
     */
    public onTabChanged(event: any): void {
        this.activeTab = event;
    }
}

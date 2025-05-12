import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { TabRigaOrdineEditFeComponent } from './tab-riga-ordine-edit-fe/tab-riga-ordine-edit-fe.component';
import { TabRigaOrdineViewComponent } from './tab-riga-ordine-view/tab-riga-ordine-view.component';
import { TabOrdineFiglioEditFeComponent } from './tab-ordine-figlio-edit-fe/tab-ordine-figlio-edit-fe.component';
import { TabOrdineFiglioViewComponent } from './tab-ordine-figlio-view/tab-ordine-figlio-view.component';

@Component({
    selector: 'app-tabs-ordine',
    templateUrl: './tabs-ordine.component.html',
    styleUrls: ['./tabs-ordine.component.scss']
})
export class TabsOrdineComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabRigaOrdineEditFeComponent) tabeditferigaOrdine!: TabRigaOrdineEditFeComponent;
    @ViewChild(TabOrdineFiglioEditFeComponent) tabeditfeordineFiglio!: TabOrdineFiglioEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IOrdine;

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
            theRigaOrdineEditFe: this.tabeditferigaOrdine.getValueForm(),
            // theOrdineFiglio: this.tabeditordineFiglio.theOrdineFiglio.getRawValue(),
            theOrdineFiglioEditFe: this.tabeditfeordineFiglio.getValueForm()
        };
        return tabs;
    }

    get theRigaOrdine() {
        return this.tabeditferigaOrdine.theRigaOrdine;
    }

    get theOrdineFiglio() {
        return this.tabeditfeordineFiglio.theOrdineFiglio;
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

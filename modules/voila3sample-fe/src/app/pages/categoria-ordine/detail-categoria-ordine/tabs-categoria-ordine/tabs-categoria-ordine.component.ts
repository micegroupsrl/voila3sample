import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { ICategoriaOrdine } from 'src/app/pages/interfaces/categoria-ordine.interface';
import { TabTipoOrdineEditFeComponent } from './tab-tipo-ordine-edit-fe/tab-tipo-ordine-edit-fe.component';
import { TabTipoOrdineViewComponent } from './tab-tipo-ordine-view/tab-tipo-ordine-view.component';

@Component({
    selector: 'app-tabs-categoria-ordine',
    templateUrl: './tabs-categoria-ordine.component.html',
    styleUrls: ['./tabs-categoria-ordine.component.scss']
})
export class TabsCategoriaOrdineComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabTipoOrdineEditFeComponent) tabeditfetipoOrdine!: TabTipoOrdineEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: ICategoriaOrdine;

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
            // theTipoOrdine: this.tabedittipoOrdine.getValueForm(),
            theTipoOrdineEditFe: this.tabeditfetipoOrdine.getValueForm()
        };
        return tabs;
    }

    get theTipoOrdine() {
        return this.tabeditfetipoOrdine.theTipoOrdine;
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

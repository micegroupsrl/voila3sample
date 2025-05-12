import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { TabOrdineEditFeComponent } from './tab-ordine-edit-fe/tab-ordine-edit-fe.component';
import { TabOrdineViewComponent } from './tab-ordine-view/tab-ordine-view.component';

@Component({
    selector: 'app-tabs-cliente',
    templateUrl: './tabs-cliente.component.html',
    styleUrls: ['./tabs-cliente.component.scss']
})
export class TabsClienteComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabOrdineEditFeComponent) tabeditfeordine!: TabOrdineEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: ICliente;

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
            // theOrdine: this.tabeditordine.theOrdine.getRawValue(),
            theOrdineEditFe: this.tabeditfeordine.getValueForm()
        };
        return tabs;
    }

    get theOrdine() {
        return this.tabeditfeordine.theOrdine;
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

import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { IPrivilege } from 'src/app/pages/interfaces/privilege.interface';
import { TabPrivilegePerRoleEditFeComponent } from './tab-privilege-per-role-edit-fe/tab-privilege-per-role-edit-fe.component';
import { TabPrivilegePerRoleViewComponent } from './tab-privilege-per-role-view/tab-privilege-per-role-view.component';

@Component({
    selector: 'app-tabs-privilege',
    templateUrl: './tabs-privilege.component.html',
    styleUrls: ['./tabs-privilege.component.scss']
})
export class TabsPrivilegeComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabPrivilegePerRoleEditFeComponent) tabeditfeprivilegePerRole!: TabPrivilegePerRoleEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IPrivilege;

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
            // thePrivilegePerRole: this.tabeditprivilegePerRole.getValueForm(),
            thePrivilegePerRoleEditFe: this.tabeditfeprivilegePerRole.getValueForm()
        };
        return tabs;
    }

    get thePrivilegePerRole() {
        return this.tabeditfeprivilegePerRole.thePrivilegePerRole;
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

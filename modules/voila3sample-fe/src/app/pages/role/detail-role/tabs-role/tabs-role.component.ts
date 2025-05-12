import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { IRole } from 'src/app/pages/interfaces/role.interface';
import { TabPrivilegePerRoleEditFeComponent } from './tab-privilege-per-role-edit-fe/tab-privilege-per-role-edit-fe.component';
import { TabPrivilegePerRoleViewComponent } from './tab-privilege-per-role-view/tab-privilege-per-role-view.component';
import { TabRolePerUserEditFeComponent } from './tab-role-per-user-edit-fe/tab-role-per-user-edit-fe.component';
import { TabRolePerUserViewComponent } from './tab-role-per-user-view/tab-role-per-user-view.component';
import { TabRoleRoleChildEditFeComponent } from './tab-role-role-child-edit-fe/tab-role-role-child-edit-fe.component';
import { TabRoleRoleChildViewComponent } from './tab-role-role-child-view/tab-role-role-child-view.component';

@Component({
    selector: 'app-tabs-role',
    templateUrl: './tabs-role.component.html',
    styleUrls: ['./tabs-role.component.scss']
})
export class TabsRoleComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabPrivilegePerRoleEditFeComponent) tabeditfeprivilegePerRole!: TabPrivilegePerRoleEditFeComponent;
    @ViewChild(TabRolePerUserEditFeComponent) tabeditferolePerUser!: TabRolePerUserEditFeComponent;
    @ViewChild(TabRoleRoleChildEditFeComponent) tabeditferoleRoleChild!: TabRoleRoleChildEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IRole;

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
            thePrivilegePerRoleEditFe: this.tabeditfeprivilegePerRole.getValueForm(),
            // theRolePerUser: this.tabeditrolePerUser.getValueForm(),
            theRolePerUserEditFe: this.tabeditferolePerUser.getValueForm(),
            // theRoleRoleChild: this.tabeditroleRoleChild.theRoleRoleChild.getRawValue(),
            theRoleRoleChildEditFe: this.tabeditferoleRoleChild.getValueForm()
        };
        return tabs;
    }

    get thePrivilegePerRole() {
        return this.tabeditfeprivilegePerRole.thePrivilegePerRole;
    }

    get theRolePerUser() {
        return this.tabeditferolePerUser.theRolePerUser;
    }

    get theRoleRoleChild() {
        return this.tabeditferoleRoleChild.theRoleRoleChild;
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

import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup, _MatTabNavBase } from '@angular/material/tabs';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { TabRolePerUserEditFeComponent } from './tab-role-per-user-edit-fe/tab-role-per-user-edit-fe.component';
import { TabRolePerUserViewComponent } from './tab-role-per-user-view/tab-role-per-user-view.component';

@Component({
    selector: 'app-tabs-user',
    templateUrl: './tabs-user.component.html',
    styleUrls: ['./tabs-user.component.scss']
})
export class TabsUserComponent implements OnChanges {
    // public privileges: string[] = getPrivileges();
    @ViewChild(MatTabGroup) tabgroup!: MatTabGroup;
    // @ViewChild(MatTab) firsttab!: MatTab;
    @ViewChild(TabRolePerUserEditFeComponent) tabeditferolePerUser!: TabRolePerUserEditFeComponent;

    public activeTab!: MatTab;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IUser;

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
            // theRolePerUser: this.tabeditrolePerUser.getValueForm(),
            theRolePerUserEditFe: this.tabeditferolePerUser.getValueForm()
        };
        return tabs;
    }

    get theRolePerUser() {
        return this.tabeditferolePerUser.theRolePerUser;
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

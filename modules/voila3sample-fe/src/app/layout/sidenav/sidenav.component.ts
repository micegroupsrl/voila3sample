import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MENU_HOME } from 'src/app/home-menu';
import { MENU_MS_VOILA3SAMPLE } from '../../pages/voila3sample-menu';
import { MenuElement } from 'src/app/shared/base/base.menu-element';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

/**
 * You can add here the menu of a MicroService.
 */

const MS_MENU_ITEMS: MenuElement[] = [...MENU_HOME, ...MENU_MS_VOILA3SAMPLE];

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
    @Output() snav: EventEmitter<void> = new EventEmitter<void>();
    @Input() mobile: any;
    @Input() roles: any;
    activeNode: any;
    permissionMenu = new MatTreeNestedDataSource<MenuElement>();

    treeControl = new NestedTreeControl<MenuElement>(node => node.children);
    dataSource = new MatTreeNestedDataSource<MenuElement>();
    rolesList: string[] | undefined;
    private subscriptions = new Subscription();

    constructor(private cookieService: CookieService) {
        if (this.cookieService.check('voila3sampleCookie') && this.cookieService.check('user')) {
            let user = this.cookieService.get('user').split('/');
            this.rolesList = user[2].split(',').map(priv => priv.replace('ROLE_', ''));
            this.dataSource.data = this.filterNodesWithPrivileges(MS_MENU_ITEMS);

            console.log(this.rolesList);
        }
    }

    ngOnInit() {
        if (!this.cookieService.check('voila3sampleCookie') && environment.securityOn) {
            this.snav.emit();
        }
        this.menuPrivileges();
    }

    clickMenu() {
        console.log(this.mobile);
        if (this.mobile) {
            this.snav.emit();
        }
    }

    menuPrivileges() {
        if (environment.securityOn) {
            this.permissionMenu.data = this.filterNodesWithPrivileges(this.dataSource.data);
        } else this.permissionMenu.data = MS_MENU_ITEMS.filter(node => node.label != 'Security');
    }

    hasChild = (_: number, node: MenuElement) => !!node.children && node.children.length > 0;

    filterNodesWithPrivileges(nodes: MenuElement[]): any[] {
        let result = nodes
            .map(node => {
                if (this.hasChild(0, node)) {
                    // Se il nodo ha figli, applica la ricorsione
                    const filteredChildren = this.filterNodesWithPrivileges(node.children || []);
                    return {
                        ...node,
                        children: filteredChildren.length > 0 ? filteredChildren : null
                    };
                } else {
                    // Se il nodo non ha figli, verifica i privilegi. Il privilegio 0 e' per l'elemento HOME
                    if (this.rolesList!.includes(node.expectedPrivilege!) || node.expectedPrivilege == '0') {
                        return node;
                    }
                    return null; // Ritorna null per indicare che il nodo non ha i privilegi
                }
            })
            .filter(filteredNode => filteredNode !== null) // Rimuovi i nodi senza privilegi
            .filter(node => node?.children !== null); // Rimuovi i nodi padri senza figli
        return result;
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}

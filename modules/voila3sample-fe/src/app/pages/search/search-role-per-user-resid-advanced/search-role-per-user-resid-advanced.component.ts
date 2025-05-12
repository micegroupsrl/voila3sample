import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RolePerUserGroupApiService } from 'src/app/pages/services/services-role-per-user/role-per-user-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

import { IRole } from 'src/app/pages/interfaces/role.interface';
import { IUser } from 'src/app/pages/interfaces/user.interface';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-role-per-user-resid-advanced',
    templateUrl: './search-role-per-user-resid-advanced.component.html',
    styleUrls: ['./search-role-per-user-resid-advanced.component.scss']
})
export class SearchRolePerUserResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idRole', type: 'select', api: ['uguale'], parentList: [], parent: 'role' },
        { name: 'idUser', type: 'select', api: ['uguale'], parentList: [], parent: 'user' }
    ];
    public roleList: IRole[] = [];
    public userList: IUser[] = [];

    constructor(
        public rolePerUserDialogRef: MatDialogRef<SearchRolePerUserResidAdvancedComponent>,
        private rolePerUserGroupApiService: RolePerUserGroupApiService,
        private rolePerUserFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(rolePerUserDialogRef, rolePerUserFb, changeDetector, dialog, data);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
        this.getParentsList();
    }

    // Get the filter value and define when get them
    public getFilter(): any {
        const searchRolePerUser = this.searchForm.value;
        if (!searchRolePerUser) {
            return null;
        }

        const filters = this.filtersFormArray;
        let filterBuild = new FilterBuilder();

        for (let i = 0; i < filters.length; i++) {
            const { filterType, apiType, orAnd, value } = this.getFilterGroupAtIndex(i).value;
            filterBuild = this.apiTypeSwitchCase(filterBuild, filterType, apiType, orAnd, value);
            filterBuild = this.filterTypeCase(filterBuild, filterType, apiType, orAnd, value);
        }
        return filterBuild.value();
    }
    public apiTypeSwitchCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        switch (apiType) {
            case 'contiene':
                filterBuild[orAnd ? 'andLike' : 'orLike'](filterType, value);
                break;
            case 'minoreDi':
            case 'precedenteA':
                filterBuild[orAnd ? 'andLessOrEqual' : 'orLessOrEqual'](filterType, value);
                break;
            case 'maggioreDi':
            case 'successivaA':
                filterBuild[orAnd ? 'andGreaterOrEqual' : 'orGreaterOrEqual'](filterType, value);
                break;
            case 'uguale':
                if (filterType != 'idRole' && filterType != 'idUser') {
                    filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);
                }
                break;
            default:
                break;
        }
        return filterBuild;
    }
    public filterTypeCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        if (filterType == 'idRole') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theRole', value);
        }
        if (filterType == 'idUser') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theUser', value);
        }
        return filterBuild;
    }
    public getRoleList(): void {
        this.rolePerUserGroupApiService.role.getRoleByCriteria().subscribe(data => {
            this.roleList = getListForDropdowns(data);
            this.addListToAttribute('role', this.roleList);
        });
    }
    public getUserList(): void {
        this.rolePerUserGroupApiService.user.getUserByCriteria().subscribe(data => {
            this.userList = getListForDropdowns(data);
            this.addListToAttribute('user', this.userList);
        });
    }

    private getParentsList(): void {
        this.getRoleList();
        this.getUserList();
    }
}

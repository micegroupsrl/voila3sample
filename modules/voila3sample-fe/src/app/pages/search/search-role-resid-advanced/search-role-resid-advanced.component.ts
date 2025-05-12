import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RoleGroupApiService } from 'src/app/pages/services/services-role/role-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

import { IRole } from 'src/app/pages/interfaces/role.interface';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-role-resid-advanced',
    templateUrl: './search-role-resid-advanced.component.html',
    styleUrls: ['./search-role-resid-advanced.component.scss']
})
export class SearchRoleResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'roleId', type: 'string', api: ['contiene'] },
        { name: 'name', type: 'string', api: ['contiene'] },
        { name: 'theRoleRoleGroup', type: 'select', api: ['uguale'], parentList: [], parent: 'roleRoleGroup' }
    ];
    public roleRoleGroupList: IRole[] = [];

    constructor(
        public roleDialogRef: MatDialogRef<SearchRoleResidAdvancedComponent>,
        private roleGroupApiService: RoleGroupApiService,
        private roleFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(roleDialogRef, roleFb, changeDetector, dialog, data);
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
        const searchRole = this.searchForm.value;
        if (!searchRole) {
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
                filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);

                break;
            default:
                break;
        }
        return filterBuild;
    }
    public filterTypeCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        if (filterType == 'theroleRoleGroup') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theRoleRoleGroup.idRole', value);
        }
        return filterBuild;
    }
    public getRoleRoleGroupList(): void {
        this.roleGroupApiService.role.getRoleByCriteria().subscribe(data => {
            this.roleRoleGroupList = getListForDropdowns(data);
            this.addListToAttribute('roleRoleGroup', this.roleRoleGroupList);
        });
    }

    private getParentsList(): void {
        this.getRoleRoleGroupList();
    }
}

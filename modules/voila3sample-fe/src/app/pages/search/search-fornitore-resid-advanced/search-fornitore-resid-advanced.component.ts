import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { FornitoreGroupApiService } from 'src/app/pages/services/services-fornitore/fornitore-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

@Component({
    selector: 'app-search-fornitore-resid-advanced',
    templateUrl: './search-fornitore-resid-advanced.component.html',
    styleUrls: ['./search-fornitore-resid-advanced.component.scss']
})
export class SearchFornitoreResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idPersona.idPersona', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'], parent: 'idPersona' },
        { name: 'idPersona.cf', type: 'string', api: ['contiene'], parent: 'cf' },
        { name: 'piva', type: 'string', api: ['contiene'] },
        { name: 'nome', type: 'string', api: ['contiene'] },
        { name: 'cognome', type: 'string', api: ['contiene'] },
        { name: 'email', type: 'string', api: ['contiene'] },
        { name: 'telefono', type: 'string', api: ['contiene'] }
    ];

    constructor(
        public fornitoreDialogRef: MatDialogRef<SearchFornitoreResidAdvancedComponent>,
        private fornitoreGroupApiService: FornitoreGroupApiService,
        private fornitoreFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(fornitoreDialogRef, fornitoreFb, changeDetector, dialog, data);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
    }

    // Get the filter value and define when get them
    public getFilter(): any {
        const searchFornitore = this.searchForm.value;
        if (!searchFornitore) {
            return null;
        }

        const filters = this.filtersFormArray;
        let filterBuild = new FilterBuilder();

        for (let i = 0; i < filters.length; i++) {
            const { filterType, apiType, orAnd, value } = this.getFilterGroupAtIndex(i).value;
            filterBuild = this.apiTypeSwitchCase(filterBuild, filterType, apiType, orAnd, value);
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
}

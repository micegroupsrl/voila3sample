import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { CategoriaOrdineGroupApiService } from 'src/app/pages/services/services-categoria-ordine/categoria-ordine-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

@Component({
    selector: 'app-search-categoria-ordine-resid-advanced',
    templateUrl: './search-categoria-ordine-resid-advanced.component.html',
    styleUrls: ['./search-categoria-ordine-resid-advanced.component.scss']
})
export class SearchCategoriaOrdineResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idCatOrdine', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'] }
    ];

    constructor(
        public categoriaOrdineDialogRef: MatDialogRef<SearchCategoriaOrdineResidAdvancedComponent>,
        private categoriaOrdineGroupApiService: CategoriaOrdineGroupApiService,
        private categoriaOrdineFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(categoriaOrdineDialogRef, categoriaOrdineFb, changeDetector, dialog, data);
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
        const searchCategoriaOrdine = this.searchForm.value;
        if (!searchCategoriaOrdine) {
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

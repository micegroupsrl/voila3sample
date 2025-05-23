import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { ProdottoGroupApiService } from 'src/app/pages/services/services-prodotto/prodotto-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

import { IFornitore } from 'src/app/pages/interfaces/fornitore.interface';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-prodotto-resid-advanced',
    templateUrl: './search-prodotto-resid-advanced.component.html',
    styleUrls: ['./search-prodotto-resid-advanced.component.scss']
})
export class SearchProdottoResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idProdotto', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'] },
        { name: 'descrizione', type: 'string', api: ['contiene'] },
        { name: 'createdBy', type: 'string', api: ['contiene'] },
        { name: 'lastModifiedBy', type: 'string', api: ['contiene'] },
        { name: 'createdDate', type: 'datetime', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'lastModifiedDate', type: 'datetime', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'idFornitore', type: 'select', api: ['uguale'], parentList: [], parent: 'fornitore' }
    ];
    public fornitoreList: IFornitore[] = [];

    constructor(
        public prodottoDialogRef: MatDialogRef<SearchProdottoResidAdvancedComponent>,
        private prodottoGroupApiService: ProdottoGroupApiService,
        private prodottoFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(prodottoDialogRef, prodottoFb, changeDetector, dialog, data);
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
        const searchProdotto = this.searchForm.value;
        if (!searchProdotto) {
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
                if (filterType != 'idFornitore') {
                    filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);
                }
                break;
            default:
                break;
        }
        return filterBuild;
    }
    public filterTypeCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        if (filterType == 'idFornitore') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theFornitore', value);
        }
        return filterBuild;
    }
    public getFornitoreList(): void {
        this.prodottoGroupApiService.fornitore.getFornitoreByCriteria().subscribe(data => {
            this.fornitoreList = getListForDropdowns(data);
            this.addListToAttribute('fornitore', this.fornitoreList);
        });
    }

    private getParentsList(): void {
        this.getFornitoreList();
    }
}

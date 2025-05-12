import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { RigaOrdineGroupApiService } from 'src/app/pages/services/services-riga-ordine/riga-ordine-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

import { IProdotto } from 'src/app/pages/interfaces/prodotto.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-riga-ordine-resid-advanced',
    templateUrl: './search-riga-ordine-resid-advanced.component.html',
    styleUrls: ['./search-riga-ordine-resid-advanced.component.scss']
})
export class SearchRigaOrdineResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'quantita', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'] },
        { name: 'idProdotto', type: 'select', api: ['uguale'], parentList: [], parent: 'prodotto' },
        { name: 'idOrdine', type: 'select', api: ['uguale'], parentList: [], parent: 'ordine' }
    ];
    public prodottoList: IProdotto[] = [];
    public ordineList: IOrdine[] = [];

    constructor(
        public rigaOrdineDialogRef: MatDialogRef<SearchRigaOrdineResidAdvancedComponent>,
        private rigaOrdineGroupApiService: RigaOrdineGroupApiService,
        private rigaOrdineFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(rigaOrdineDialogRef, rigaOrdineFb, changeDetector, dialog, data);
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
        const searchRigaOrdine = this.searchForm.value;
        if (!searchRigaOrdine) {
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
                if (filterType != 'idProdotto' && filterType != 'idOrdine') {
                    filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);
                }
                break;
            default:
                break;
        }
        return filterBuild;
    }
    public filterTypeCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        if (filterType == 'idProdotto') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theProdotto', value);
        }
        if (filterType == 'idOrdine') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theOrdine', value);
        }
        return filterBuild;
    }
    public getProdottoList(): void {
        this.rigaOrdineGroupApiService.prodotto.getProdottoByCriteria().subscribe(data => {
            this.prodottoList = getListForDropdowns(data);
            this.addListToAttribute('prodotto', this.prodottoList);
        });
    }
    public getOrdineList(): void {
        this.rigaOrdineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
            this.addListToAttribute('ordine', this.ordineList);
        });
    }

    private getParentsList(): void {
        this.getProdottoList();
        this.getOrdineList();
    }
}

import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { OrdineGroupApiService } from 'src/app/pages/services/services-ordine/ordine-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

import { ICliente } from 'src/app/pages/interfaces/cliente.interface';
import { ITipoOrdine } from 'src/app/pages/interfaces/tipo-ordine.interface';
import { IOrdine } from 'src/app/pages/interfaces/ordine.interface';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-ordine-resid-advanced',
    templateUrl: './search-ordine-resid-advanced.component.html',
    styleUrls: ['./search-ordine-resid-advanced.component.scss']
})
export class SearchOrdineResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idOrdine', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'] },
        { name: 'dataOrdine', type: 'date', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'tempoOrdine', type: 'time', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'createdBy', type: 'string', api: ['contiene'] },
        { name: 'lastModifiedBy', type: 'string', api: ['contiene'] },
        { name: 'createdDate', type: 'datetime', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'lastModifiedDate', type: 'datetime', api: ['precedenteA', 'uguale', 'successivaA'] },
        { name: 'idCliente', type: 'select', api: ['uguale'], parentList: [], parent: 'cliente' },
        { name: 'idTipoOrdine', type: 'select', api: ['uguale'], parentList: [], parent: 'tipoOrdine' },
        { name: 'theOrdineAggregato', type: 'select', api: ['uguale'], parentList: [], parent: 'ordineAggregato' }
    ];
    public clienteList: ICliente[] = [];
    public tipoOrdineList: ITipoOrdine[] = [];
    public ordineAggregatoList: IOrdine[] = [];

    constructor(
        public ordineDialogRef: MatDialogRef<SearchOrdineResidAdvancedComponent>,
        private ordineGroupApiService: OrdineGroupApiService,
        private ordineFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(ordineDialogRef, ordineFb, changeDetector, dialog, data);
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
        const searchOrdine = this.searchForm.value;
        if (!searchOrdine) {
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
                if (filterType != 'idCliente' && filterType != 'idTipoOrdine') {
                    filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);
                }
                break;
            default:
                break;
        }
        return filterBuild;
    }
    public filterTypeCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        if (filterType == 'idCliente') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theCliente', value);
        }
        if (filterType == 'idTipoOrdine') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theTipoOrdine', value);
        }
        if (filterType == 'theordineAggregato') {
            filterBuild[orAnd ? 'andEquals' : 'orEquals']('theOrdineAggregato.idOrdine', value);
        }
        return filterBuild;
    }
    public getClienteList(): void {
        this.ordineGroupApiService.cliente.getClienteByCriteria().subscribe(data => {
            this.clienteList = getListForDropdowns(data);
            this.addListToAttribute('cliente', this.clienteList);
        });
    }
    public getTipoOrdineList(): void {
        this.ordineGroupApiService.tipoOrdine.getTipoOrdineByCriteria().subscribe(data => {
            this.tipoOrdineList = getListForDropdowns(data);
            this.addListToAttribute('tipoOrdine', this.tipoOrdineList);
        });
    }
    public getOrdineAggregatoList(): void {
        this.ordineGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineAggregatoList = getListForDropdowns(data);
            this.addListToAttribute('ordineAggregato', this.ordineAggregatoList);
        });
    }

    private getParentsList(): void {
        this.getClienteList();
        this.getTipoOrdineList();
        this.getOrdineAggregatoList();
    }
}
